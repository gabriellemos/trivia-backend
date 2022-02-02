export interface Results<T> {
  page: number
  size: number
  content: T[]
  totalItens: number
  totalPages: number
}
