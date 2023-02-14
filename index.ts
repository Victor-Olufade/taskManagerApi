import express, {Request, Response, Express} from 'express';
import morgan from 'morgan';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config()
const app: Express = express()

app.use(morgan('dev'))

export const AppDataSource = new DataSource({
    type: 'mysql',
    host:   'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: true
})

app.get("/", (req: Request, res: Response)=>{
    res.send("Express + Typescript")
})

const port = process.env.PORT;

AppDataSource.initialize().then(()=>{
    app.listen(port, ()=>{
        console.log(`server running on port ${port} after data source connection`);
    })
}).catch((err)=>{
    console.error("error connecting to data source", err)
})

// export PATH=$PATH:/usr/local/mysql-8.0.27-macos11-x86_64/bin
// mysql -u root -p




