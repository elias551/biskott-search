export class ApiError extends Error {
  constructor(public code: number, public status: number, message?: string) {
    super(message)
  }
}
