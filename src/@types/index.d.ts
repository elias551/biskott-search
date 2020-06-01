interface ISearchPlugin {
  search(query: SearchQuery): Promise<SearchResult[]>
}

interface SearchQuery {
  term: string
  page: number
  genre?: string
  sortBy?: string
  orderBy?: string
}

interface SearchResult {
  title: string
  summary: string
  poster?: string
  background?: string
  torrents: TorrentDescription[]
  genres: string[]
}

interface TorrentDescription {
  url: string
  seeders: number
  leechers: number
  quality: string
}
