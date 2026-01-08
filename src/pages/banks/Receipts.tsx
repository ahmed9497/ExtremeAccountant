import { Button, Col, DatePicker, Divider, Row, Select, Space } from "antd";
import { BiEditAlt, BiPlus } from "react-icons/bi";
import { Fragment } from "react/jsx-runtime";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useNavigate } from "react-router";
import { axiosInstance } from "@apiClient";
import dayjs from "dayjs";
import AddBankAccount from "@components/modals/AddBankAccount";
import { banks, nominals } from "@utils/data";
import AddBankPayment from "@components/modals/AddBankPayment";
import AddWhtPayment from "@components/modals/AddWhtPayment";
import { FaFileImport } from "react-icons/fa6";
import AddBankReceipt from "@components/modals/AddBankReceipt";

interface DataType {
  id: number;
  createdAt: string;
  bank: string;
  nominalAccount: string;
  refNo: number;
  details: string;
  amount: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "V.No",
    dataIndex: "id",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    render: (text) => <div>{dayjs(text).format("DD/MM/YYYY")}</div>,
  },
  {
    title: "Bank",
    dataIndex: "bank",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Nominal Account",
    dataIndex: "nominalAccount",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Ref. No.",
    dataIndex: "refNo",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Details",
    dataIndex: "details",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Actions",
    // dataIndex: 'status',
    render: () => (
      <Space size="small">
        <div className="bg-[#F7F7F7] p-2 cursor-pointer rounded">
          <BiEditAlt size={15} />
        </div>

        <div className="bg-[#F7F7F7] p-2 cursor-pointer rounded">
          <RiDeleteBin6Line size={15} color="red" />
        </div>
      </Space>
    ),
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};
const Receipts = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState<DataType[]>([]);
  const [roles, setRoles] = useState([
    {
      id: 1,
      bank: "Askari bank",
      code: "23432",
      createdAt: "12/11/2024",
      amount: "23423",
      nominalAccount: "Depreciation",
      details: "Deposited",
      refNo: 12343,
    },
    {
      id: 2,
      bank: "Habib bank",
      code: "234322",
      createdAt: "12/11/2024",
      amount: "23423",
      nominalAccount: "Depreciation",
      details: "Deposited",
      refNo: 123,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const [editData, setEditData] = useState<any>();

  useEffect(() => {
    // getList();
  }, []);

  const getList = async () => {
    try {
      const res: any = await axiosInstance.get("/role/roleslist");
      if (res?.code === 200) {
        setRoles(res.data);
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };
  const handleOk = () => {
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  const submitData = () => {
    handleCancel();
    // getList();
  };

  return (
    <Fragment>
      {/*-------------------------------------- Start of Modal-------------------------- */}

      <AddBankReceipt
        handleOk={handleOk}
        modalVisible={modalVisible}
        handleCancel={handleCancel}
        submitData={submitData}
        venueId={23}
        editData={editData}
      />

      {/*-------------------------------------- End of Modal-------------------------- */}
      <Row className="mt-10" gutter={[20, 20]}>
        <Col span={8}>
          <label className="text-[14px] block font-normal">Banks</label>

          <Select
            placeholder="Select Bank"
            style={{ width: "100%", height: 40, borderRadius: 6 }}
            options={banks.map((i) => ({ value: i, label: i }))}
            // onChange={(e) => setFilter({ ...filter, status: e })}
          ></Select>
        </Col>
        <Col span={8}>
          <label className="text-[14px] block font-normal">Nominals</label>

          <Select
            placeholder="Select Nominals"
            style={{ width: "100%", height: 40, borderRadius: 6 }}
            options={nominals.map((i) => ({ value: i, label: i }))}
            showSearch
            // onChange={(e) => setFilter({ ...filter, status: e })}
          ></Select>
        </Col>
        <Col span={8}>
          <label className="text-[14px] block font-normal">Date Range</label>

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
      </Row>
      <Divider />
      <div className="mt-6 flex justify-between">
        <h1 className="text-3xl tracking-wider mb-6">Bank Receipts</h1>
        <div className="flex gap-3">
          <Button
            type="primary"
            className="flex items-center font-semibold  text-white"
            //   icon={<BiPlus color="white" />}
            // onClick={() => {
            //   navigate('/dashboard/overview/add-role')
            // }}
            //   onClick={() => {
            //     setModalVisible(true);
            //   }}
          >
            <FaFileImport /> Import
          </Button>
          <Button
            type="primary"
            className="flex items-center font-semibold  text-white"
            //   icon={<BiPlus color="white" />}
            // onClick={() => {
            //   navigate('/dashboard/overview/add-role')
            // }}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            New Bank Payments
          </Button>
        </div>
      </div>

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
    </Fragment>
  );
};

export default Receipts;
