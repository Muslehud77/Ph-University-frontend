import { Button, Pagination, Space, Table } from "antd";

import type { TableColumnsType } from "antd";

import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import {  TFaculty } from "../../../types";
import { Link } from "react-router-dom";
import StatusChangeModal from "../../../components/ui/Modal/StatusChangeModal";

type TTableData = Pick<
  TFaculty,
  "name" | "id" | "email" | "contactNumber" | "user"
> & { key: string };

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",

    key: "name",
    render: (item) => {
      const name = `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`;

      return <span style={{ textTransform: "capitalize" }}>{name}</span>;
    },
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
          <Link to={`/admin/faculty-data/${item.key}`}>
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

const AllFaculties = () => {
  const [params, setParams] = useState<TQueryParams>([]);
  const [page, setPage] = useState(1);
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAllFacultiesQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = facultyData?.meta;

  const tableData = facultyData?.data?.map(
    ({ _id, name, id, email, contactNumber, user }) => ({
      key: _id,
      name,
      id,
      email,
      contactNumber,
      user,
    })
  ) as TTableData[];

  return (
    <>
      <Table
        loading={isLoading || isFetching}
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

export default AllFaculties;
