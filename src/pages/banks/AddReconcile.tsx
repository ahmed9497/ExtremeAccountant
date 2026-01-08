import { banks } from "@utils/data";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaEquals, FaMinus, FaSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiArrowBack } from "react-icons/ti";

interface DataType {
  id: number;
  type: string;
  payee: string;
  createdAt: string;
  refNo: string;
  details: string;
  payments: string;
  receipts: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "V.ID",
    dataIndex: "id",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    render: (text) => <div>{dayjs(text).format("DD/MM/YYYY")}</div>,
  },
  {
    title: "type",
    dataIndex: "type",
    render: (text: string) => <a>{text}</a>,
  },

  {
    title: "Account / Payee",
    dataIndex: "payee",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Ref No.",
    dataIndex: "refNo",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Details",
    dataIndex: "details",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Payments",
    dataIndex: "payment",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Receipts",
    dataIndex: "receipts",
    render: (text) => <div>{text}</div>,
  },
  //   {
  //     title: "Actions",
  //     // dataIndex: 'status',
  //     render: () => (
  //       <Space size="small">
  //         <div className="bg-[#F7F7F7] p-2 cursor-pointer rounded">
  //           <BiEditAlt size={15} />
  //         </div>

  //         <div className="bg-[#F7F7F7] p-2 cursor-pointer rounded">
  //           <RiDeleteBin6Line size={15} color="red" />
  //         </div>
  //       </Space>
  //     ),
  //   },
];
const AddReconcile = () => {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const [roles, setRoles] = useState([
    {
      id: 1,
      type: "TRI",
      payee: "HBL",
      createdAt: "12/11/2024",
      refNo: "230902",
      details: "-",
      payments: "-",
      receipts: "783",
    },
    {
      id: 2,
      type: "TRI",
      payee: "HBL",
      createdAt: "12/11/2024",
      refNo: "230902",
      details: "-",
      payments: "Deposited",
      receipts: "783",
    },
  ]);
  return (
    <Card>
      <div>
        <h1 className="text-3xl tracking-wider mb-6">
          Reconcile Statement Balance
        </h1>
      </div>

      <Row align={"bottom"} gutter={[20, 20]}>
        <Col span={6}>
          <label className="text-[14px] block font-normal">Bank</label>

          <Select
            placeholder="Select Bank"
            style={{ width: "100%", height: 40, borderRadius: 6 }}
            options={banks.map((i) => ({ value: i, label: i }))}
            // onChange={(e) => setFilter({ ...filter, status: e })}
          ></Select>
        </Col>

        <Col span={6}>
          <label className="text-[14px] block font-normal">
            Statement Date
          </label>

          <DatePicker
            // onChange={(e) => {
            //   setFilter({
            //     ...filter,
            //     startDate: e ? dayjs(e).format("YYYY-MM-DD") : "",
            //   });
            // }}
            className="w-full rounded-sm h-10"
          />
        </Col>
        <Col span={6}>
          <label className="text-[14px] block font-normal">
            Statement Balance
          </label>

          <Input style={{ width: "100%", height: 40 }} placeholder="0.00" />
        </Col>
        <Col span={6}>
          <Button
            style={{ width: "100%", height: 40 }}
            className="rounded-full bg-black text-white"
          >
            Load Transaction
          </Button>
        </Col>
      </Row>
      <Divider />

      <Row align={"bottom"} gutter={20}>
        <Col span={3}>
          <div>
            <label className="text-[14px] block font-normal">
              Opening Balance
            </label>
            <div className="bg-slate-200 text-right h-8 items-center flex justify-end px-1">
              0.00
            </div>
          </div>
        </Col>
        <Col span={1}>
          <div className="bg-slate-200 h-8 flex justify-center items-center w-8 rounded-full">
            <FaPlus />
          </div>
        </Col>
        <Col span={3}>
          <div>
            <label className="text-[14px] block font-normal">Receipts</label>
            <div className="bg-slate-200 text-right h-8 items-center flex justify-end px-1">
              0.00
            </div>
          </div>
        </Col>
        <Col span={1}>
          <div className="bg-slate-200 h-8 flex justify-center items-center w-8 rounded-full">
            <FaMinus />
          </div>
        </Col>
        <Col span={3}>
          <div>
            <label className="text-[14px] block font-normal">Payments</label>
            <div className="bg-slate-200 text-right h-8 items-center flex justify-end px-1">
              0.00
            </div>
          </div>
        </Col>
        <Col span={1}>
          <div className="bg-slate-200 h-8 flex justify-center items-center w-8 rounded-full">
            <FaEquals />
          </div>
        </Col>
        <Col span={3}>
          <div>
            <label className="text-[14px] block font-normal">Balance</label>
            <div className="bg-slate-200 text-right h-8 items-center flex justify-end px-1">
              0.00
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div>
            <label className="text-[14px] text-right block font-normal">
              Difference
            </label>
            <div className="text-xl text-right h-8 items-center flex justify-end px-1">
              0.00
            </div>
          </div>
        </Col>
      </Row>
      <div className="my-8 w-full">
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={roles}
          rowKey={"id"}
          bordered
          size="small"
        />
      </div>
      <Row className="gap-3">
        <Button type="primary">
          <FaSave /> Save
        </Button>

        <Button type="primary">
          <TiArrowBack /> Cancel
        </Button>
      </Row>
    </Card>
  );
};

export default AddReconcile;
