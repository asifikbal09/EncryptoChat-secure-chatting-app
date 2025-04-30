import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import sendResponse from './app/utils/sendResponse';
import httpStatus from 'http-status';
import router from './app/router';


const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api",router)

app.get('/', (req: Request, res: Response) => {
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Hello world."
  })
});

app.use(globalErrorHandler);

export default app;