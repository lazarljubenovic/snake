type GetActions<T extends Record<string, (...args: any[]) => any>> = ReturnType<T[keyof T]>

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: undefined | (() => any)
}
