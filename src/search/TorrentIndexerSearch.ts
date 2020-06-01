import TorrentIndexer, { TISearchResult } from "torrent-indexer"

export class TorrentIndexerSearch implements ISearchPlugin {
  async search({ term }: SearchQuery) {
    const results = (await new TorrentIndexer().search(term, "movie"))
      .filter((r) => r.link)
      .sort((a, b) => {
        if (a.seeders > b.seeders) {
          return -1
        }
        if (b.seeders > a.seeders) {
          return 1
        }
        return 0
      })
    return results.map(toSearchResult)
  }
}

const toSearchResult = (r: TISearchResult): SearchResult => ({
  title: r.title,
  summary: "",
  torrents: [
    {
      url: r.link,
      seeders: r.seeders,
      leechers: r.leechers,
      quality: r.resolution,
    },
  ],
  genres: [],
})
