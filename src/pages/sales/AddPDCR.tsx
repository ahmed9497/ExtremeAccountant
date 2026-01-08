import { banks, modes, suppliers, taxRate } from "@utils/data";
import {
  Button,
  Card,
  Col,
  DatePicker,

  Input,
  Table,
  Row,
  Select,

  message,
  Divider,
  
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaPlus, FaSave } from "react-icons/fa";

import React, { useContext, useEffect, useRef, useState } from "react";

import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router";
import type { TableColumnsType } from "antd";
import dayjs from "dayjs";





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




const AddPDCR = () => {
  const [count, setCount] = useState(3);
  const [editingKey, setEditingKey] = useState<any>("");
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const navigate = useNavigate();
  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };


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

const columns: TableColumnsType<DataType> = [

  {
    title: "Date",
    dataIndex: "createdAt",
    render: (text) => <div>{dayjs(text).format("DD/MM/YYYY")}</div>,
  },
  {
    title: "Type",
    dataIndex: "accountNo",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Voucher ID",
    dataIndex: "customer",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Ref. No.",
    dataIndex: "refNo",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Original Amount",
    dataIndex: "type",
    render: (text: string) => <a>{text}</a>,
  },
  
  {
    title: "Open Balance",
    dataIndex: "amount",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Receipt",
    dataIndex: "total",
    render: (text) => <div>{text}</div>,
  },
];
  return (
    <div>
      <h1 className="text-xl mb-3 font-bold">Add Post Dated Cheque Received</h1>
      <Card>
        <div>
          <Row gutter={20}>
            <Col span={8}>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">
                  Customer
                </label>

                <Select
                  placeholder="Select Customer"
                  style={{ width: "100%", height: 40, borderRadius: 6 }}
                  options={suppliers.map((i) => ({ value: i, label: i }))}
                  showSearch
                  // onChange={(e) => setFilter({ ...filter, status: e })}
                ></Select>
              </div>
              <div>
                <label className="text-[14px] block font-normal">
                  Mailing Address
                </label>

                <TextArea rows={4} placeholder="Address" />
              </div>
            </Col>
            <Col span={8}>
             
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
                <label className="text-[14px] block font-normal">Amount</label>

                <Input placeholder="0.00" />
              </div>

             
            </Col>
            <Col span={8}>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">Cheque Date </label>

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
                  Ref. No.
                </label>

                <Input placeholder="0.00" />
              </div>
               <div className="mb-3">
                <label className="text-[14px] block font-normal">
                  Balance
                </label>

                <div className="bg-slate-200 text-right h-10 flex justify-end items-center px-2 rounded-sm">
                  3.00
                </div>
              </div>
            </Col>
          </Row>
        </div>

       

        <div className="my-3">
          <label className="text-[14px] block font-normal">Details</label>

          <TextArea rows={4} placeholder="Notes" />
        </div>
      </Card>

 

      <Divider />

      <Row className="gap-3">
        <Button type="primary">
          <FaSave /> Save and Close
        </Button>

        <Button type="primary" onClick={() => navigate(-1)}>
          <TiArrowBack /> Cancel
        </Button>
      </Row>
    </div>
  );
};

export default AddPDCR;
