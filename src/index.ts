import express from "express"
import "express-async-errors"
import { setupApp } from "./middlewares"
import { ytsPluginRouter } from "./routes/yts"
import { oxTorrentPluginRouter } from "./routes/oxtorrent"

const main = () => {
  const app = express()

  setupApp(app)
    .use("/yts/v1", ytsPluginRouter)
    .use("/oxtorrent/v1", oxTorrentPluginRouter)
    .listen(1337, () => {
      console.log(`Listening on http://localhost:1337`)
    })
}

main()
