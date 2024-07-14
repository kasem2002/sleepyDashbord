<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { FieldType } from "@/components/app-form/types";
import AppTable from "@/components/app-table/AppTable.vue";
import type { TableField } from "@/components/app-table/types";
import type { ApiUrls } from "@/models/apiUrls";
import axiox, { baseURL } from "@/plugins/axios";
const urls: ApiUrls = {
  get: "/musics",
  delete: "/musics",
  create: "/musics",
  update: "/musics",
};
const options = ref([]);

axiox.get("/categorys").then((res) => {
  options.value = res.data.data.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
});
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
    key: "album",
    label: "الالبوم",
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
    key: "audioUrl",
    label: "الرابط",
    create: true,
    filterable: false,
    field: {
      accept: 'mp3/*',
      cols: 12,
      validations: [],
      type: FieldType.File,
      multiple: false,
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
    key: "creationDate",
    label: "تاريخ الاضافة",
    create: false,
    filterable: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },
  {
    key: "categoryId",
    label: "",
    create: true,
    filterable: true,
    hideInTable: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Select,
      options: {
        itemLabel: "label",
        itemValue: "value",
        items: options,
      },
    },
  },





  // NOTE بقى IS ACTIVE في التعديل ممسويتها
];
function formater(path: string) {
  return baseURL.replaceAll('/api', "") + '/' + path.replaceAll('\\', '/');
}
</script>

<template>
  <AppTable :fields="tableFields" hide-view-type pagination title="الاغاني" :urls="urls" add-btn-text="اضافة"
    have-actions hideEdit>
    <template #audioUrl="{ item }">
      <VChip>
        <a :href="item.audioUrl" target="_blank">
          <VIcon>mdi-link</VIcon>
        </a>
      </VChip>
    </template>
    <template #artUrl="{ item }">
      <v-img alt="Avatar" style="height: 50px;" :src="formater(item.artUrl)"></v-img>
    </template>


  </AppTable>
</template>
