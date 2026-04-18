import express from 'express';
import { analyzeJobDescription } from '../services/openaiService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { jobDescription, jobLink, modelConfig } = req.body;
    
    if (!jobDescription && !jobLink) {
      return res.status(400).json({ error: '请提供岗位描述或链接' });
    }

    if (!modelConfig || !modelConfig.apiKey) {
      return res.status(400).json({ error: '请提供模型配置和API密钥' });
    }

    const result = await analyzeJobDescription(jobDescription || jobLink, modelConfig);
    res.json(result);
  } catch (error) {
    console.error('岗位翻译器错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

export default router;