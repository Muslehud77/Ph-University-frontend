import { Button, Card, Typography, Tag, Space } from "antd";
import {
  useEnrollCourseMutation,
  useGetMyOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { useToastPromise } from "../../hooks/useToastPromise";

const { Title, Text } = Typography;

const OfferedCourse = () => {
  const { toastPromise } = useToastPromise();
  const { data,isLoading } = useGetMyOfferedCoursesQuery(undefined);

  const [enrollCourse] = useEnrollCourseMutation();

  const obj = {} as Record<
    string,
    {
      courseTitle: string;
      section: {
        section: number;
        _id: string;
        days: string[];
        startTime: string;
        endTime: string;
      }[];
    }
  >;

  data?.data?.flatMap((item) => {
    const key = item?.course?.title;

    if (!obj[key]) {
      obj[key] = {
        courseTitle: key,
        section: [],
      };
    }

    obj[key].section.push({
      section: item.section,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
      _id: item._id,
    });
  });

  const offeredCourseData = Object.values(obj);

  const enroll =  (_id: string) => {
   toastPromise(enrollCourse, { offeredCourse: _id }, "Enrolling...");
  };

  if (!isLoading && !offeredCourseData.length){
    return <h1>No offered course available!</h1>
  }
    return (
      <div>
        {offeredCourseData?.map((item, i) => (
          <Card
            key={i}
            title={<Title level={3}>{item.courseTitle}</Title>}
            bordered={false}
            style={{ marginBottom: 20 }}
          >
            {item.section.map((sec, j) => (
              <Card
                key={j}
                type="inner"
                title={`Section: ${sec.section}`}
                extra={
                  <Button type="primary" onClick={() => enroll(sec._id)}>
                    Enroll
                  </Button>
                }
                style={{ marginBottom: 10 }}
              >
                <Space direction="vertical" size="middle">
                  <Text>
                    <strong>Days:</strong>{" "}
                    {sec.days.map((day, index) => (
                      <Tag color="blue" key={index}>
                        {day}
                      </Tag>
                    ))}
                  </Text>
                  <Text>
                    <strong>Time:</strong> {sec.startTime} - {sec.endTime}
                  </Text>
                  <Text type="secondary">ID: {sec._id}</Text>
                </Space>
              </Card>
            ))}
          </Card>
        ))}
      </div>
    );
};

export default OfferedCourse;
