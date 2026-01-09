import { Button, Col, Flex, message, Modal, Row, Select } from "antd";
import { Divider } from "antd";
import { InputBox, TextAreaBox } from "@components/formfields";
import { useForm } from "react-hook-form";

import React, { useContext, useRef, useState } from "react";
import type { GetRef, InputRef, TableProps } from "antd";
import { Form, Input, Popconfirm, Table } from "antd";
import { axiosInstance } from "@apiClient";

import { StepProps } from "@components/shared/types";
import { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { addbankPayment } from "@validations/articles/articles";
import { banks, modes, nominals } from "@utils/data";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus, FaSave } from "react-icons/fa";

interface Props extends StepProps {}

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
  type?: string;
}

interface EditableRowProps {
  index: number;
}
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  type: string;
  options: any;
  editing: boolean;
  handleSave: (record: Item) => void;
  startEditing?: () => void;
}
interface DataType {
  key: React.Key;
  date: string;
  refNo: string;
  mode: string;
  nominalAccount: string;
  details: string;
  amount: string;
  type?: string;
}
type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  type,
  options,
  editing,
  startEditing,
  ...restProps
}) => {
  // const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
      inputRef.current?.focus();
    }
  }, [editing]);

  // const toggleEdit = () => {
  //   setEditing(!editing);
  //   form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  // };

  const save = async () => {
    try {
      const values = await form.validateFields();

      // toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        {type === "input" ? (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        ) : (
          <Select
            placeholder="Select Bank"
            style={{ width: "100%", height: 50, borderRadius: 6 }}
            options={options || []}
            // onChange={(e) => setFilter({ ...filter, status: e })}
            onChange={save}
            onBlur={save}
          ></Select>
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap hover:border"
        style={{ paddingInlineEnd: 24 }}
        // onClick={toggleEdit}
        onClick={startEditing}
      >
        {children}
      </div>
    );
  }
  const cellProps: any = { ...restProps };
  delete cellProps.editing;
  return <td {...cellProps}>{childNode}</td>;
};

