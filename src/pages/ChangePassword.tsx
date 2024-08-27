import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import {  FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { useToastPromise } from "../hooks/useToastPromise";

const ChangePassword = () => {
    const {toastPromise} = useToastPromise()
    const [changePassword] = useChangePasswordMutation()

    const onSubmit : SubmitHandler<FieldValues> =async (data)=>{
       
        const res= await toastPromise(changePassword, data,"Changing password...") as Record<string,unknown> ;

        if(res?.success){
            console.log("hello")
        }
        

        console.log(res)
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