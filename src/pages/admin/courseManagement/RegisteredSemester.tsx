/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

import type { TableColumnsType } from "antd";
import { TQueryParams } from "../../../types/global.type";
import { useState } from "react";
import { TRegisteredSemester } from "../../../types";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import { DownOutlined } from "@ant-design/icons";

type TTableData = Pick< TRegisteredSemester,
  | "academicSemester"
  | "startDate"
  | "endDate"
  | "status"
  | "minCredit"
  | "maxCredit"
> & { key: string };

const columns: TableColumnsType<TTableData> = [
  {
    title: "Semester Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render:(item)=>{
      const color = item === "UPCOMING" ? "blue" : item === "ONGOING" ? "red" : "green";
      return(<Tag color={color}>{item}</Tag>)
    }
  },
  {
    title: "Min Credit",
    dataIndex: "minCredit",
    key: "minCredit",
  },
  {
    title: "Max Credit",
    dataIndex: "maxCredit",
    key: "maxCredit",
  },
  {
    title: "Action",
    render: ()=>{
      const options = [
        {
        label:"Upcoming",
        key:"UPCOMING",

      },
        {
        label:"Ongoing",
        key:"ONGOING",

      },
        {
        label:"Ended",
        key:"ENDED",

      },
    ]
    const menuProps = {
      items: options,
      onClick: (option: { key: string }) => {
        console.log(option);
      },
    };
      return (
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              Change Status
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      );
    }
  },
];

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemesterQuery(params);

  const tableData = semesterData?.data?.map(
    ({
      _id,
      academicSemester,
      startDate,
      endDate,
      status,
      minCredit,
      maxCredit,
    }) => ({
      key: _id,
      name: academicSemester.name,
     academicSemester,
      year: academicSemester.year,
      startDate: new Date(startDate).toLocaleDateString(),
      endDate: new Date(endDate).toLocaleDateString(),
      status,
      minCredit,
      maxCredit,
    })
  ) as TTableData[];

  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
