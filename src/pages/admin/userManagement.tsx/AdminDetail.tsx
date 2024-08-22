import { Descriptions, Avatar, Spin, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../redux/features/admin/userManagement.api";
import { TAdmin } from "../../../types";

const AdminDetail = () => {
  const { adminId } = useParams();
  const { data, isLoading, isFetching } = useGetSingleAdminQuery(adminId);

  const admin = data?.data || {} as TAdmin;

  if (isLoading || isFetching) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: "center", marginBottom: "20px" }}>
          <Avatar size={100} src={admin.profileImage} />
          <h2>{`${admin.name?.firstName} ${admin.name?.middleName} ${admin.name?.lastName}`}</h2>
          <h3>Admin ({admin.designation})</h3>
        </Col>
      </Row>

      <Descriptions bordered column={2} size="middle">
        <Descriptions.Item label="Admin ID">{admin.id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">
          {`${admin.name?.firstName} ${admin.name?.middleName} ${admin.name?.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">{admin.gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {new Date(admin?.dateOfBirth as unknown as Date).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{admin.email}</Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {admin.contactNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Present Address" span={2}>
          {admin.presentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Permanent Address" span={2}>
          {admin.permanentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Designation" span={2}>
          {admin.designation}
        </Descriptions.Item>
      
        <Descriptions.Item label="Created At">
          {new Date(admin?.createdAt as unknown as Date).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {new Date(admin?.updatedAt as unknown as Date).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default AdminDetail;
