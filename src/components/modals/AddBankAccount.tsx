import { Button, Col, Flex, message, Modal, Row } from "antd";
import { Divider } from "antd";
import { DatePickerBox, InputBox, TextAreaBox } from "@components/formfields";
import { useForm } from "react-hook-form";

import { axiosInstance } from "@apiClient";

import { StepProps } from "@components/shared/types";
import { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { addbankAccount } from "@validations/articles/articles";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";
import dayjs from "dayjs";

interface Props extends StepProps {}

const AddBankAccount = ({
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
    resolver: yupResolver(addbankAccount),
  });
  const { company }: any = useSelector((state: RootState) => state.common);
console.log(company)
  // useEffect(() => {
  //   if (editData && Object?.keys(editData)?.length > 0) {
  //     setValue("bank", editData?.bank);
  //     setValue("code", editData?.code);
  //     setValue("description", editData?.description);
  //   }
  // }, [editData]);

  const onSubmit = async (data: any) => {
    console.log(data);
    data.company_id = company?.id;
    data.currency = "USD";
    data.opening_balance_date  = dayjs(data.opening_balance_date).format("YYYY-MM-DD")
    console.log(data);


    try {
      const url = editData?.id
        ? `/comapnies/${editData.id}`
        : `/companies/${company?.id}/bank-accounts`;

      const res: any = editData?.id
        ? await axiosInstance.patch(url, data)
        : await axiosInstance.post(url, data);
        console.log(res)
      if (res?.statusCode === 201) {
        console.log(res);
        message.open({
          type: "success",
          content: editData?.id
            ? "Bank Edit Successfully"
            : "Bank Added Successfully",
        });
        submitData();
        reset();
        handleCancel();
      } else {
        message.open({
          type: "error",
          content: "Something went wrong",
        });
      }
    } catch (error: any) {
      console.log("error", error);
      message.error(error?.response?.data?.message);
    }
  };

  return (
    <Modal
      open={modalVisible}
      title={"New Bank Account"}
      width={930}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      // destroyOnClose
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[20, 20]} className="my-4">
          <Col span={12}>
            <InputBox
              name="bank_name"
              control={control}
              label={"Bank Name"}
              placeholder="Start Typing..."
              error={errors?.bank_name?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="account_name"
              control={control}
              label={"Account Name"}
              placeholder="Start Typing..."
              error={errors?.account_name?.message}
            />
          </Col>
        </Row>
        <Row gutter={[20, 20]} className="my-4">
          <Col span={12}>
            <InputBox
              name="account_number"
              control={control}
              label={"Account Number"}
              placeholder="Start Typing..."
              error={errors?.account_number?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="opening_balance"
              control={control}
              label={"Opening Balance"}
              placeholder="Start Typing..."
              error={errors?.opening_balance?.message}
            />
          </Col>
          <Col span={12}>
            <DatePickerBox
              name="opening_balance_date"
              control={control}
              label={"Opening Balance Date"}
              placeholder="Start Typing..."
              error={errors?.opening_balance_date?.message}
            />
          </Col>
        </Row>
       
        <Divider />

        {/* <Button htmlType="submit">Submit</Button> */}
        <Flex align="end" justify="end" className="mt-10">
          <Button
            className="text-[#23AED5] font-bold border-2 border-[#23AED5] h-[38px]  w-[120px] rounded mr-4"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            className="text-[#fff] bg-[#23AED5] w-[120px] h-[38px] font-bold border-2 border-[#23AED5] rounded"
            // onClick={() => handleOk()}
          >
            Save
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
export default AddBankAccount;
