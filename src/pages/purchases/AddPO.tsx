import { banks, modes, products, suppliers, taxRate } from "@utils/data";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Table,
  Row,
  Select,
  Popconfirm,
  message,
  Divider,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaPlus, FaSave } from "react-icons/fa";
import type { GetRef, InputRef, TableProps } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  product: string;
  description: string;
  unit: string;
  quantity: string;
  rate: string;
  amount: string;
  discountPercent: string;
  discount: string;
  taxRate: string;
  saleTax: string;
  net: string;
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
  product: string;
  description: string;
  unit: string;
  quantity: string;
  rate: string;
  amount: string;
  discountPercent: string;
  discount: string;
  taxRate: string;
  saleTax: string;
  net: string;
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

const AddPO = () => {
  const [count, setCount] = useState(3);
  const [editingKey, setEditingKey] = useState<any>("");
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const navigate = useNavigate();

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
      title: "Product / Services",
      dataIndex: "product",
      editable: true,
      type: "select",
      options: products.map((i) => ({ value: i, label: i })),
    },
    {
      title: "Description",
      dataIndex: "description",
      // width: "30%",
      editable: true,
      type: "input",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      editable: true,
      type: "input",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      editable: true,
      type: "input",
    },
    {
      title: "Rate",
      dataIndex: "rate",
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
      title: "Disc %",
      dataIndex: "discountPercent",
      editable: true,
      type: "input",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      editable: true,
      type: "input",
    },
    {
      title: "TaxRate",
      dataIndex: "taxRate",
      editable: true,
      type: "select",
      options: taxRate.map((i) => ({ value: i, label: i })),
    },
    {
      title: "Sale Tax",
      dataIndex: "saleTax",
      editable: true,
      type: "input",
    },
    {
      title: "Net",
      dataIndex: "net",
      //   editable: true,
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
  const ExpensedefaultColumns: EditableColumnType[] = [
    {
      title: "Expense",
      dataIndex: "product",
      editable: true,
      type: "select",
      options: products.map((i) => ({ value: i, label: i })),
    },
    {
      title: "Description",
      dataIndex: "description",
      // width: "30%",
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
      title: "Disc %",
      dataIndex: "discountPercent",
      editable: true,
      type: "input",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      editable: true,
      type: "input",
    },
    {
      title: "TaxRate",
      dataIndex: "taxRate",
      editable: true,
      type: "select",
      options: taxRate.map((i) => ({ value: i, label: i })),
    },
    {
      title: "Sale Tax",
      dataIndex: "saleTax",
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
      "product",
      "description",
      "unit",
      "quantity",
      "rate",
      "amount",
      "discountPercent",
      "discount",
      "taxRate",
      "saleTax",
      "net",
    ];

    const hasEmpty = lastRow && requiredFields.some((field) => !lastRow[field]);

    if (hasEmpty) {
      return message.error(
        "Please complete the previous row before adding a new one."
      );
    }

    const key = count.toString();

    const newData: DataType = {
      key,
      product: "",
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      amount: "",
      discountPercent: "",
      discount: "",
      taxRate: "",
      saleTax: "",
      net: "3.",
    };

    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setEditingKey(key); // <-- NEW: Auto set row editable
  };

  const handleSave = (row: DataType) => {
    const editableFields: (keyof DataType)[] = [
      "product",
      "description",
      "unit",
      "quantity",
      "rate",
      "amount",
      "discountPercent",
      "discount",
      "taxRate",
      "saleTax",
      "net",
    ];

    // STEP 1 — Merge the updated row into dataSource
    const newData = [...dataSource];
    const index = newData.findIndex((item) => item.key === row.key);

    if (index > -1) {
      const updated: any = { ...newData[index] };

      editableFields.forEach((field) => {
        if (row[field]) updated[field] = row[field];
      });

      //   if (row.date) updated.date = row.date;

      newData[index] = updated;
    }

    // STEP 2 — CLEANUP: Remove ALL rows that have only date filled
    const cleaned = newData.filter((item) => {
      //   const dateFilled = item.date && item.date !== "";
      const othersEmpty = editableFields.every((f) => !item[f]);

      // delete rows with only date filled
      return !othersEmpty;
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
  const Expensecolumns = ExpensedefaultColumns.map((col) => {
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
    <div>
          <h1 className="text-3xl tracking-wider mb-6">Add Purchase Order</h1>
      <Card>
        <h1 className="text-xl mb-3 font-bold">Supplier Details</h1>
        <div>
          <Row gutter={20}>
            <Col span={8}>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">
                  Supplier
                </label>

                <Select
                  placeholder="Select Supplier"
                  style={{ width: "100%", height: 40, borderRadius: 6 }}
                  options={suppliers.map((i) => ({ value: i, label: i }))}
                  showSearch
                  // onChange={(e) => setFilter({ ...filter, status: e })}
                ></Select>
              </div>
              <div>
                <label className="text-[14px] block font-normal">Address</label>

                <TextArea rows={4} placeholder="Address" />
              </div>
            </Col>
            <Col span={8}>
             <div className="mb-3">
                <label className="text-[14px] block font-normal">PO No.</label>

                <Input placeholder="Doc No." />
              </div>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">Date</label>

                <DatePicker
                  onChange={(e) => {
                    //   setFilter({
                    //     ...filter,
                    //     startDate: e ? dayjs(e).format("YYYY-MM-DD") : "",
                    //   });
                  }}
                  className="w-full h-10 rounded-sm"
                />
              </div>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">
                  Term Days
                </label>

                <Input placeholder="0" />
              </div>
              <div className="mb-0">
                <label className="text-[14px] block font-normal">
                  Due Date
                </label>

                <DatePicker
                  onChange={(e) => {
                    //   setFilter({
                    //     ...filter,
                    //     startDate: e ? dayjs(e).format("YYYY-MM-DD") : "",
                    //   });
                  }}
                  className="w-full h-10 rounded-sm"
                />
              </div>
             
            </Col>
            {/* <Col span={8}>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">
                  Credit Limit
                </label>

                <div className="bg-slate-200 text-right h-10 flex justify-end items-center px-2 rounded-sm">
                  3.00
                </div>
              </div>
              <div>
                <label className="text-[14px] block font-normal">
                  Balance{" "}
                </label>

                <div className="bg-slate-200 text-right h-10 flex justify-end items-center px-2 rounded-sm">
                  3.00
                </div>
              </div>
            </Col> */}
          </Row>
        </div>
      </Card>
      <Card className="my-3">
        <h1 className="text-xl mb-3 font-bold">Expense Details</h1>
        <div>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{ marginBlock: 16 }}
          >
            <FaPlus /> Add More
          </Button>
          <Table<DataType>
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={Expensecolumns as ColumnTypes}
            size="small"
          />
        </div>
      </Card>
      <Card className="my-3">
        <h1 className="text-xl mb-3 font-bold">Product Details</h1>
        <div>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{ marginBlock: 16 }}
          >
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
        </div>
      </Card>
      <Card className="my-3">
        <div>
          <Row justify={"space-between"} className="my-3">
            <Col span={8}>
              <div>
                <label className="text-[14px] block font-normal">Notes</label>

                <TextArea rows={4} placeholder="Notes" />
              </div>
            </Col>
            <Col span={8}>
              <div className="mb-3 flex gap-3 items-center">
                <label className="basis-3/12 text-[14px] block font-normal">
                  Sub Total
                </label>

                <div className="basis-11/12 bg-slate-200 text-right h-8 flex justify-end items-center px-2 rounded-sm">
                  3.00
                </div>
              </div>
              <div className="mb-3 flex gap-3 items-center">
                <label className="basis-3/12 text-[14px] block font-normal">
                  Discount
                </label>

                <div className="basis-11/12 bg-slate-200 text-right h-8 flex justify-end items-center px-2 rounded-sm">
                  3.00
                </div>
              </div>
              <div className="mb-3 flex gap-3 items-center">
                <label className="basis-3/12 text-[14px] block font-normal">
                  Sale tax
                </label>

                <div className="basis-11/12 bg-slate-200 text-right h-8 flex justify-end items-center px-2 rounded-sm">
                  3.00
                </div>
              </div>
              <div className="mb-3 flex gap-3 items-center">
                <label className="basis-3/12 text-[14px] block font-normal">
                  Total
                </label>

                <div className="basis-11/12 text-lg font-semibold text-right h-8 flex justify-end items-center px-2 rounded-sm">
                  3.00
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
     
      <Divider />

      <Row className="gap-3">
        <Button type="primary">
          <FaSave /> Approve and Close
        </Button>

        <Button type="primary" onClick={() => navigate(-1)}>
          <TiArrowBack /> Cancel
        </Button>
      </Row>
    </div>
  );
};

export default AddPO;
