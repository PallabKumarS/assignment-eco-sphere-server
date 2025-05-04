import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { UserRoutes } from './app/modules/user/user.routes';
import config from './app/config';
import { CategoryRoutes } from './app/modules/category/category.routes';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import { IdeaRoutes } from './app/modules/idea/idea.routes';
import { CommentRoutes } from './app/modules/comment/comment.routes';
import { VoteRoutes } from './app/modules/vote/vote.routes';

const app: Application = express();

// parsers
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes here
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/ideas', IdeaRoutes);
app.use('/api/comments', CommentRoutes);
app.use('/api/votes', VoteRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server Status</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Server is running successfully! 🚀</h1>
    </body>
    </html>
  `);
});

// not found route
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
