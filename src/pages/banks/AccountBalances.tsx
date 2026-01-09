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
import { useSelector } from "react-redux";
import { RootState } from "@state/store";


interface DataType {
  id: number;
  account_name: string;
  account_number: string;
  bank_name: string;
  opening_balance_date: string;
  opening_balance: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Bank",
    dataIndex: "bank_name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Account Name",
    dataIndex: "account_name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Account Number",
    dataIndex: "account_number",
    render: (text: string) => <a>{text}</a>,
  },
  // {
  //   title: "Reconcile Date",
  //   dataIndex: "createdAt",
  //   render: (text) => <div>{dayjs(text).format('DD/MM/YYYY')}</div>,
  // },
  {
    title: "Opening Balance",
    dataIndex: "opening_balance",
    render: (text) => <div>{text}</div>,
  },
    {
      title: "Opening Balance Date",
      dataIndex: "opening_balance_date",
      render: (text) => <div>{dayjs(text).format('DD/MM/YYYY')}</div>,
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
  const [banks, setBanks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState<any>();
  const {company }: any = useSelector((state: RootState) => state.common);

 
  
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
   
    try {
      const res: any = await axiosInstance.get(`/companies/${company?.id}/bank-accounts`);
      if (res?.statusCode === 200) {
        setBanks(res.data);
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
        dataSource={banks}
        rowKey={"id"}
        bordered
        size="small"
      />
    </Fragment>
  );
};

export default AccountBalances;
