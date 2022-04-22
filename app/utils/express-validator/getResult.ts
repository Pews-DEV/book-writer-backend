import { Request } from "express";
import { validationResult } from "express-validator";

function getResult(request: Request) {
  return validationResult(request)
}

export default getResult
