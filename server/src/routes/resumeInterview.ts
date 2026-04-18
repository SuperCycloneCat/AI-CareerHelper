import express from 'express';
import { analyzeResume, generateInterviewFeedback } from '../services/openaiService';

const router = express.Router();

// 简历分析路由
router.post('/analyze-resume', async (req, res) => {
  try {
    const { resumeContent, modelConfig } = req.body;
    
    if (!resumeContent) {
      return res.status(400).json({ error: '请提供简历内容' });
    }

    if (!modelConfig || !modelConfig.apiKey) {
      return res.status(400).json({ error: '请提供模型配置和API密钥' });
    }

    const result = await analyzeResume(resumeContent, modelConfig);
    res.json(result);
  } catch (error) {
    console.error('简历分析错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 面试反馈路由
router.post('/interview-feedback', async (req, res) => {
  try {
    const { question, answer, jobType, modelConfig } = req.body;
    
    if (!question || !answer) {
      return res.status(400).json({ error: '请提供面试问题和回答' });
    }

    if (!modelConfig || !modelConfig.apiKey) {
      return res.status(400).json({ error: '请提供模型配置和API密钥' });
    }

    const result = await generateInterviewFeedback(question, answer, jobType, modelConfig);
    res.json(result);
  } catch (error) {
    console.error('面试反馈错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

export default router;