import { Button, Pagination, Space, Table } from "antd";


import type { TableColumnsType, TableProps } from "antd";

import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types";



type TTableData = Pick<TStudent, "fullName" | "id" | "email" | 
"contactNumber"> & { key: string };

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
    title: "Action",
    key: "x",
    render: () => {
      return (
        <Space>
          <Button>Update</Button>
          <Button>Detail</Button>
          <Button>Block</Button>
        </Space>
      );
    },
    width: "1%",
  },
];

const AllStudents = () => {
  const [params, setParams] = useState<TQueryParams>([]);
  const [page,setPage] = useState(1)
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

  const metaData = studentData?.meta

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id,email,contactNumber }) => ({
      key: _id,
      fullName,
        id,email,contactNumber
    })
  ) as TTableData[];


  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams = [];

      if (filters.name) {
        filters.name.forEach((item) =>
          queryParams.push({
            name: "name",
            value: item as string,
          })
        );
      }
      if (filters.year) {
        filters.year.forEach((item) =>
          queryParams.push({
            name: "year",
            value: item as number,
          })
        );
      }

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination onChange={(value)=> setPage(value)} defaultCurrent={page} current={page} total={metaData?.total} pageSize={metaData?.limitDataCount} />
    </>
  );
};

export default AllStudents;
