
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Others"];

export const dayOptions = days.map((day) => ({
  value: day,
  label: day,
}));

export const monthOptions = months.map((month) => ({
  value: month,
  label: month,
}));

export const bloodGroupOptions = bloodGroups.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));
export const genderOptions = genders.map((gender) => ({
  value: gender.toLowerCase(),
  label: gender,
}));
