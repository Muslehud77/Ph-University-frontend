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

export interface AdmissionSemester {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AcademicDepartment {
  _id: string;
  name: string;
  academicFaculty: AcademicFaculty;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AcademicFaculty {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TUser = {
  _id: string;
  id: string;
  email: string;
  isPasswordNeedsChange: boolean;
  role: string;
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TUserName;
  gender: "male" | "female" | "others";
  dateOfBirth?: Date;
  email: string;
  admissionSemester: AdmissionSemester;
  academicDepartment: AcademicDepartment;
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
  fullName: string;
  isDeleted: boolean;
};

export interface TFaculty {
  _id: string;
  id: string;
  user: TUser;
  academicDepartment: AcademicDepartment;
  academicFaculty: AcademicFaculty;
  designation: string;
  name: TUserName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TAdmin = {
  _id: string;
  id: string;
  user: TUser;
  designation: string;
  name: TUserName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};