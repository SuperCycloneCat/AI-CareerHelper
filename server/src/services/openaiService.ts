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
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    }, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // 检查响应格式
    if (chatResponse.data && chatResponse.data.choices && chatResponse.data.choices[0] && chatResponse.data.choices[0].message && chatResponse.data.choices[0].message.content) {
      const content = chatResponse.data.choices[0].message.content;
      console.log('硅基流动API返回内容:', content);
      return content;
    } else {
      console.error('硅基流动API返回格式不正确:', chatResponse.data);
      throw new Error('硅基流动API返回格式不正确');
    }
  } catch (error: any) {
    console.error('硅基流动API调用失败:', error);
    // 提取更友好的错误信息
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(`硅基流动API错误: ${error.response.data.error.message}`);
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
    return typeof response === 'string' ? JSON.parse(response) : response;
  } catch (error) {
    console.error('解析JSON失败:', error);
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
请分析以下简历片段，提供：
1. 诊断：指出简历中的问题和改进空间
2. 改写建议：提供具体的改写示例

简历内容：${resumeContent}

请严格以JSON格式输出，包含以下字段：
- diagnosis：字符串类型，诊断内容
- rewriteSuggestions：字符串类型，改写建议内容

示例输出格式：
{
  "diagnosis": "这里是诊断内容",
  "rewriteSuggestions": "这里是改写建议内容"
}
  `;

  const result = await callAI(prompt, modelConfig);
  console.log('分析简历结果:', result);
  return result;
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