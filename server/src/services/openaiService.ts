import axios from 'axios';

interface ModelConfig {
  model: 'siliconflow';
  apiKey: string;
  baseUrl?: string; // 硅基流动需要
}

// 硅基流动API调用
async function callSiliconFlowAPI(prompt: string, config: ModelConfig): Promise<any> {
  try {
    const baseUrl = config.baseUrl || 'https://api.siliconflow.cn/v1';
    
    const chatResponse = await axios.post(`${baseUrl}/chat/completions`, {
      model: 'Qwen/Qwen2.5-72B-Instruct',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // 检查响应格式
    if (chatResponse.data && chatResponse.data.choices && chatResponse.data.choices[0] && chatResponse.data.choices[0].message && chatResponse.data.choices[0].message.content) {
      return chatResponse.data.choices[0].message.content;
    } else {
      console.error('硅基流动API返回格式不正确:', chatResponse.data);
      throw new Error('硅基流动API返回格式不正确');
    }
  } catch (error: any) {
    console.error('硅基流动API调用失败:', error);
    // 提取更友好的错误信息
    if (error.response && error.response.data) {
      if (error.response.data.error) {
        throw new Error(`硅基流动API错误: ${error.response.data.error.message || '未知错误'}`);
      } else if (error.response.data.Message) {
        throw new Error(`硅基流动API错误: ${error.response.data.Message}`);
      } else {
        throw new Error(`硅基流动API错误: ${JSON.stringify(error.response.data)}`);
      }
    } else if (error.message) {
      throw error;
    } else {
      throw new Error('硅基流动API调用失败');
    }
  }
}

// 通用AI调用函数
async function callAI(prompt: string, config: ModelConfig): Promise<any> {
  const response = await callSiliconFlowAPI(prompt, config);
  
  // 确保返回的是JSON对象
  try {
    let jsonString = typeof response === 'string' ? response : JSON.stringify(response);
    
    // 移除Markdown代码块标记
    jsonString = jsonString.replace(/^```json\s*|\s*```$/g, '').trim();
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('解析JSON失败:', error);
    console.error('原始响应:', response);
    throw new Error('AI返回格式错误');
  }
}

// 分析岗位描述
export async function analyzeJobDescription(jobInput: string, modelConfig: ModelConfig): Promise<any> {
  const prompt = `
请分析以下岗位描述，输出以下内容：
1. 真实工作场景：描述该岗位的日常工作内容和环境
2. 硬技能拆解：列出该岗位需要的专业技能和工具
3. 软技能拆解：列出该岗位需要的软技能和能力
4. 不适合什么样的人：分析哪些类型的人可能不适合这个岗位

岗位信息：${jobInput}

请以JSON格式输出，包含以下字段：
- realWorkScenario
- hardSkills
- softSkills
- notSuitableFor
  `;

  return await callAI(prompt, modelConfig);
}

// 生成行动规划
export async function generateActionPlan(targetJob: string, grade: string, major: string, modelConfig: ModelConfig): Promise<any> {
  const prompt = `
请为以下情况生成1-3个月的分阶段行动清单，并指出优先补充的一项能力：
- 目标岗位：${targetJob}
- 当前年级：${grade}
- 专业：${major}

请以JSON格式输出，包含以下字段：
- phases：包含1-3个月的行动清单，每个阶段包含tasks数组
- prioritySkill：优先补充的一项能力
  `;

  return await callAI(prompt, modelConfig);
}

// 分析简历
export async function analyzeResume(resumeContent: string, modelConfig: ModelConfig): Promise<any> {
  const prompt = `
请详细分析以下简历片段，提供：
1. 诊断：指出简历中的具体问题和改进空间，至少3点
2. 改写建议：提供具体的改写示例，确保包含original（原始内容）和suggested（改写后内容）字段

简历内容：${resumeContent}

请严格以JSON格式输出，包含以下字段：
- diagnosis：数组类型，包含多个诊断项
- rewriteSuggestions：数组类型，每个元素包含original和suggested字段

示例输出格式：
{
  "diagnosis": ["问题1", "问题2", "问题3"],
  "rewriteSuggestions": [
    {
      "original": "原始内容",
      "suggested": "改写后的内容"
    }
  ]
}
  `;

  return await callAI(prompt, modelConfig);
}

// 生成面试反馈
export async function generateInterviewFeedback(question: string, answer: string, jobType: string, modelConfig: ModelConfig): Promise<any> {
  const prompt = `
请分析以下面试情况，提供改进建议：
- 面试问题：${question}
- 候选人回答：${answer}
- 岗位类型：${jobType || '通用'}

请以JSON格式输出，包含以下字段：
- evaluation：对回答的评价
- suggestions：改进建议
- betterAnswer：更好的回答示例
  `;

  return await callAI(prompt, modelConfig);
}