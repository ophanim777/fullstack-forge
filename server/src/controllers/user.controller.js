import { updateProfileSchema } from "../validators/user.validator.js";
import { updateProfile } from "../services/user.service.js";

export async function updateUserProfile(req, res, next) {
  try {
    const body = updateProfileSchema.parse(req.body);

    const user = await updateProfile(
      req.user.id,
      body
    );

    res.status(200).json({
      success: true,
      message: "Profile berhasil diperbarui.",
      user,
    });
  } catch (error) {
    next(error);
  }
}