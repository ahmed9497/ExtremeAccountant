import {
  Button,
  Col,
  Flex,
  message,
  Modal,
  Row,
} from "antd";
import { Divider } from "antd";
import {

  InputBox,
  TextAreaBox,
} from "@components/formfields";
import { useForm } from "react-hook-form";


import { axiosInstance } from "@apiClient";
import { addArticles, updateArticles } from "@globalConstant";
import { StepProps } from "@components/shared/types";
import { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { addbankAccount } from "@validations/articles/articles";

interface Props extends StepProps {}




const AddBankAccount = ({
  modalVisible,
  handleCancel,
  submitData,
  handleOk,
  editData
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


  useEffect(()=>{

    if(editData && Object?.keys(editData)?.length >0){
      
     
      setValue('bank', editData?.bank);
      setValue('code', editData?.code);
      setValue('description', editData?.description);
      
    }
    },[editData])




  const onSubmit = async (data: any) => {
    console.log(data);

    const formData = new FormData();

   
    data.tags = JSON.stringify(data.tags);
    for (const key in data) {
      let val = data[key];
      formData.append(key, val);
    }

    const url = editData?.id ? `${updateArticles}/${editData.id}` : addArticles;
    try {

      const res: any = editData?.id ? await axiosInstance.patch(url, formData): await axiosInstance.post(url, formData);
      if (res?.code === 200) {
        console.log(res);
        message.open({
          type: "success",
          content: editData?.id ?"Article Edit Successfully":"Article Added Successfully",
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
      message.error(error?.response?.data?.message)
    }
  };

  return (
    <Modal
      open={modalVisible}
      title={"New Account"}
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
              name="bank"
              control={control}
              label={"Bank Account"}
              placeholder="Start Typing..."
              error={errors?.bank?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="code"
              control={control}
              label={"Code"}
              placeholder="Start Typing..."
              error={errors?.code?.message}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col span={24}>
            <TextAreaBox
              rows={6}
              control={control}
              name="description"
              placeholder="Start Typing..."
              label={"Description"}
              error={errors?.description?.message}
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
