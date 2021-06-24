import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentsController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users",  createUserController.handle);
router.post("/tags", ensureAdmin, createTagController.handle);
router.post("/compliments", createComplimentsController.handle);
router.post("/login", authenticateUserController.handle);

export { router };