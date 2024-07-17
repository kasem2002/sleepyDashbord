import type { HorizontalNavItems } from '@layouts/types'

export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'المحافظات',
    to: { name: 'governorate' },
    icon: { icon: 'tabler-file' },
  },
] as HorizontalNavItems
