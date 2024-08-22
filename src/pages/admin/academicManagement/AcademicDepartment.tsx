/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table } from "antd";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

import type { TableColumnsType } from "antd";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";

type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty"> & {
  key: string;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Faculty",
    key: "academicFaculty",
    dataIndex: "academicFaculty",
  },
];

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParams>([]);
  const {
    data: departmentData,
    isLoading,
    isFetching,
  } = useGetAllAcademicDepartmentsQuery(params);

  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty?.name,
    })
  ) as unknown as TTableData[];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParams = [];

  //     if (filters.name) {
  //       filters.name.forEach((item) =>
  //         queryParams.push({
  //           name: "name",
  //           value: item as string,
  //         })
  //       );
  //     }
  //     if (filters.year) {
  //       filters.year.forEach((item) =>
  //         queryParams.push({
  //           name: "year",
  //           value: item as number,
  //         })
  //       );
  //     }

  //     setParams(queryParams);
  //   }
  // };

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

export default AcademicDepartment;
