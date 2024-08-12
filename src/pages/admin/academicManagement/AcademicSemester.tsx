import { Table } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../types/semester.type";



const columns: TableColumnsType<TAcademicSemester> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
  },
  {
    title: "Year",
    dataIndex: "year",
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
];


const onChange: TableProps<TAcademicSemester>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const AcademicSemester = () => {

    const {data:semesterData} = useGetAllSemestersQuery(undefined)
    
    const tableData = semesterData?.data?.map(
      ({ _id, name, startMonth, endMonth, year }) => ({
        _id,
        name,
        startMonth,
        endMonth,
        year,
      })
    ) as TAcademicSemester[];

    console.log(tableData)

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;