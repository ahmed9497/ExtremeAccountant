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

import { banks } from "@utils/data";

import { FaFileImport } from "react-icons/fa6";
import AddBankTransfer from "@components/modals/AddBankTransfer";

interface DataType {
  id: number;
  createdAt: string;
  bank: string;
  code: string;
  balance:string;
  inProgress: string;
  
}

const columns: TableColumnsType<DataType> = [
  {
    title: "ID",
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
    title: "Code",
    dataIndex: "code",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Balance",
    dataIndex: "balance",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "In Progress",
    dataIndex: "inProgress",
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
const Reconcile = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState<DataType[]>([]);
  const [roles, setRoles] = useState([
    {
      id: 1,
      bank: "Askari bank",
      toBank:"HBL",
      createdAt: "12/11/2024",
      code: "230902",
      balance: "2423",
      inProgress: "Deposited",
      
    },
    {
      id: 2,
      bank: "Askari bank",
      toBank:"HBL",
      createdAt: "12/11/2024",
      code: "230902",
      balance: "2423",
      inProgress: "Deposited",
      
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

      {/* <AddBankTransfer
        handleOk={handleOk}
        modalVisible={modalVisible}
        handleCancel={handleCancel}
        submitData={submitData}
        venueId={23}
        editData={editData}
      /> */}

      {/*-------------------------------------- End of Modal-------------------------- */}
      <Row className="mt-10" gutter={[20, 20]}>
        <Col span={8}>
          <label className="text-[14px] block font-normal">Bank</label>

          <Select
            placeholder="Select Bank"
            style={{ width: "100%", height: 40, borderRadius: 6 }}
            options={banks.map((i) => ({ value: i, label: i }))}
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
        <h1 className="text-3xl tracking-wider mb-6">Bank Reconcile</h1>
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
              icon={<BiPlus color="white" />}
            onClick={() => {
              navigate('/dashboard/banks/bank-reconcile-add')
            }}
            
          >
            Add New
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

export default Reconcile;
