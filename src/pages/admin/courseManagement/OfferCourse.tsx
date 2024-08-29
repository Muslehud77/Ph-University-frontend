import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import { useToastPromise } from "../../../hooks/useToastPromise";

import {
 
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
  useGetAssignedFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";

import { TFaculty, TOfferedCourse } from "../../../types";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { dayOptions } from "../../../constants/global";
import dayjs, { Dayjs } from "dayjs";
import PHInput from "../../../components/form/PHInput";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [addCourse] = useCreateOfferedCourseMutation();
  const { toastPromise } = useToastPromise();

  const {
    data: coursesData,
    isFetching: isCourseFetching,
    isSuccess: isCoursesLoaded,
  } = useGetAllCoursesQuery([
    { name: "limit", value: 100 },
  ]);

  const {
    data: semesterRegistrationsData,
    isFetching: isSemesterRegistrationFetching,
    isSuccess: isSemesterRegistrationsLoaded,
  } = useGetAllRegisteredSemesterQuery(undefined);

  const {
    data: academicDepartmentsData,
    isFetching: isAcademicDepartmentFetching,
    isSuccess: isAcademicDepartmentsLoaded,
  } = useGetAllAcademicDepartmentsQuery(undefined);

  const {
    data: academicFacultiesData,
    isFetching: isAcademicFacultyFetching,
    isSuccess: isAcademicFacultyLoaded,
  } = useGetAllAcademicFacultiesQuery(undefined);

  const {
    data: facultiesData,
    isFetching: isFacultyFetching,
    isSuccess: isFacultyLoaded,
  } = useGetAssignedFacultiesQuery(courseId, { skip: !courseId });

  const assignedFacultyOptions = isFacultyLoaded
    ? facultiesData?.data?.faculties.map((item: TFaculty) => ({
        value: item._id,
        label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName} ${item.id}`,
      }))
    : [];

  const academicFacultyOptions = isAcademicFacultyLoaded
    ? academicFacultiesData.data.map((item) => ({
        value: item._id,
        label: `${item.name}`,
      }))
    : [];

  const academicDepartmentsOptions = isAcademicDepartmentsLoaded
    ? academicDepartmentsData.data.map((item) => ({
        value: item._id,
        label: `${item.name}`,
      }))
    : [];

  const registeredSemesterOptions = isSemesterRegistrationsLoaded
    ? semesterRegistrationsData.data.map((item) => ({
        value: item._id,
        label: `${item.academicSemester.name} ${item.academicSemester.year} ${item.status}`,
        disabled: item.status === "ENDED" ? true : false,
      }))
    : [];

  const coursesOptions = isCoursesLoaded
    ? coursesData.data.map((item) => ({
        value: item._id,
        label: `${item.title} ${item.code}`,
      }))
    : [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { time, maxCapacity, section, ...rest } = data;
    const offerCourse = {
      ...rest,
      maxCapacity: Number(maxCapacity),
      section: Number(section),
    } as TOfferedCourse;

    const startEndTime = time?.map((t: Dayjs) => dayjs(t).format("HH:mm"));
    if (startEndTime?.length) {
      offerCourse["startTime"] = startEndTime[0];
      offerCourse["endTime"] = startEndTime[1];
    }

    await toastPromise(addCourse, offerCourse, "Creating an offer course...");
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(createAcademicSemesterSchema)}
        >
          <PHSelect
            options={registeredSemesterOptions}
            label="Registered Semester"
            name="semesterRegistration"
            loading={isSemesterRegistrationFetching}
          />
          <PHSelect
            options={academicDepartmentsOptions}
            label="Department"
            name="academicDepartment"
            loading={isAcademicDepartmentFetching}
          />
          <PHSelect
            options={academicFacultyOptions}
            label="Academic Faculty"
            name="academicFaculty"
            loading={isAcademicFacultyFetching}
          />
          <PHSelectWithWatch
            setValue={setCourseId}
            options={coursesOptions}
            label="Course"
            name="course"
            loading={isCourseFetching}
          />
          <PHSelect
            disabled={!isFacultyLoaded}
            options={assignedFacultyOptions}
            label="Faculty"
            name="faculty"
            loading={isFacultyFetching}
          />
          <PHTimePicker label="Time" name="time" rangePicker={true} />
          <PHSelect
            label="Days"
            name="days"
            options={dayOptions}
            multiple={true}
          />
          <PHInput label="Max Capacity" name="maxCapacity" type="number" />
          <PHInput label="Section" name="section" type="number" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
