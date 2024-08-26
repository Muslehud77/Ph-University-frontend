import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks/reduxHooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [login, { isLoading }] = useLoginMutation();


  const defaultValues = {
    userId: "2026020001",
    password: "Student123",
  };

  const onSubmit = async (formData: FieldValues) => {
    console.log(formData);
    const loading = toast.loading("logging in");
    const userInfo = {
      id: formData.userId,
      password: formData.password,
    };

    try {
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      navigate(`/${user?.role}/dashboard`);
      toast.success(res.message, { id: loading });
      dispatch(setUser({ user, token: res.data.accessToken }));
    } catch (err: any) {

      toast.error(err?.data?.message, { id: loading });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" label="ID" name="userId" />
        <PHInput type="text" label="Password" name="password" />

        <Button disabled={isLoading} htmlType="submit">
          Login
        </Button>
      </PHForm>
    </Row>
  );
};

export default Login;
