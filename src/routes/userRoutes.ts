import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post('/users', createUser);
router.get('/users',protect, getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;