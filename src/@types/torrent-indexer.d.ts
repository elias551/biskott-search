declare module "torrent-indexer" {
  const TorrentIndexer: TorrentIndexer

  interface TorrentIndexer {
    new (): Instance
  }

  type SearchType = "movie" | "series"

  export interface TISearchResult {
    year: number
    resolution: string
    title: string
    fileName: string
    score: number
    size: string
    link: string
    seeders: number
    leechers: number
    uploaded: string
    sourceName: string
  }

  interface Instance {
    search(query: string, searchType: SearchType): Promise<TISearchResult[]>
  }

  export default TorrentIndexer
}
