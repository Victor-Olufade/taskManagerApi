import { body, ValidationChain } from "express-validator";
import { Priority } from "../enums";
import { Status } from "../enums";

export const createValidator: ValidationChain[] = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Task title field is mandatory')
        .trim()
        .isString()
        .withMessage('Title must be in text format'),
    
    body('date')
        .not()
        .isEmpty()
        .withMessage('date cannot be empty')
        .isString()
        .withMessage('date must be valid date format'),

    body('description')
        .trim()
        .isString()
        .withMessage('description must be valid textformat'),

    body('priority')
        .trim()
        .isIn([Priority.normal, Priority.high, Priority.low])
        .withMessage('priority can only be high normal or low'),

    body('status')
        .trim()
        .isIn([Status.completed, Status.inProgress, Status.todo])
        .withMessage('status can only be completed, inProgress, or todo')
]


export const updateValidtor: ValidationChain[] = [
    body('id')
        .not()
        .isEmpty()
        .withMessage('task id must be provided')
        .trim()
        .isString()
        .withMessage('id must be in valid uuid format'),

    body('status')
        .trim()
        .isIn([Status.completed, Status.inProgress, Status.todo])
        .withMessage('status can only be completed, inProgress, or todo')
]