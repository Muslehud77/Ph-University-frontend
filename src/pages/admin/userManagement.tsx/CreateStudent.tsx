



const CreateStudent = () => {
  return (
    <div>
     <h1>This is CreateStudent</h1>
    </div>
  );
};

export default CreateStudent;




const studentDummyData = {
  password: "Student123",
  student: {
    name: {
      firstName: "Sheik",
      middleName: "Musleh",
      lastName: "Uddin",
    },
    gender: "male",
    dateOfBirth: "2000-01-15T00:00:00.000Z",
    email: "sheikmuslehud@gmail.com",
    admissionSemester: "6688111801527f26aac88d9b",
    academicDepartment: "6688044328eb2c1fe231e57b",
    contactNumber: "1234567890",
    emergencyContactNo: "0987654321",
    bloodGroup: "A+",
    presentAddress: "123 Present St, City, Country",
    permanentAddress: "456 Permanent Ave, City, Country",
    guardian: {
      father: {
        name: "John Smith",
        occupation: "Engineer",
        contactNumber: "1234567890",
      },
      mother: {
        name: "Jane Smith",
        occupation: "Teacher",
        contactNumber: "0987654321",
      },
    },
    localGuardian: {
      name: "Robert Johnson",
      occupation: "Doctor",
      contactNumber: "1122334455",
      address: "789 Local Guardian St, City, Country",
    },
    profileImg: "https://example.com/profile.jpg",
  },
};
