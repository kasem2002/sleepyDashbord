<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { FieldType } from "@/components/app-form/types";
import AppTable from "@/components/app-table/AppTable.vue";
import type { TableField } from "@/components/app-table/types";
import { UserRole, getEnumName } from "@/constants/enums";
import type { ApiUrls } from "@/models/apiUrls";

const urls: ApiUrls = {
  get: "/role",
  delete: "/role",
  create: "/role",
  update: "/role",
};

const tableFields: TableField[] = [
  {
    key: "action",
    label: "الاسم ",
    create: true,
    isMainFilter: true,
    filterable: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },

  {
    key: "id",
    label: "الرقم",
    create: true,
    isMainFilter: true,
    filterable: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },

  {
    key: "password",
    label: "الرمز السري",
    hideInTable: true,
    hideInEdit: true,
    create: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },

  {
    key: "role",
    label: "الصلاحيات",
    create: true,
    hideInEdit: true,
    isMainFilter: true,
    filterable: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        items: UserRole,
        itemLabel: "arName",
        itemValue: "value",
      },
    },
  },
  {
    key: "creationDate",
    label: "تاريخ الانشاء ",
    create: false,
    hideInEdit: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Date,
    },
  },
  {
    key: "isActive",
    label: "حالة التفعيل",
    create: false,
    isMainFilter: true,
    field: {
      cols: 12,
      type: FieldType.Radio,
      options: {
        items: [
          {
            title: "مفعل",
            value: true,
          },
          {
            title: "غير مفعل",
            value: false,
          },
        ],
        itemLabel: "title",
        itemValue: "value",
      },
    },
  },

  // NOTE بقى IS ACTIVE في التعديل ممسويتها
];
</script>

<template>
  <AppTable :fields="tableFields" pagination title="المستخدمين" :urls="urls" add-btn-text="اضافة" have-actions>
    <template #role="{ item }">
      <VChip :color="getEnumName(UserRole, item.role).color">
        {{ getEnumName(UserRole, item.role).arName }}
      </VChip>
    </template>
    <!--
      <template #isActive="{ item }">
      <VChip>
      {{ item.isActive ? 'active' : 'deactive' }}
      </VChip>
      </template>
    -->
  </AppTable>
</template>
