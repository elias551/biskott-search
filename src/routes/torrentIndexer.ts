import { RequestHandler, Router } from "express"
import { getSearchQuery } from "../utils"
import { TorrentIndexerSearch } from "../search/TorrentIndexerSearch"

const announceHandler: RequestHandler = async (req, res) => {
  res.json({
    name: "TorrentIndexer",
    description: "Use torrent-indexer lib to lookup movies.",
  })
}

const searchHandler: RequestHandler = async ({ query }, res) => {
  const searchQuery = await getSearchQuery(query)
  const results = await new TorrentIndexerSearch().search(searchQuery)

  res.json(results)
}

export const torrentIndexerPluginRouter = Router()
  .get("/announce", announceHandler)
  .get("/search", searchHandler)
