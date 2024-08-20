type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type TGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
};

interface TLocalGuardian extends TGuardian {
  address: string;
}

export type TStudent = {
    _id:string;
  id: string;
  user: string;
  name: TUserName;
  gender: "male" | "female" | "others";
  dateOfBirth?: string;
  email: string;
  admissionSemester: string;
  academicDepartment: string;
  academicFaculty: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    father: TGuardian;
    mother: TGuardian;
  };
  localGuardian: TLocalGuardian;
  profileImg?: string;
  fullName: string
  isDeleted: boolean;
};
