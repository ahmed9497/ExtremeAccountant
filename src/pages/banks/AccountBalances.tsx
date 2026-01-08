import {  Button, Space } from "antd";
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


interface DataType {
  id: number;
  bank: string;
  code: string;
  createdAt: string;
  balance: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Bank",
    dataIndex: "bank",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Code",
    dataIndex: "code",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Reconcile Date",
    dataIndex: "createdAt",
    render: (text) => <div>{dayjs(text).format('DD/MM/YYYY')}</div>,
  },
  {
    title: "Balance",
    dataIndex: "balance",
    render: (text) => <div>{text}</div>,
  },
  
  

  // {
  //   title: "Actions",
  //   // dataIndex: 'status',
  //   render: () => (
  //     <Space size="small">
  //       <div className="bg-[#F7F7F7] p-2 cursor-pointer rounded">
  //         <BiEditAlt size={15} />
  //       </div>
      
  //       <div className="bg-[#F7F7F7] p-2 cursor-pointer rounded">
  //         <RiDeleteBin6Line size={15} color="red" />
  //       </div>
  //     </Space>
  //   ),
  // },
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
const AccountBalances = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState<DataType[]>([]);
  const [roles, setRoles] = useState([
    {
      id:1,
      bank:'Askari bank',
      code:'23432',
      createdAt:'12/11/2024',
      balance:'23423'
    },
    {
      id:2,
      bank:'Habib bank',
      code:'234322',
      createdAt:'14/11/2024',
      balance:'234213'
    }
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
    getList();
  };

  
  return (
    <Fragment>
        {/*-------------------------------------- Start of Modal-------------------------- */}

      <AddBankAccount
        handleOk={handleOk}
        modalVisible={modalVisible}
        handleCancel={handleCancel}
        submitData={submitData}
        venueId={23}
        editData={editData}

      />

      {/*-------------------------------------- End of Modal-------------------------- */}
      {/* <Row className="mt-10" gutter={[20, 20]}>
        <Col span={4}>
          <label className="text-[14px] block font-normal">Status</label>

          <Select
            placeholder="Select  "
            style={{ width: "100%" }}
            options={[{ value: "", label: "Moderation" }]}
            onChange={(e) => setFilter({ ...filter, status: e })}
          ></Select>
        </Col>
        <Col span={5}>
          <label className="text-[14px] block font-normal">
            Date (From)
          </label>

          <DatePicker
            onChange={(e) => {
              setFilter({
                ...filter,
                startDate: e ? dayjs(e).format("YYYY-MM-DD") : "",
              });
            }}
            className="w-full"
          />
        </Col>
        <Col span={5}>
          <label className="text-[14px] block font-normal">
            Date (To)
          </label>

          <DatePicker
            onChange={(e) => {
              setFilter({
                ...filter,
                endDate: e ? dayjs(e).format("YYYY-MM-DD") : "",
              });
            }}
            className="w-full"
          />
        </Col>
        <Col span={5}>
          <label className="text-[14px] block font-normal">Channel</label>

          <Select
            placeholder="Select  "
            style={{ width: "100%" }}
            options={articlesCategories.map((i: any) => ({
              label: i.name,
              value: i.id,
            }))}
            onChange={(e) => {
              setFilter({ ...filter, categoryId: e });
            }}
          ></Select>
        </Col>
        <Col span={5}>
          <label className="text-[14px] block font-normal">Type</label>

          <Select
            placeholder="Select  "
            style={{ width: "100%" }}
            options={[{ value: "12", label: "12:00" }]}
          ></Select>
        </Col>
      </Row>
      <Divider /> */}
      <div className="mt-6 flex justify-between">
        <h1 className="text-3xl tracking-wider mb-6">Account Balances</h1>
        <Button
          type="primary"
          className="flex items-center font-semibold  text-white"
          icon={<BiPlus color="white" />}
          // onClick={() => {
          //   navigate('/dashboard/overview/add-role')
          // }}
          onClick={() => {
            setModalVisible(true);
          }}
        >
         New Account
        </Button>
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

export default AccountBalances;
