export const Skins = {
  Default: 'default',
  Bordered: 'bordered',
} as const

export const RouteTransitions = {
  Fade: 'app-transition-fade',
  None: 'none',

  // 'Zoom Fade': 'app-transition-zoom-fade',
  // 'Fade Bottom': 'app-transition-fade-bottom',
  // 'Slide Fade': 'app-transition-slide-fade',
  // 'Zoom out': 'app-transition-zoom-out',

} as const

export const TicketStatus = [
  {
    name: 'Open',
    value: 0,
  },
  {
    name: 'Pending',
    value: 1,
  },
  {
    name: 'Solved',
    value: 2,
  },
  {
    name: 'Closed',
    value: 3,
  },

] as const

export const TicketPriority = [

  {
    name: 'قليل',
    value: 0,
  },
  {
    name: 'متوسط',
    value: 1,
  },
  {
    name: 'عالي',
    value: 2,
  },
]
