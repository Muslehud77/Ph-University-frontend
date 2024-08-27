import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import {  FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { useToastPromise } from "../hooks/useToastPromise";
import { useAppDispatch } from "../redux/hooks/reduxHooks";
import { logout } from "../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const dispatch = useAppDispatch()
    const {toastPromise} = useToastPromise()
    const [changePassword] = useChangePasswordMutation()

    const navigate = useNavigate()

    const onSubmit : SubmitHandler<FieldValues> =async (data)=>{
       
        const res= await toastPromise(changePassword, data,"Changing password...") as Record<string,unknown> ;
        console.log(res);
        if(res?.success){
            dispatch(logout())
             navigate("/login")
        }
        
        

        
    }

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} >
        <PHInput type="password" label="Old Password" name="oldPassword" />
        <PHInput type="password" label="New Password" name="newPassword" />

        <Button  htmlType="submit">
          Login
        </Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;