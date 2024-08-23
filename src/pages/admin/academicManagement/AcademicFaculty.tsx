/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table } from "antd";
import {
  useGetAllAcademicFacultiesQuery,
  
} from "../../../redux/features/admin/academicManagement.api";

import type { TableColumnsType } from "antd";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";

type TTableData = Pick<TAcademicFaculty, "name"> & { key: string };

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
];

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParams>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultiesQuery(params);

  const tableData = semesterData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  })) as TTableData[];

 

  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicFaculty;
