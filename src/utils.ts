import * as Yup from "yup"
import { ApiError } from "./ApiError"

const schema = Yup.object().shape<SearchQuery>({
  page: Yup.number(),
  term: Yup.string().matches(/^[\d\w\s\'\-\,]*$/),
})

export const getSearchQuery = async (query: any) => {
  const searchQuery: SearchQuery = {
    page: +query.page || 1,
    term: query.term ? decodeURIComponent(query.term) : undefined,
    genre: query.genre || undefined,
    sortBy: query.sortBy || undefined,
    orderBy: query.orderBy || undefined,
  }

  const isValid = await schema.isValid(searchQuery)
  if (!isValid) {
    throw new ApiError(1, 400, "Invalid schema.")
  }
  return searchQuery
}
