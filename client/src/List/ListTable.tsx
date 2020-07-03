import React, { Component } from "react";
import { Table, Button, Col, Form, Input, Select } from "antd";
import { ObjectType } from "./List";
import "./style.css";

const { Option } = Select;

interface ListTableProps {
  refetch: Function;
  loading: any;
  data: any;
  form: any;
  columns: any;
}

const tableConfiguration = {
  bordered: true,
  showHeader: true,
  style: {
    marginTop: 40,
  },
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  required,
  children,
  data,
  render,
  ...restProps
}: {
  editing: boolean;
  dataIndex: string;
  title: string;
  required: boolean;
  inputType: string;
  index: string;
  render: Function;
  children: any;
  data: Array<ObjectType>;
  selected: string;
}): JSX.Element => {
  const inputNode: JSX.Element = data ? (
    <Select>
      {data.map(
        (el): JSX.Element => (
          <Option key={el._id} value={el._id}>
            {render(el)}
          </Option>
        )
      )}
    </Select>
  ) : (
    <Input />
  );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required,
              message: `${title} is required !`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default class ListTable extends Component<ListTableProps> {
  render(): JSX.Element {
    return (
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 20, offset: 2 }} xl={{ span: 18, offset: 3 }}>
        <Button
          type="primary"
          onClick={(): void => this.props.refetch()}
          disabled={this.props.loading}
          loading={this.props.loading}
          style={{ float: "right" }}
        >
          Reload
        </Button>
        <Form form={this.props.form}>
          <Table
            className="table-content"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            {...tableConfiguration}
            rowKey={(el): string => el._id}
            rowClassName={(el): string => el.__typename}
            columns={this.props.columns}
            dataSource={this.props.data}
          ></Table>
        </Form>
      </Col>
    );
  }
}
