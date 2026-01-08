import {
  Button,
  Col,
  DatePicker,
  Divider,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { BiEditAlt, BiPlus } from "react-icons/bi";
import { Fragment } from "react/jsx-runtime";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useNavigate } from "react-router";
import { axiosInstance } from "@apiClient";
import dayjs from "dayjs";

import { suppliers } from "@utils/data";

import { FaFileImport, FaFileInvoice } from "react-icons/fa6";
import AddCustomer from "@components/modals/AddCustomer";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { LuPrinter } from "react-icons/lu";

interface DataType {
  accountNo: string;
  customer: string;
  contact: string;
  email: string;
  mobile: string;
  balance: string;
}

const CustomerOpenBal = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState<DataType[]>([]);
  const [roles, setRoles] = useState([
    {
      id: 1,
      accountNo: "234324",
      customer: "Ali",
      contact: "03432423423",
      email: "234",
      mobile: "03432423423",
      balance: "234234",
    },
    {
      id: 2,
      accountNo: "234324",
      customer: "Ali",
      contact: "03432423423",
      email: "234",
      mobile: "03432423423",
      balance: "234234",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [whtModalVisible, setWhtModalVisible] = useState(false);
  const [editData, setEditData] = useState<any>();


const columns: TableColumnsType<DataType> = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => <div>{dayjs(text).format("DD/MM/YYYY")}</div>,
    },
  // {
  //   title: "Customer",
  //   dataIndex: "customer",
  //   render: (text: string) => <a>{text}</a>,
  // },
  {
    title: "A/C No",
    dataIndex: "accountNo",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Type",
    dataIndex: "contact",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Doc No.",
    dataIndex: "email",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Total",
    dataIndex: "mobile",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Balance",
    dataIndex: "balance",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Actions",
    // dataIndex: 'status',
    render: () => (
      <Space size="small">
        <div className="bg-[#F7F7F7] p-1 cursor-pointer rounded" onClick={()=>navigate('/dashboard/sales/sale-invoice-receipt')}>
          <GiTakeMyMoney size={20} color="green"/>
        </div>
        <div className="bg-[#F7F7F7] p-1 cursor-pointer rounded">
          <FaFileInvoice size={15} color="violet"/>
        </div>
        <div className="bg-[#F7F7F7] p-1 cursor-pointer rounded">
          <MdOutlineAttachEmail size={15} color="purple"/>
        </div>
        <div className="bg-[#F7F7F7] p-1 cursor-pointer rounded">
          <LuPrinter size={15} />
        </div>

        <div className="bg-[#F7F7F7] p-1 cursor-pointer rounded">
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
     
      <Row className="mt-10" gutter={[20, 20]}>
        <Col span={8}>
          <label className="text-[14px] block font-normal">Account No.</label>

          <Input placeholder="Account No." />
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
        <h1 className="text-3xl tracking-wider mb-6">Customer Opening Balances</h1>
        <div className="flex gap-3">
          <Select
            defaultValue="all"
            style={{ width: 150, height: 35 }}
            onChange={(e) => {
              navigate(`/dashboard/sales/${e}`);
            }}
            variant="filled"
            options={[
              { value: "all", label: "All" },
              { value: "archived", label: "Archived" },
              { value: "active", label: "Active" },
            ]}
          />
          <Button
            type='default'
            variant='outlined'
            className="flex items-center font-semibold"
            // icon={<BiPlus color="white" />}
            onClick={() => {
              navigate('/dashboard/sales/customer-open-Bal')
            }}
            // onClick={() => {
            //   setModalVisible(true);
            // }}
          >
            Open Bal.
          </Button>
          <Button
            type="primary"
            className="flex  items-center font-semibold  text-white"
            icon={<BiPlus color="white" />}
            // onClick={() => {
            //   navigate('/dashboard/sales/add-sale-order')
            // }}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            Add
          </Button>
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

export default CustomerOpenBal;
