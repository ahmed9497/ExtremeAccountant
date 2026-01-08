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
import { banks, invoiceType, nominals, suppliers } from "@utils/data";
import AddBankPayment from "@components/modals/AddBankPayment";
import AddWhtPayment from "@components/modals/AddWhtPayment";
import { FaFileImport } from "react-icons/fa6";

interface DataType {
  createdAt: string;
  accountNo: string;
  customer: string;
  type: string;
  invNo: string;
  docNo: string;
  total: string;
  balance: string;
  paymentStatus: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Date",
    dataIndex: "createdAt",
    render: (text) => <div>{dayjs(text).format("DD/MM/YYYY")}</div>,
  },
  {
    title: "Nominal Account",
    dataIndex: "accountNo",
    render: (text: string) => <a>{text}</a>,
  },
  
  {
    title: "Type ",
    dataIndex: "type",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Inv. ID.",
    dataIndex: "invNo",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Doc No.",
    dataIndex: "docNo",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Total",
    dataIndex: "total",
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
const StockAdjustment = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState<DataType[]>([]);
  const [roles, setRoles] = useState([
    {
      id: 1,
      createdAt: "12/11/2024",
      accountNo: "234324",
      customer: "Ali",
      type: "Credit",
      invNo: "234",
      docNo: "23234",
      total: "234324",
      balance: "234234",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      createdAt: "12/11/2024",
      accountNo: "234324",
      customer: "Ali",
      type: "Credit",
      invNo: "234",
      docNo: "23234",
      total: "234324",
      balance: "234234",
      paymentStatus: "Paid",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [whtModalVisible, setWhtModalVisible] = useState(false);
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
  const handleWhtOk = () => {
    setWhtModalVisible(false);
  };
  const handleWhtCancel = () => {
    setWhtModalVisible(false);
  };
  const submitData = () => {
    handleWhtCancel();
    handleCancel();
    // getList();
  };

  return (
    <Fragment>
      {/*-------------------------------------- Start of Modal-------------------------- */}

      <AddBankPayment
        handleOk={handleOk}
        modalVisible={modalVisible}
        handleCancel={handleCancel}
        submitData={submitData}
        venueId={23}
        editData={editData}
      />
      <AddWhtPayment
        handleOk={handleWhtOk}
        modalVisible={whtModalVisible}
        handleCancel={handleWhtCancel}
        submitData={submitData}
        venueId={23}
        editData={editData}
      />

      {/*-------------------------------------- End of Modal-------------------------- */}
      <Row className="mt-10" gutter={[20, 20]}>
        <Col span={8}>
          <label className="text-[14px] block font-normal">Type</label>

          <Select
            placeholder="All"
            style={{ width: "100%", height: 40, borderRadius: 6 }}
            options={invoiceType.map((i) => ({ value: i, label: i }))}
            
            // onChange={(e) => setFilter({ ...filter, status: e })}
          ></Select>
        </Col>
        <Col span={8}>
          <label className="text-[14px] block font-normal">Customers</label>

          <Select
            placeholder="Select Customer"
            style={{ width: "100%", height: 40, borderRadius: 6 }}
            options={suppliers.map((i) => ({ value: i, label: i }))}
            showSearch
            // onChange={(e) => setFilter({ ...filter, status: e })}
          ></Select>
        </Col>
        <Col span={8}>
          <label className="text-[14px]  block font-normal">Date Range</label>

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
        <h1 className="text-3xl tracking-wider mb-6">Stock Adjustments</h1>
        <div className="flex gap-3">
          <Select
            defaultValue="Add New"
            style={{ width: 150, height: 40 }}
            onChange={(e) => {
              navigate(`/dashboard/inventory/${e}`);
            }}
            variant="filled"
            
            options={[
              { value: "out-adjustment", label: "Out Adjustment" },
              { value: "in-adjustment", label: "In Adjustment" },
             
            ]}
          />

          <Button
            type="primary"
            className="flex h-10 items-center font-semibold  text-white"
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

export default StockAdjustment;