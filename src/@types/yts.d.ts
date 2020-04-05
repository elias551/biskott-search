export interface YTSSearchResult {
  status: string
  status_message: string
  data: {
    movie_count: number
    limit: number
    page_number: number
    movies: YTSMovie[]
  }
  "@meta": {
    server_time: number
    server_timezone: string
    api_version: number
    execution_time: string
  }
}

export interface YTSMovie {
  id: number
  url: string
  imdb_code: string
  title: string
  title_english: string
  title_long: string
  slug: string
  year: number
  rating: number
  runtime: number
  genres: string[]
  summary: string
  description_full: string
  synopsis: string
  yt_trailer_code: string
  language: string
  mpa_rating: string
  background_image: string
  background_image_original: string
  small_cover_image: string
  medium_cover_image: string
  large_cover_image: string
  state: string
  torrents: YTSTorrent[]
  date_uploaded: Date
  date_uploaded_unix: number
}

export interface YTSTorrent {
  url: string
  hash: string
  quality: Quality
  type: Type
  seeds: number
  peers: number
  size: string
  size_bytes: number
  date_uploaded: Date
  date_uploaded_unix: number
}

export enum Quality {
  Q1080P = "1080p",
  Q3D = "3D",
  Q720P = "720p",
}

export enum Type {
  Bluray = "bluray",
}
