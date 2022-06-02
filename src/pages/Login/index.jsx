import styles from "./index.module.scss";
import logo from "../../assets/images/logo.png";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "@/store/userSlice";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const result = await dispatch(
      login({ mobile: values.mobile, code: values.code })
    );
    if (!result.error) {
      // 登录成功
      const redirectURL = location?.state?.redirectURL;
      // 如果有重定向URL则跳转到重定向URL 否则跳转到首页
      navigate(redirectURL || "/");
    } else {
      // 登录失败
      alert(result.error);
    }
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <div className="wrapper">
          <img className="logo" src={logo} alt="" />
          {/* 登录表单 */}
          <Form
            name="basic"
            size="large"
            initialValues={{
              mobile: "13911111111",
              code: "246810",
              isAgree: true,
            }}
            validateTrigger={["onChange", "onBlur"]}
            onFinish={onFinish}
          >
            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: "请输入手机号" },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "手机格式不正确",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                { required: true, message: "请输入验证码" },
                { len: 6, message: "验证码6个字符串" },
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="请输入验证码" />
            </Form.Item>

            <Form.Item
              name="isAgree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(new Error("请勾选我已阅读并同意"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
