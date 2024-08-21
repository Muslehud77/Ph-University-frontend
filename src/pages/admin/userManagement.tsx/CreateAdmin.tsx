import React from "react";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { genderOptions } from "../../../constants/global";
import { useCreateAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { useToastPromise } from "../../../hooks/useToastPromise";

const defaultValues = {
  designation: "Manager",
  name: {
    firstName: "Alice",
    middleName: "M",
    lastName: "Smith",
  },
  gender: "female",
  // dateOfBirth: "2000-01-15T00:00:00.000Z",
  email: "jhonnn@transaction.com",
  contactNumber: "1234567890",
  presentAddress: "123 Present St, City, Country",
  permanentAddress: "456 Permanent Ave, City, Country",
};

const CreateAdmin = () => {
  const [addAdmin] = useCreateAdminMutation();
  const { toastPromise } = useToastPromise();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const adminData = {
      password: "admin123",
      admin: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.profileImage);

    await toastPromise(addAdmin, formData, "Creating admin...");

  };

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
              <Controller
                name="profileImage"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      value={value?.fileName}
                      {...field}
                      name="profileImage"
                      type="file"
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
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
          <Divider>Professional Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={{ span: 8 }}>
              <PHInput name="designation" type="text" label="Designation" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
