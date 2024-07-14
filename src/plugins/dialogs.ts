import type { DialogProps } from '@/components/dialogs/_dialogConfig'
import emitter from './emitter'

const dialogs = Object.entries(import.meta.globEager('../components/dialogs/**/*.vue')).map(([path, component]) => {
  const name = path.replace(/(.*\/)*([^.]+).*/gi, '$2')

  return { name, component: component as any }
})

type DialogNames = keyof typeof DialogProps
function showDialog(dialogName: DialogNames, props?: typeof DialogProps[DialogNames]) {
  const name = `${dialogName as string}`

  emitter.emit(name, props)

  return new Promise(resolve => {
    emitter.once(`${name}_save`, (params: any) => {
      resolve(params || true)
    })
  })
}

export {
  showDialog,
  dialogs,
}
