import fetch from "node-fetch"

import { YTSMovie, YTSSearchResult } from "../@types/yts"

const BASE_URL = "https://yts.mx"

export class YtsSearch implements ISearchPlugin {
  async search({ term, page }: SearchQuery) {
    let url = BASE_URL + "/api/v2/list_movies.json?limit=50&page=" + page
    if (term) {
      url +=
        "&sort_by=seeds&order_by=desc&query_term=" + encodeURIComponent(term)
    }
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
})
