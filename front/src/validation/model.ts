export const REQUIRED = 'Preenchimento obrigatório'

export type ErrorObject<DataType> = {
  [key in keyof DataType]?: ErrorObject<DataType[key]> | string
}
