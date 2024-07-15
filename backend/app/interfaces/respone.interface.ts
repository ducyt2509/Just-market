export interface ICommonResponse<T> {
  data: T[] | T
  pagination: {
    total: number
    perPage: number
    page: number
  }
}
