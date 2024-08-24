/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

import type { TableColumnsType } from "antd";
import { TQueryParams } from "../../../types/global.type";
import { useState } from "react";
import { TRegisteredSemester } from "../../../types";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";
import { useToastPromise } from "../../../hooks/useToastPromise";

type TTableData = Pick<
  TRegisteredSemester,
  | "academicSemester"
  | "startDate"
  | "endDate"
  | "status"
  | "minCredit"
  | "maxCredit"
> & { key: string };

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams>([]);
  const { toastPromise } = useToastPromise();
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemesterQuery(params);

  const [updateSemesterRegistration, { data, error }] =
    useUpdateRegisteredSemesterMutation();

  console.log({ data, error });

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
      title: "Start Month",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Month",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => {
        const color =
          item === "UPCOMING" ? "blue" : item === "ONGOING" ? "red" : "green";
        return <Tag color={color}>{item}</Tag>;
      },
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
      render: (item) => {
        const _id = item.key;

        

        const options = [
          {
            label: "Ongoing",
            key: "ONGOING",
            disabled: item.status !== "UPCOMING" || item.status === "ENDED",
          },
          {
            label: "Ended",
            key: "ENDED",
            disabled: item.status === "UPCOMING" ||  item.status === "ENDED",
          },
        ];
        const menuProps = {
          items: options,
          onClick: (data: any) => {
            const status = { status: data.key };

            toastPromise(
              updateSemesterRegistration,
              { data: status, _id },
              "Updating status..."
            );
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
      },
    },
  ];

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
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
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
