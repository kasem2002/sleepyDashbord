<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { FieldType } from "@/components/app-form/types";
import AppTable from "@/components/app-table/AppTable.vue";
import type { TableField } from "@/components/app-table/types";
import EditRole from "@/components/dialogs/EditRole.vue";
import { UserRole, getEnumName } from "@/constants/enums";
import type { ApiUrls } from "@/models/apiUrls";
import { useTableStore } from "@/stores/AppTableStore";
const tableStore = useTableStore()

const urls: ApiUrls = {
  get: "/role",
  delete: "/role",
  create: "/role",
  update: "/role",
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
    key: "id",
    label: " الرقم",
    create: false,
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
    label: "تاريخ الانشاء",
    create: false,
    isMainFilter: false,
    filterable: true,
    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Text,
    },
  },

  // NOTE بقى IS ACTIVE في التعديل ممسويتها
];
function edit(e: any) {
  tableStore.setEditRole({
    id: e.id,
    show: true,
  });
}
</script>

<template>
  <AppTable :fields="tableFields" pagination title="" :on-edit="(e) => edit(e)" hide-delete have-actions hide-view-type
    :urls="urls" add-btn-text="اضافة">
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
  <EditRole />
</template>
