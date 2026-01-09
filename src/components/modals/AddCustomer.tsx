import {
  Button,
  Checkbox,
  Col,
  Flex,
  message,
  Modal,
  Row,
  Tabs,
} from "antd";
import { Divider } from "antd";
import {

    CheckBoxField,
  InputBox,
  TextAreaBox,
} from "@components/formfields";
import { useForm } from "react-hook-form";


import { axiosInstance } from "@apiClient";

import { StepProps } from "@components/shared/types";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { addbankAccount, addCustomer } from "@validations/articles/articles";

interface Props extends StepProps {}




const AddCustomer = ({
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
    resolver: yupResolver(addCustomer),
  });


  useEffect(()=>{

    // if(editData && Object?.keys(editData)?.length >0){
      
     
    //   setValue('bank', editData?.bank);
    //   setValue('code', editData?.code);
    //   setValue('description', editData?.description);
      
    // }
    },[editData])

  const onSubmit = async (data: any) => {
    console.log(data);

    // const formData = new FormData();

   
    // data.tags = JSON.stringify(data.tags);
    // for (const key in data) {
    //   let val = data[key];
    //   formData.append(key, val);
    // }

    // const url = editData?.id ? `${updateArticles}/${editData.id}` : addArticles;
    // try {

    //   const res: any = editData?.id ? await axiosInstance.patch(url, formData): await axiosInstance.post(url, formData);
    //   if (res?.code === 200) {
    //     console.log(res);
    //     message.open({
    //       type: "success",
    //       content: editData?.id ?"Article Edit Successfully":"Article Added Successfully",
    //     });
    //     submitData();
    //     reset();
    //     handleCancel();
    //   } else {
    //     message.open({
    //       type: "error",
    //       content: "Something went wrong",
    //     });
    //   }
    // } catch (error: any) {
    //   console.log("error", error);
    //   message.error(error?.response?.data?.message)
    // }
  };
 const Address=()=>(
     <Row gutter={[20, 20]} className="my-4">
          <Col span={12}>
            <InputBox
              name="billingAddress"
              control={control}
              label={"Billing Address"}
              placeholder="Start Typing..."
              error={errors?.businessName?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="city"
              control={control}
              label={"City"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="province"
              control={control}
              label={"Province"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="postalCode"
              control={control}
              label={"Postal Code"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="country"
              control={control}
              label={"Country"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
        </Row>
 )
 const TaxInfo=()=>(
     <Row gutter={[20, 20]} className="my-4">
          <Col span={12}>
            <InputBox
              name="ntn"
              control={control}
              label={"NTN"}
              placeholder="Start Typing..."
              error={errors?.businessName?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="stn"
              control={control}
              label={"STN"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="cnc"
              control={control}
              label={"CNIC"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          
        </Row>
 )
 const Terms=()=>(
     <Row gutter={[20, 20]} className="my-4" align={'middle'}>
          <Col span={12}>
            <InputBox
              name="billingAddress"
              control={control}
              label={"Payment Term days"}
              placeholder="Start Typing..."
              error={errors?.businessName?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="city"
              control={control}
              label={"Credit Limit"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="province"
              control={control}
              label={"Opening Date"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="postalCode"
              control={control}
              label={"Opening Balance"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={10}>
            <InputBox
              name="country"
              control={control}
              label={"Discount"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={5}>
            <CheckBoxField
              name="country"
              control={control}
              label={"Apply Credit Limit"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={4}>
            <CheckBoxField
              name="country"
              control={control}
              label={"Supplier"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
          <Col span={4}>
            <CheckBoxField
              name="country"
              control={control}
              label={"Filer"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
        </Row>
 )

 const Notes=()=>(
     <Row gutter={[20, 20]} className="my-4">
          <Col span={24}>
            <TextAreaBox
              name="businessName"
              control={control}
              rows={4}
              label={"Notes"}
              placeholder="Start Typing..."
              error={errors?.businessName?.message}
            />
          </Col>
         
        </Row>
 )
   const [items, setItems] = useState([
    {
      label: 'Address',
      key: '1',
      children: <Address/>,
    },
    {
      label: 'Tax info',
      key: '2',
      children: <TaxInfo/>,
    },
    {
      label: 'Terms',
      key: '3',
      children: <Terms/>,
    },
    {
      label: 'Notes',
      key: '4',
      children: <Notes/>,
    },
  ]);
  return (
    <Modal
      open={modalVisible}
      title={"Customer Information"}
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
              name="businessName"
              control={control}
              label={"Business Name"}
              placeholder="Start Typing..."
              error={errors?.businessName?.message}
            />
          </Col>
          <Col span={12}>
            <InputBox
              name="Email"
              control={control}
              label={"email"}
              placeholder="Start Typing..."
              error={errors?.email?.message}
            />
          </Col>
        </Row>

        <Row gutter={[20, 20]} className="mt-4">
          <Col span={12}>
             <InputBox
              name="firstName"
              control={control}
              label={"First Name"}
              placeholder="Start Typing..."
              error={errors?.firstName?.message}
            />
          </Col>
          <Col span={12}>
             <InputBox
              name="lastName"
              control={control}
              label={"Last Name"}
              placeholder="Start Typing..."
              error={errors?.lastName?.message}
            />
          </Col>
        </Row>
        <Row gutter={[20, 20]} className="mt-4">
          <Col span={12}>
             <InputBox
              name="mobile"
              control={control}
              label={"Mobile"}
              placeholder="Start Typing..."
              error={errors?.mobile?.message}
            />
          </Col>
          <Col span={12}>
             <InputBox
              name="phone"
              control={control}
              label={"Phone"}
              placeholder="Start Typing..."
              error={errors?.phone?.message}
            />
          </Col>
        </Row>
        <Row gutter={[20, 20]} className="mt-4">
          <Col span={12}>
             <InputBox
              name="accountNo"
              control={control}
              label={"Account No."}
              placeholder="Start Typing..."
              error={errors?.accountNo?.message}
            />
          </Col>
          <Col span={12}>
             <InputBox
              name="website"
              control={control}
              label={"Website"}
              placeholder="Start Typing..."
              error={errors?.website?.message}
            />
          </Col>
        </Row>


        <Divider />

<Tabs
        defaultActiveKey="1"
        type="card"
        size={'small'}
        style={{ marginBottom: 32 }}
        items={items}
        // items={Array.from({ length: 3 }).map((_, i) => {
        //   const id = String(i + 1);
        //   return {
        //     label: `Card Tab ${id}`,
        //     key: id,
        //     children: `Content of card tab ${id}`,
        //   };
        // })}
      />
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
export default AddCustomer;
