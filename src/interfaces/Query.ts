interface BaseQuery {
  [key: string]: string
}

interface PageableQuery {
  page?: string
  size?: string
}

export default interface Query extends BaseQuery, PageableQuery {}
