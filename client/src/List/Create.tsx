import React from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import { Store } from "antd/lib/form/interface";
import { ColumnsType } from "antd/lib/table";
import { ColumnRecord, ObjectType } from "./List";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12, offset: 0 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
};

export default function Create({
  inputs,
  data,
  createObject,
}: {
  inputs: ColumnsType<any>;
  data: Dictionary<ObjectType>;
  createObject: Function;
}): JSX.Element {
  const onFinish = (values: Store): void => {
    createObject(values);
  };

  const getInput = (input: ColumnRecord, render: any): JSX.Element | null => {
    if (!input || !input.title) return null;

    return input.queryIndex && data && data[input.queryIndex] ? (
      <Select placeholder={`Select the ${input.title}`} key={input.queryIndex}>
        {data[input.queryIndex].map((el: any) => (
          <Option key={el._id} value={el._id}>
            {render(el)}
          </Option>
        ))}
      </Select>
    ) : input.type === "number" ? (
      <InputNumber />
    ) : (
      <Input />
    );
  };

  return (
    <Form {...layout} onFinish={onFinish}>
      {inputs.map(
        (input: ColumnRecord) =>
          input.dataIndex && (
            <Form.Item
              label={input.title}
              name={input.dataIndex}
              key={input.dataIndex as string}
              rules={[{ required: input.required }]}
            >
              {getInput(input, input.render)}
            </Form.Item>
          )
      )}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}
