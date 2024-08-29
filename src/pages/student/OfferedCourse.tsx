import { useGetMyOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data } = useGetMyOfferedCoursesQuery(undefined);

  console.log(data?.data);

  const offeredCourseData = {} as Record<
    string,
    { courseTitle: string; section: { section: number; _id: string }[] }
  >;

  data?.data?.flatMap((item) => {
    const key = item?.course?.title;

    if (!offeredCourseData[key]) {
      offeredCourseData[key] = {
        courseTitle: key,
        section: [],
      };
    }

    offeredCourseData[key].section.push({
      section: item.section,
      _id: item._id,
    });
  });

  console.log(Object.values(offeredCourseData));

  return (
    <div>
      <h1>This is OfferedCourse</h1>
    </div>
  );
};

export default OfferedCourse;
