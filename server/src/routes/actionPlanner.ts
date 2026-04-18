import express from 'express';
import { generateActionPlan } from '../services/openaiService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { targetJob, grade, major, modelConfig } = req.body;
    
    if (!targetJob || !grade || !major) {
      return res.status(400).json({ error: '请提供目标岗位、年级和专业' });
    }

    if (!modelConfig || !modelConfig.apiKey) {
      return res.status(400).json({ error: '请提供模型配置和API密钥' });
    }

    const result = await generateActionPlan(targetJob, grade, major, modelConfig);
    res.json(result);
  } catch (error) {
    console.error('行动规划师错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

export default router;