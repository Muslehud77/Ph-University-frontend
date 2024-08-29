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
import { useToastPromise } from "../hooks/useToastPromise";


export type TLoginResponse = {
  success: boolean
  message: string

  data:  {
  accessToken: string
  isPasswordNeedsChange: boolean
}
}







const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {toastPromise} = useToastPromise()

  const [login, { isLoading }] = useLoginMutation();


  const defaultValues = {
    userId: "2026010001",
    password: "12345",
  };

  const onSubmit = async (formData: FieldValues) => {
   
   
    const userInfo = {
      id: formData.userId,
      password: formData.password,
    };
    
    const res = (await toastPromise(
      login,
      userInfo,
      "logging in"
    )) as TLoginResponse;

  
     if(res?.success){
      const user = verifyToken(res?.data?.accessToken) as TUser;

      if (res?.data?.isPasswordNeedsChange) {
        navigate("/change-password");
      } else {
        navigate(`/${user?.role}/dashboard`);
      }

      dispatch(setUser({ user, token: res?.data?.accessToken }));
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
