import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ProfileController } from "../controllers/ProfileController";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from "../../../config/upload";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

export const usersRouter = Router();

const usersController = new UsersController();
const profileController = new ProfileController();

const upload = multer(uploadConfig);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(3).max(20),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    },
  }),
  usersController.create
);

usersRouter.get("/profile", isAuthenticated, profileController.show);

usersRouter.post("/avatar", isAuthenticated, upload.single("avatar"));
