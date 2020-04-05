import { RequestHandler, Router } from "express"
import { YtsSearch } from "../search/YtsSearch"
import { getSearchQuery } from "../utils"

const announceHandler: RequestHandler = async (req, res) => {
  res.json({
    name: "Yts",
    description: "Use YTS API to lookup movies.",
  })
}

const searchHandler: RequestHandler = async ({ query }, res) => {
  const searchQuery = await getSearchQuery(query)
  const results = await new YtsSearch().search(searchQuery)

  res.json(results)
}

export const ytsPluginRouter = Router()
  .get("/announce", announceHandler)
  .get("/search", searchHandler)
