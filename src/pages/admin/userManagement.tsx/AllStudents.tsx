import { Button, Pagination, Space, Table } from "antd";

import type { TableColumnsType, TableProps } from "antd";

import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types";
import { Link } from "react-router-dom";
import StatusChangeModal from "../../../components/ui/Modal/StatusChangeModal";

type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNumber" | "user"
> & { key: string };

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "fullName",
    key: "name",
  },
  {
    title: "Student Id",
    key: "id",
    dataIndex: "id",
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "Contact No",
    key: "contactNumber",
    dataIndex: "contactNumber",
  },
  {
    title: "Status",
    key: "user.status",

    render: (item) => {
      return (
        <span style={{ textTransform: "capitalize" }}>{item.user.status}</span>
      );
    },
  },
  {
    title: "Action",
    key: "x",
    render: (item) => {
      return (
        <Space>
          <Link to={`/admin/student-data/${item.key}`}>
            <Button>Detail</Button>
          </Link>
          <Button>Update</Button>
          <StatusChangeModal
            block={item.user.status === "blocked" ? true : false}
            _id={item.user._id}
          />
        </Space>
      );
    },
    width: "1%",
  },
];

const AllStudents = () => {
  const [params, setParams] = useState<TQueryParams>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNumber, user }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNumber,
      user,
    })
  ) as TTableData[];

  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        defaultCurrent={page}
        current={page}
        total={metaData?.total}
        pageSize={metaData?.limitDataCount}
      />
    </>
  );
};

export default AllStudents;
