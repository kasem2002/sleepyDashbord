<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { FieldType } from "@/components/app-form/types";
import AppTable from "@/components/app-table/AppTable.vue";
import type { TableField } from "@/components/app-table/types";
import { UserRole } from "@/constants/enums";
import type { ApiUrls } from "@/models/apiUrls";

const urls: ApiUrls = {
  get: "/users",
  delete: "/users",
  create: "/users",
  update: "/users",
};

const tableFields: TableField[] = [
  {
    key: "fullName",
    label: "الاسم الكامل",
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
    key: "email",
    label: "البريد الالكتروني",
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
    key: "role.name",
    label: "الصلاحيات",
    create: true,
    hideInEdit: true,
    isMainFilter: false,
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
  // {
  //   key: "isActive",
  //   label: "حالة التفعيل",
  //   create: false,
  //   isMainFilter: true,
  //   field: {
  //     cols: 12,
  //     type: FieldType.Radio,
  //     options: {
  //       items: [
  //         {
  //           title: "مفعل",
  //           value: true,
  //         },
  //         {
  //           title: "غير مفعل",
  //           value: false,
  //         },
  //       ],
  //       itemLabel: "title",
  //       itemValue: "value",
  //     },
  //   },
  // },

  // NOTE بقى IS ACTIVE في التعديل ممسويتها
];
</script>

<template>
  <AppTable hideViewType :fields="tableFields" hide-edit hide-create pagination title="المستخدمين" :urls="urls"
    add-btn-text="اضافة" have-actions>
    <!-- <template #role="{ item }">
      <VChip :color="getEnumName(UserRole, item.role).color">
        {{ getEnumName(UserRole, item.role).arName }}
      </VChip>
    </template> -->
    <!--
      <template #isActive="{ item }">
      <VChip>
      {{ item.isActive ? 'active' : 'deactive' }}
      </VChip>
      </template>
    -->
  </AppTable>
</template>
