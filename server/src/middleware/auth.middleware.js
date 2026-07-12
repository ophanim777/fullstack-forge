import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/apiError.js";

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(401, "Authorization header tidak ditemukan.");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Format token tidak valid.");
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch (error) {
    next(new ApiError(401, "Token tidak valid atau sudah kedaluwarsa."));
  }
}