const AddBankReceipt = ({
  modalVisible,
  handleCancel,
  submitData,
  handleOk,
  editData,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(addbankPayment),
  });
  const [count, setCount] = useState(3);
  const [editingKey, setEditingKey] = useState<any>("");

  useEffect(() => {
    if (editData && Object?.keys(editData)?.length > 0) {
      setValue("bank", editData?.bank);
      setValue("code", editData?.code);
      setValue("description", editData?.description);
    }
  }, [editData]);

  // const onSubmit = async (data: any) => {
  //   console.log(data);

  //   const formData = new FormData();

  //   data.tags = JSON.stringify(data.tags);
  //   for (const key in data) {
  //     let val = data[key];
  //     formData.append(key, val);
  //   }

  //   const url = editData?.id ? `${updateArticles}/${editData.id}` : addArticles;
  //   try {
  //     const res: any = editData?.id
  //       ? await axiosInstance.patch(url, formData)
  //       : await axiosInstance.post(url, formData);
  //     if (res?.code === 200) {
  //       console.log(res);
  //       message.open({
  //         type: "success",
  //         content: editData?.id
  //           ? "Article Edit Successfully"
  //           : "Article Added Successfully",
  //       });
  //       submitData();
  //       reset();
  //       handleCancel();
  //     } else {
  //       message.open({
  //         type: "error",
  //         content: "Something went wrong",
  //       });
  //     }
  //   } catch (error: any) {
  //     console.log("error", error);
  //     message.error(error?.response?.data?.message);
  //   }
  // };
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      date: new Date().toLocaleDateString(),
      refNo: "32",
      mode: "Cash",
      nominalAccount: "Depreciation",
      details: "Deposited",
      amount: "23.4",
    },
    {
      key: "1",
      date: new Date().toLocaleDateString(),
      refNo: "32",
      mode: "Cheque",
      nominalAccount: "Depreciation",
      details: "Deposited",
      amount: "223.4",
    },
    {
      key: "2",
      date: new Date().toLocaleDateString(),
      refNo: "32",
      mode: "Cheque",
      nominalAccount: "Depreciation",
      details: "Deposited",
      amount: "223.4",
    },
  ]);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  type EditableColumnType = ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    type?: "input" | "select"; // your custom property
    options?: { label: string; value: string }[];
  };
  const defaultColumns: EditableColumnType[] = [
    {
      title: "Date",
      dataIndex: "date",
      // width: "30%",
      editable: true,
      type: "input",
    },
    {
      title: "Ref No.",
      dataIndex: "refNo",
      editable: true,
      type: "input",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      editable: true,
      type: "select",
      options: modes.map((i) => ({ value: i, label: i })),
    },
    {
      title: "Nominal Account",
      dataIndex: "nominalAccount",
      editable: true,
      type: "select",
      options: nominals.map((i) => ({ value: i, label: i })),
    },
    {
      title: "Details",
      dataIndex: "details",
      editable: true,
      type: "input",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      editable: true,
      type: "input",
    },
    {
      title: "Actions",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>
              <MdDeleteOutline color="red" size={25} />{" "}
            </a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const lastRow = dataSource[dataSource.length - 1];

    // Check if last row has any empty required fields
    const requiredFields: (keyof DataType)[] = [
      "refNo",
      "mode",
      "nominalAccount",
      "details",
      "amount",
    ];

    const hasEmpty = requiredFields.some((field) => !lastRow[field]);

    if (hasEmpty) {
      return message.error(
        "Please complete the previous row before adding a new one."
      );
    }

    const key = count.toString();

    const newData: DataType = {
      key,
      date: new Date().toLocaleDateString(),
      refNo: "",
      mode: "",
      nominalAccount: "",
      details: "",
      amount: "",
    };

    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setEditingKey(key); // <-- NEW: Auto set row editable
  };

  const handleSave = (row: DataType) => {


    const editableFields: (keyof DataType)[] = [
      "refNo",
      "mode",
      "nominalAccount",
      "details",
      "amount",
    ];

    // STEP 1 — Merge the updated row into dataSource
    const newData = [...dataSource];
    const index = newData.findIndex((item) => item.key === row.key);

    if (index > -1) {
      const updated: any = { ...newData[index] };

      editableFields.forEach((field) => {
        if (row[field]) updated[field] = row[field];
      });

      if (row.date) updated.date = row.date;

      newData[index] = updated;
    }

    // STEP 2 — CLEANUP: Remove ALL rows that have only date filled
    const cleaned = newData.filter((item) => {
      const dateFilled = item.date && item.date !== "";
      const othersEmpty = editableFields.every((f) => !item[f]);

      // delete rows with only date filled
      return !(dateFilled && othersEmpty);
    });

    setDataSource(cleaned);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        editing: record.key === editingKey,
        dataIndex: col.dataIndex,
        title: col.title,
        type: col.type,
        options: col.options,
        handleSave: handleSave,
        startEditing: () => setEditingKey(record.key),
        // handleSave: (value: any) => {
        //   handleSave(value);
        //   // setEditingKey(""); // finish editing after save
        // },
      }),
    };
  });
  return (
    <Modal
      open={modalVisible}
      title={"Add Bank Receipts"}
      width={"90%"}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      // destroyOnClose
    >
      <Row className="mt-10" gutter={[20, 20]}>
        <Col span={8}>
          <label className="text-[14px] block font-normal">Banks</label>

          <Select
            placeholder="Select Bank"
            style={{ width: "100%", height: 50, borderRadius: 6 }}
            options={banks.map((i) => ({ value: i, label: i }))}
            // onChange={(e) => setFilter({ ...filter, status: e })}
          ></Select>
        </Col>
      </Row>
      <div>
        <Button onClick={handleAdd} type="primary" style={{ marginBlock: 16 }}>
          <FaPlus /> Add More
        </Button>
        <Table<DataType>
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          size="small"
        />
         <Button onClick={submitData} type="primary" style={{ marginBlock: 16 }}>
          <FaSave /> Save
        </Button>
      </div>
    </Modal>
  );
};
export default AddBankReceipt;
