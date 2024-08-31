/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pagination, Table } from "antd";

import type { TableColumnsType } from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";
import { TCourse } from "../../../types";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import AssignFaculty from './../../../components/ui/Modal/AssignFaculty';

type TTableData = Pick<TCourse, "title" | "code" | "prefix"> & {
  key: string;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Code",
    key: "code",
    dataIndex: "code",
  },
  {
    title: "Action",
    key: "code",
      render:(item)=>{

        

        return <AssignFaculty _id={item.key}/>;
      }
  },
];

const Courses = () => {
  const [params, setParams] = useState<TQueryParams>([]);
  const [page, setPage] = useState(1);
  const {
    data: coursesData,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
   
    ...params,
  ]);

  const tableData = coursesData?.data?.map(
    ({ _id, title, code,prefix }) => ({
      key: _id,
      title,
     code : `${prefix} ${code}`,
     prefix
    })
  ) as unknown as TTableData[];

  const metaData = coursesData?.meta;

  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
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

export default Courses;
