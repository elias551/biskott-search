interface ISearchPlugin {
  search(query: SearchQuery): Promise<SearchResult[]>
}

interface SearchQuery {
  term: string
  page: number
}

interface SearchResult {
  title: string
  summary: string
  poster?: string
  background?: string
  torrents: TorrentDescription[]
}

interface TorrentDescription {
  url: string
  seeders: number
  leechers: number
  quality: string
}
