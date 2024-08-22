import { Table } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";

const year = new Date().getFullYear();

type TTableData = Pick<
  TAcademicSemester,
  "name" | "startMonth" | "endMonth" | "year"
> & { key: string };

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],
  },
  {
    title: "Year",
    key: "year",
    dataIndex: "year",
    showSorterTooltip: { target: "full-header" },
    filters: [0, 1, 2, 3].map((item) => ({
      text: year + item,
      value: year + item,
    })),
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
    key: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
    key: "endMonth",
  },
];

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
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
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
