import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks/reduxHooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "SecurePassword123",
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (formData: FieldValues) => {
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
    } catch (err:{data: {message:string}}) {
      toast.error(err?.data?.message, { id: loading });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register("userId")} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button disabled={isLoading} htmlType="submit">
        Login
      </Button>
    </form>
  );
};

export default Login;
