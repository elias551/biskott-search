import { RequestHandler, Router } from "express"
import { getSearchQuery } from "../utils"
import { OxTorrentSearch } from "../search/OxTorrentSearch"

const announceHandler: RequestHandler = async (req, res) => {
  res.json({
    name: "OxTorrent",
    description: "Use OxTorrent website to lookup movies.",
  })
}

const searchHandler: RequestHandler = async ({ query }, res) => {
  const searchQuery = await getSearchQuery(query)
  const results = await new OxTorrentSearch().search(searchQuery)

  res.json(results)
}

export const oxTorrentPluginRouter = Router()
  .get("/announce", announceHandler)
  .get("/search", searchHandler)
