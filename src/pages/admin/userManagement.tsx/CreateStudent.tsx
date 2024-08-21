import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAllAcademicDepartmentsQuery, useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TOptions } from "../../../types/global.type";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { useToastPromise } from "../../../hooks/useToastPromise";


 const defaultValues = {
   name: {
     firstName: "Sheik",
     middleName: "Musleh",
     lastName: "Uddin",
   },
   gender: "male",
  //  dateOfBirth: "2000-01-15T00:00:00.000Z",
   bloodGroup: "A+",
   email: "sheikmuslehuddd@gmail.com",
   contactNumber: "1234567890",
   emergencyContactNo: "0987654321",

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
   admissionSemester: "6688111801527f26aac88d9b",
   academicDepartment: "6688044328eb2c1fe231e57b",
  //  profileImg: "https://example.com/profile.jpg",
 };

 

const CreateStudent = () => {

  const [addStudent] = useCreateStudentMutation()
  const { toastPromise } = useToastPromise();
 

   const {
     data: departmentData,
     isLoading:departmentLoading,
     
   } = useGetAllAcademicDepartmentsQuery(undefined);

  const {
    data: semesterData,
    isLoading:semesterLoading,
   
  } = useGetAllSemestersQuery(undefined);

  const semesterOptions = [] as TOptions
  const departmentOptions = [] as TOptions

  if(semesterData?.data){
   semesterData?.data?.forEach((semester) =>
     semesterOptions.push({ value: semester._id, label: `${semester.name} ${semester.year}` })
   );
  }
  if(departmentData?.data){
   departmentData?.data?.forEach((department) =>
     departmentOptions.push({
       value: department._id,
       label: department.name,
     })
   );
  }

  const onSubmit : SubmitHandler<FieldValues> = async (data)=>{

    // console.log(data)

    const studentData = {
      password: "student123",
      student:data
    }

    const formData = new FormData()
    
    formData.append("data", JSON.stringify(studentData));
    formData.append("file",data.image)

   await toastPromise(addStudent, formData,"Creating student...");
   

    // console.log(Object.fromEntries(formData))
  }


  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput name="name.firstName" type="text" label="First Name" />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput name="name.middleName" type="text" label="Middle Name" />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput name="name.lastName" type="text" label="Last Name" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHSelect name="gender" options={genderOptions} label="Gender" />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHSelect
                name="bloodGroup"
                options={bloodGroupOptions}
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange,value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input value={value?.fileName} {...field} name="image" type="file" onChange={(e)=>onChange(e.target.files?.[0])} />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput name="email" type="text" label="Email" />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="contactNumber"
                type="text"
                label="Contact Number"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="emergencyContactNo"
                type="text"
                label="Emergency Contact Number"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="presentAddress"
                type="text"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="permanentAddress"
                type="text"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="guardian.father.name"
                type="text"
                label="Father's Name"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="guardian.father.occupation"
                type="text"
                label="Father's Occupation"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="guardian.father.contactNumber"
                type="text"
                label="Father's Contact No"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="guardian.mother.name"
                type="text"
                label="Mother's Name"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="guardian.mother.occupation"
                type="text"
                label="Mother's Occupation"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="guardian.mother.contactNumber"
                type="text"
                label="Mother's Contact No"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.name"
                type="text"
                label="Guardian Name"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.occupation"
                type="text"
                label="Guardian Occupation"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.contactNumber"
                type="text"
                label="Guardian Contact No"
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.address"
                type="text"
                label="Guardian Address"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHSelect
                name="admissionSemester"
                options={semesterOptions}
                label="Admission Semester"
                loading={semesterLoading}
              />
            </Col>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                options={departmentOptions}
                label="Academic Department"
                loading={departmentLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;




// const studentDummyData = {
//   password: "Student123",
//   student: {
//     name: {
//       firstName: "Sheik",
//       middleName: "Musleh",
//       lastName: "Uddin",
//     },
//     gender: "male",
//     dateOfBirth: "2000-01-15T00:00:00.000Z",
//     bloodGroup: "A+",
//     email: "sheikmuslehud@gmail.com",
//     contactNumber: "1234567890",
//     emergencyContactNo: "0987654321",

//     presentAddress: "123 Present St, City, Country",
//     permanentAddress: "456 Permanent Ave, City, Country",
//     guardian: {
//       father: {
//         name: "John Smith",
//         occupation: "Engineer",
//         contactNumber: "1234567890",
//       },
//       mother: {
//         name: "Jane Smith",
//         occupation: "Teacher",
//         contactNumber: "0987654321",
//       },
//     },
//     localGuardian: {
//       name: "Robert Johnson",
//       occupation: "Doctor",
//       contactNumber: "1122334455",
//       address: "789 Local Guardian St, City, Country",
//     },
//     admissionSemester: "6688111801527f26aac88d9b",
//     academicDepartment: "6688044328eb2c1fe231e57b",
//     profileImg: "https://example.com/profile.jpg",
//   },
// };

