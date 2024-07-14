<script lang="ts" setup>
import { requiredValidator } from '@/@core/utils/validators'
import { FieldType } from '@/components/app-form/types'
import AppTable from '@/components/app-table/AppTable.vue'
import type { TableField } from '@/components/app-table/types'
import type { ApiUrls } from '@/models/apiUrls'

const urls: ApiUrls = {
  get: '',
  delete: '',
  create: '',
  update: '',
}

const tableFields: TableField[] = [
  {
    key: 'totalTickets',
    label: 'العدد الكلي',

    field: {
      cols: 12,
      validations: [requiredValidator],
      type: FieldType.Number,
    },
  },

]
</script>

<template>
  <AppTable
    :fields="tableFields"
    pagination
    title="المحافظات"
    :urls="urls"
    have-actions
  />
</template>
