import express from 'express';
import { taskController } from './tasksController';
import { createValidator, updateValidtor } from './taskValidator';


const router = express.Router()

router.get("/", taskController.getAll)

router.post("/", createValidator, taskController.createTask)

router.put("/", updateValidtor, taskController.updateTask)


export default router;