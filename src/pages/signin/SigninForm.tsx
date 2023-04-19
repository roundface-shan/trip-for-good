import styles from "./Signin.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { userSignIn } from "../../redux/SignIn/slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const SignInForm = () => {
    const isLoading = useSelector(state => state.signIn.isLoading)
    const jwt = useSelector(state => state.signIn.token)
    const error = useSelector(state => state.signIn.error)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(jwt !== null) {
            navigate('/')
        }
    }, [jwt])

  const onFinish = (values: any) => {
    dispatch(userSignIn({
        username: values.username,
        password: values.password
    }))
    console.log("Success:", values)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles["signin-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};