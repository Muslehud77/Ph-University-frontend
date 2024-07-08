import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks/reduxHooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";



type TLoginData = {
  userId:string,password:string
}

const Login = () => {
const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "SecurePassword123",
    },
  });

  const [login,{error,isLoading}] = useLoginMutation()
 

  const onSubmit = async (formData: TLoginData) => {
    const userInfo = {
      id: formData.userId,
      password: formData.password,
    };

    const res = await login(userInfo).unwrap();

    const user = verifyToken(res.data.accessToken)
   
    
    dispatch(setUser({user,token:res.data.accessToken}))
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
      <Button disabled={isLoading} htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
