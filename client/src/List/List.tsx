import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import { Button, Popconfirm, Form, notification, Row, Col } from "antd";
import ListTable from "./ListTable";
import { GraphQLError, DocumentNode } from "graphql";
import { ColumnType, ColumnProps } from "antd/lib/table";
import Create from "./Create";

interface AllObjectsProps {
  allObjects: [];
}

export interface ObjectType extends Dictionary<any> {
  _id: string;
}

declare global {
  type Dictionary<T> = { [key: string]: T };
}

export interface ColumnRecord extends ColumnType<any> {
  required?: boolean;
  editable?: boolean;
  queryIndex?: string;
}

export default function List({
  columns,
  all: ALL_QUERY,
  create: CREATE_MUTATION,
  update: UPDATE_MUTATION,
  delete: DELETE_MUTATION,
}: {
  columns: ColumnProps<any>[];
  all: DocumentNode;
  create: DocumentNode;
  update: DocumentNode;
  delete: DocumentNode;
}): JSX.Element {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const { loading, error, data: queryData, refetch } = useQuery(ALL_QUERY);
  const [updateObject] = useMutation(UPDATE_MUTATION);
  const [createObject] = useMutation(CREATE_MUTATION, {
    update(cache, { data: { createObject } }) {
      const { allObjects, ...rest } = cache.readQuery<AllObjectsProps | any>({ query: ALL_QUERY });
      cache.writeQuery({
        query: ALL_QUERY,
        data: {
          allObjects: allObjects.concat(createObject),
          ...rest,
        },
      });
    },
  });
  const [deleteObject] = useMutation(DELETE_MUTATION, {
    update(cache, { data: { deleteObject } }) {
      const { allObjects, ...rest } = cache.readQuery<AllObjectsProps | any>({ query: ALL_QUERY });
      const index = allObjects.findIndex((record: ObjectType) => record._id === deleteObject._id);
      if (index > -1) allObjects.splice(index, 1);
      cache.writeQuery({
        query: ALL_QUERY,
        data: { allObjects, ...rest },
      });
    },
  });

  const isEditing = (record: ObjectType): boolean => record._id === editingKey;

  const handleDelete = (id: string): void => {
    deleteObject({ variables: { id } }).catch((error: GraphQLError) => {
      notification["error"]({
        key: "deleteError",
        message: error.message,
        placement: "topLeft",
        duration: 3,
      });
    });
  };

  const handleCreate = (input: Dictionary<string>): void => {
    createObject({ variables: { input } }).catch((error: GraphQLError) => {
      notification["error"]({
        key: "createError",
        message: error.message,
        placement: "topLeft",
        duration: 3,
      });
    });
  };

  const edit = (record: ObjectType): void => {
    const defaultValues: { [key: string]: any } = {};

    Object.keys(record).forEach((key: any) => {
      if (!!record[key] && typeof record[key] === "object") defaultValues[key] = record[key]._id;
      else defaultValues[key] = record[key];
    });

    form.setFieldsValue({
      ...defaultValues,
    });
    setEditingKey(record._id);
  };

  const cancel = (): void => {
    setEditingKey("");
  };

  // Handle Update
  const save = async (id: string): Promise<any> => {
    const row = await form.validateFields();

    updateObject({ variables: { id, input: row } })
      .then(() => {
        cancel();
        // refetch(); // Necessary for nested children : they doesn't update
      })
      .catch((error: GraphQLError) => {
        notification["error"]({
          key: "updateError",
          message: error.message,
          placement: "topLeft",
          duration: 4,
        });
      });
  };

  columns = columns.map((col: ColumnRecord) => {
    if (col.key === "action") {
      return {
        ...col,
        className: "action",
        fixed: "right",
        render: (text: string, record: ObjectType): JSX.Element => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Button
                htmlType="submit"
                onClick={(): Promise<any> => save(record._id)}
                style={{
                  marginRight: 12,
                }}
              >
                Save
              </Button>
              <Popconfirm title="Cancel?" cancelText="No" okText="Yes" onConfirm={cancel}>
                <Button>Cancel</Button>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <Button
                style={{ marginRight: 12 }}
                disabled={editingKey !== ""}
                onClick={(): void => edit(record)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Delete?"
                cancelText="No"
                okText="Yes"
                onConfirm={(): void => handleDelete(record._id)}
              >
                <Button>Delete</Button>
              </Popconfirm>
            </span>
          );
        },
      };
    } else if (col.editable) {
      return {
        ...col,
        onCell: (record: ObjectType): any => ({
          render: col.render,
          data: col.queryIndex && queryData[col.queryIndex],
          required: col.required,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    } else return col;
  });

  return (
    <>
      <Row>
        <Col span={18} offset={3}>
          <Create inputs={columns} data={queryData} createObject={handleCreate} />
        </Col>
      </Row>
      <Row>
        <ListTable
          refetch={refetch}
          loading={loading || error}
          data={queryData && queryData.allObjects ? queryData.allObjects : []}
          form={form}
          columns={columns}
        />
      </Row>
    </>
  );
}
