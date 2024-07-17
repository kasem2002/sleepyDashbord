export enum FieldType {
  Text,
  Number,
  Select,
  Checkbox,
  Radio,
  Textarea,
  Date,
  DateTime,
  File,
  Password,
  Color,
}
export interface FieldTypes {
  label?: string;
  type?: FieldType;
  modelValueKey?: string;
  placeholder?: string;
  disabled?: boolean;
  getURL?: string;
  options?: SelectableField;
  cols?: number;
  icon?: string;
  validations?: any[];
  multiple?: boolean;
  isHidden?: boolean;
  defualtValue?: any;
  dependsOn?: string;
  fetchOnSearch?: boolean;
  searchKey?: string;
}
export interface SelectableField {
  getURL?: string;
  items?: SelectableFieldType[] | any[];
  itemValue?: string;
  itemLabel?: string;
  placeholder?: string;
  haveDependOn?: boolean;
  disabled?: boolean;
  valueFrom?: string;
  takeFrom?: string;
  dependOn?: string;
  dependValue?: string;
}

export interface SelectableFieldType {
  id: string;
  name: string;
}
