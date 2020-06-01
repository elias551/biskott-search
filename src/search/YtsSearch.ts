import fetch from "node-fetch"

import { YTSMovie, YTSSearchResult } from "../@types/yts"

const BASE_URL = "https://yts.mx/api/v2"

export const ytsGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
]

export const ytsSortFilters = [
  "title",
  "year",
  "rating",
  "peers",
  "seeds",
  "download_count",
  "like_count",
  "date_added",
]

export class YtsSearch implements ISearchPlugin {
  async search(query: SearchQuery) {
    const url = buildSearchUrl(query)
    const response = await fetch(url)
    const results = (await response.json()) as YTSSearchResult

    return results.data.movies?.map(toSearchResult) || []
  }
}

const toSearchResult = (r: YTSMovie): SearchResult => ({
  title: `${r.title} ${r.year}`,
  summary: r.summary,
  poster: r.medium_cover_image,
  background: r.background_image_original,
  torrents: r.torrents.map((t) => ({
    url: t.url,
    quality: t.quality,
    leechers: t.peers,
    seeders: t.seeds,
  })),
  genres: r.genres,
})

const toGenreParam = (genre: string) =>
  ytsGenres.includes(genre) ? genre : undefined

const buildUrlParams = (p: { [key: string]: any }) =>
  Object.keys(p)
    .filter((k) => !!p[k])
    .map((k) => `${k}=${encodeURIComponent(p[k])}`)
    .join("&")

const toSortByParam = (sortBy: string | undefined, defaultValue: string) =>
  !sortBy || !ytsSortFilters.includes(sortBy) ? defaultValue : sortBy

const buildSearchUrl = ({
  term,
  page,
  genre,
  sortBy,
  orderBy = "desc",
}: SearchQuery) =>
  BASE_URL +
  "/list_movies.json?" +
  buildUrlParams({
    limit: 50,
    page,
    query_term: term,
    genre: toGenreParam(genre),
    sort_by: toSortByParam(sortBy, term ? "seeds" : "date_added"),
    order_by: orderBy,
  })
