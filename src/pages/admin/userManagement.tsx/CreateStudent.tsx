import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Row } from "antd";




const CreateStudent = () => {

  const onSubmit : SubmitHandler<FieldValues> = (data)=>{

    console.log(data)
    
    // const formData = new FormData()
    
    // formData.append("data",JSON.stringify(data))
    
    // console.log(Object.fromEntries(formData))
  }


  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={{span:8}}>
          <PHInput name="name.firstName" type="text" label="First Name" />
            </Col>
            <Col span={24} md={12} lg={{span:8}}>
          <PHInput name="name.middleName" type="text" label="Middle Name" />
            </Col>
            <Col span={24} md={12} lg={{span:8}}>
          <PHInput name="name.lastName" type="text" label="Last Name" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={12} lg={{span:8}}>
          <PHInput name="gender" type="text" label="First Name" />
            </Col>
            <Col span={24} md={12} lg={{span:8}}>
          <PHInput name="name.middleName" type="text" label="Middle Name" />
            </Col>
            <Col span={24} md={12} lg={{span:8}}>
          <PHInput name="name.lastName" type="text" label="Last Name" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;




const studentDummyData = {
  password: "Student123",
  student: {
    name: {
      firstName: "Sheik",
      middleName: "Musleh",
      lastName: "Uddin",
    },
    gender: "male",
    dateOfBirth: "2000-01-15T00:00:00.000Z",
    contactNumber: "1234567890",
    emergencyContactNo: "0987654321",
    bloodGroup: "A+",
    email: "sheikmuslehud@gmail.com",
    admissionSemester: "6688111801527f26aac88d9b",
    academicDepartment: "6688044328eb2c1fe231e57b",
    presentAddress: "123 Present St, City, Country",
    permanentAddress: "456 Permanent Ave, City, Country",
    guardian: {
      father: {
        name: "John Smith",
        occupation: "Engineer",
        contactNumber: "1234567890",
      },
      mother: {
        name: "Jane Smith",
        occupation: "Teacher",
        contactNumber: "0987654321",
      },
    },
    localGuardian: {
      name: "Robert Johnson",
      occupation: "Doctor",
      contactNumber: "1122334455",
      address: "789 Local Guardian St, City, Country",
    },
    profileImg: "https://example.com/profile.jpg",
  },
};
