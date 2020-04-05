import express, { Express } from "express"
import morgan from "morgan"
import { errorHandler } from "./errorHandler"

export const setupApp = (app: Express) => {
  return app
    .use(morgan("dev"))
    .set("etag", false)
    .use((_, res, next) => {
      res.set("Cache-Control", "no-store, no-cache, must-revalidate, private")
      next()
    })
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(errorHandler)
}
