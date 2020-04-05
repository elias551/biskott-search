import { ApiError } from "../ApiError"
import { ErrorRequestHandler } from "express"

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    res.status(error.status).send({
      code: error.code,
      error: error.message,
    })
  } else {
    res.status(500).send(error)
  }
}
