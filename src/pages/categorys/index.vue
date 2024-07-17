<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { FieldType } from "@/components/app-form/types";
import AppTable from "@/components/app-table/AppTable.vue";
import type { TableField } from "@/components/app-table/types";
import type { ApiUrls } from "@/models/apiUrls";
import { baseURL } from "@/plugins/axios";

const urls: ApiUrls = {
  get: "/categorys",
  delete: "/categorys",
  create: "/categorys",
  update: "/categorys",
};

const tableFields: TableField[] = [
  {
    key: "name",
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
    key: "creationDate",
    label: "تاريخ الاضافة",
    create: false,
    isMainFilter: false,
    filterable: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },

  {
    key: "artUrl",
    label: "الصورة",
    create: true,
    isMainFilter: false,
    filterable: false,
    field: {
      accept: 'image/*',
      cols: 12,
      validations: [],
      type: FieldType.File,
      multiple: false,
    },
  },
  {
    key: "color",
    label: "اللون",
    create: true,
    isMainFilter: false,
    filterable: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Color,
    },
  },


  // NOTE بقى IS ACTIVE في التعديل ممسويتها
];
function formater(path: string) {
  return baseURL.replaceAll('/api', "") + '/' + path.replaceAll('\\', '/');
}
</script>

<template>
  <AppTable :fields="tableFields" pagination hide-view-type title="الاقسام" :urls="urls" add-btn-text="اضافة"
    have-actions>
    <template #artUrl="{ item }">
      <v-img alt="Avatar" style="height: 50px;" :src="formater(item.artUrl)"></v-img>
    </template>
    <template #color="{ item }">
      <v-chip :color="item.color">
        {{ item.color }}
      </v-chip>
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
