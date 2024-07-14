interface EnumValue {
  name: string;
  value: number;
  arName: string; // Added Arabic name property
  color?: string; // Added color property
}

const UserRole: EnumValue[] = [
  {
    name: "Admin",
    value: 0,
    arName: "المسؤول",
    color: "success",
  },
  {
    name: "SolvingCenter",
    value: 1,
    arName: "مركز الحلول ",
    color: "warning",
  },
  {
    name: "issuer",
    value: 2,
    arName: " المصدر",
    color: "grey",
  },
];

const TicketStatus: EnumValue[] = [
  {
    name: "Open",
    value: 0,
    arName: "مفتوح",
    color: "error",
  },
  {
    name: "Pending",
    value: 1,
    arName: "انتظار",
    color: "warning",
  },
  {
    name: "Solved",
    value: 2,
    arName: "تم المعالجة",
    color: "success",
  },
  {
    name: "Closed",
    value: 3,
    arName: "مغلقة",
  },
];

const TicketPriority: EnumValue[] = [
  {
    name: "Low",
    value: 0,
    arName: "منخفض",
    color: "success",
  },
  {
    name: "Medium",
    value: 1,
    arName: "متوسط",
    color: "warning",
  },
  {
    name: "High",
    value: 2,
    arName: "عاجل",
    color: "error",
  },
];

const getEnumValue = (enumArray: EnumValue[], value: number) => {
  return enumArray.find((item) => item.value === value) || enumArray[0];
};

const getEnumName = (enumArray: EnumValue[], name: string) => {
  return enumArray.find((item) => item.name === name) || enumArray[0];
};

export { TicketPriority, TicketStatus, UserRole, getEnumName, getEnumValue };
