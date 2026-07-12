import { registerSchema } from "../validators/auth.validator.js";
import { registerUser } from "../services/auth.service.js";
import { loginSchema } from "../validators/auth.validator.js";
import { loginUser } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const body = registerSchema.parse(req.body);

    const user = await registerUser(body);

    res.status(201).json({
      success: true,
      message: "User berhasil dibuat.",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}