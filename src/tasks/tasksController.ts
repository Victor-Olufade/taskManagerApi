import { Request, Response } from 'express';
import { Task } from "./tasksEntity";
import { AppDataSource } from "../../index";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validationResult } from 'express-validator';
import {UpdateResult} from 'typeorm';

class TaskController{

    public async getAll(req: Request, res: Response): Promise<Response>{
        let allTasks: Task[];
        try {
            allTasks = await AppDataSource.getRepository(Task).find({
                order: {
                    date: 'ASC'
                }
            })
            
            allTasks = instanceToPlain(allTasks) as Task[]
            
            return res.status(200).json(allTasks);

        } catch (_error) {
            return res.json({error: "Internal server error"}).status(500)
        }
        
    }


    public async createTask(req: Request, res: Response): Promise<Response>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                errors: errors.array()
            })
        }

        const {title, date, description, priority, status} = req.body;

        const newTask = new Task()
        newTask.title = title
        newTask.date = date
        newTask.description = description
        newTask.priority = priority
        newTask.status = status

        let createdTask: Task;

        try {
            createdTask = await AppDataSource.getRepository(Task).save(newTask)

            createdTask = instanceToPlain(createdTask) as Task;

            return res.status(201).json({
                createdTask,
                message: 'Task Created Successfully'
            })

        } catch (error) {
            return res.json({error: "Internal server error"}).status(500)
        }
    }


    public async updateTask(req: Request, res: Response): Promise<Response>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                errors: errors.array()
            })
        }

        const {id, status} = req.body;

        let taskExists: Task | null; 
        
        try {
            taskExists = await AppDataSource.getRepository(Task).findOne({
                where:{id}
            })

        } catch (error) {
            return res.json({error: "Internal server error"}).status(500)
        }

        if(taskExists === null || undefined){
            return res.status(400).json({
                message: "Task with given id does not exists"
            })
        }

        let updatedTask: UpdateResult;
        try {
            updatedTask = await AppDataSource.getRepository(Task).update(id, plainToInstance(Task, {
                status
            }))

            updatedTask = instanceToPlain(updatedTask) as UpdateResult;
            return res.status(200).json({
                updatedTask,
                message: "Task status updated"
            })
        } catch (error) {
            return res.json({error: "Internal server error"}).status(500)
        }

    }
}

export const taskController = new TaskController()