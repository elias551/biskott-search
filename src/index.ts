import express from "express"
import "express-async-errors"
import { setupApp } from "./middlewares"
import { ytsPluginRouter } from "./routes/yts"
import { oxTorrentPluginRouter } from "./routes/oxtorrent"
const port = process.env.PORT || 5000
const main = () => {
  const app = express()

  setupApp(app)
    .get("", (req, res) => {
      res.send({ status: "OK" })
    })
    .use("/yts/v1", ytsPluginRouter)
    .use("/oxtorrent/v1", oxTorrentPluginRouter)
    .listen(port, () => {
      console.log(`Listening on http://localhost:${port}`)
    })
}

main()
