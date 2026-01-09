import type { FormProps } from "antd";
import { Button, Col, Form, Input, Row } from "antd";
import { axiosInstance } from "@apiClient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { setUser } from "@state/user/user";
import { useNavigate } from "react-router";
import { login } from "@globalConstant";
import Logo from "@assets/images/logo.png";
import { useEffect } from "react";

type FieldType = {
  email?: string;
  password?: string;
};

const PreLoginLayout = () => {
  const { user, token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      navigate("/companies", { replace: true });
    }
  }, [token, user, navigate]);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const res: any = await axiosInstance.post(login, {
      email: values.email,
      password: values.password,
    });
    console.log(res);
    if (res?.statusCode === 200) {
      dispatch(setUser(res));

      localStorage.setItem("access_token", res.token);
      // localStorage.setItem("refresh_token","refresh_token")//||res.data.tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      // localStorage.setItem("user", JSON.stringify({name:"Ali"}));

      navigate("/companies", { replace: true });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-[100vh]">
      <Row className="h-full min-h-[100vh]">
        <Col span={12} className="pt-20">
          <Row>
            <Col span={16} offset={4}>
              <div className="my-8">
                {" "}
                <img className="size-20" src={Logo} alt="logo" />
              </div>
              <div className="mt-12 mb-10">
                <h1 className="text-3xl text-[#04090C] leading-9">
                  Login To Super Admin Account
                </h1>
                <p className="text-[16px] text-[#04090C] leading-5">
                  Enter your email address and password to login
                </p>
              </div>
              <Form
                name="basic"
                layout={"vertical"}
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password autoComplete="false" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    className="w-full h-[50px] mt-10"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col span={12} className="bg-[#1A1818]">
          <div className="bg-center bg-no-repeat bg-[url('/src/assets/images/logo.png')] h-full w-full"></div>
        </Col>
      </Row>
    </div>
  );
};
export default PreLoginLayout;
