import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobTranslatorRouter from './routes/jobTranslator';
import actionPlannerRouter from './routes/actionPlanner';
import resumeInterviewRouter from './routes/resumeInterview';

// 加载环境变量
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/job-translator', jobTranslatorRouter);
app.use('/api/action-planner', actionPlannerRouter);
app.use('/api/resume-interview', resumeInterviewRouter);

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;