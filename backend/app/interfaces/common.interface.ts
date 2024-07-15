export interface IPagination {
  page: number
  perPage: number
  query?: Record<string, number | string>
}
