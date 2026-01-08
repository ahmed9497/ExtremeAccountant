import { Fragment } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { Button, Col, Flex, message, Row } from "antd";
import { InputBox, TreeSelectBox } from "@components/formfields";
import { axiosInstance } from "@apiClient";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import { addRoleSchema } from "@validations/overview/overview";

const AddRole = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },

    reset,

  } = useForm({
    resolver: yupResolver(addRoleSchema),
  });
  const [permissions, setPermissions] = useState([]);
  const [apis, setApis] = useState([]);
  useEffect(() => {
    getPermissionsList();
    getApiList();
  }, []);
  const getPermissionsList = async () => {
   
    try {
      const res: any = await axiosInstance.get(`/role/permissions`);
      if (res?.code === 200) {
        setPermissions(res.data);
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };
  const getApiList = async () => {

    try {
      const res: any = await axiosInstance.get(`/role/apiroutes`);
      if (res?.code === 200) {
        setApis(res.data);
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const onSubmit = async (data: any) => {
    

    let roleapiMap = {
      roleName: data.name,
      permissions: data?.permissions?.map((i: string) => Number(i)),
      apis: data?.apis?.map((i: string) => Number(i)),
    };

    console.log(roleapiMap);


    try {
      const res: any = await axiosInstance.post("/role/role-permission-route/create", roleapiMap);
      if (res?.code === 200) {
        console.log(res);
        message.success("Role created successfully")
        reset()
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };
  return (
    <Fragment>
      <h1 className="text-4xl font-extrabold capitalize mb-8">
        Create a New Role
      </h1>
      <h3 className="text-[30px] mb-8">Role Info</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full max-h-[500px]  flex flex-col justify-between"
      >
        <Row gutter={20}>
          <Col span={8}>
            <InputBox
              name="name"
              control={control}
              label={"Role Name"}
              placeholder="Start typing..."
              error={errors?.name?.message}
            />
          </Col>
          <Col span={8}>
            <TreeSelectBox
              name="permissions"
              control={control}
              label={"Permissions"}
              placeholder="Start typing..."
              error={errors?.name?.message}
              options={
                permissions &&
                permissions.map((i:any) => ({ title: i.permission, value: i.id }))
              }
            />
          </Col>
          <Col span={8}>
            <TreeSelectBox
              name="apis"
              control={control}
              label={"API’s"}
              placeholder="Start typing..."
              error={errors?.name?.message}
              options={
                apis &&
                apis.map((i:any) => ({ title: i.endpoint, value: i.id }))
              }
            />
          </Col>
        </Row>

        {/* <Button htmlType="submit">Submit</Button> */}
        <Flex justify="end" className="">
          <Button
            type="primary"
            htmlType="submit"
            className="text-[#fff] bg-[#23AED5] w-[120px] h-[38px] font-bold border-2 border-[#23AED5] rounded"
            // onClick={() => next()}
          >
            Save
          </Button>
        </Flex>
      </form>
    </Fragment>
  );
};

export default AddRole;
