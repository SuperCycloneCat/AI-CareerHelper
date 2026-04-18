import React, { useState } from 'react';
import axios from 'axios';
import { ModelConfig } from '../App';
import { usePageState } from '../context/PageStateContext';

interface WorkflowPageProps {
  modelConfig: ModelConfig;
  onTabChange: (tabId: string) => void;
}

const WorkflowPage: React.FC<WorkflowPageProps> = ({ modelConfig, onTabChange }) => {
  const { pageState, updateJobTranslatorState, updateActionPlannerState, updateResumeInterviewState, syncDataToNextModule } = usePageState();
  
  const [currentStep, setCurrentStep] = useState<'job-analysis' | 'action-plan' | 'resume-interview'>('job-analysis');
  const [jobTranslatorLoading, setJobTranslatorLoading] = useState(false);
  const [actionPlannerLoading, setActionPlannerLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [error, setError] = useState('');

  // 处理岗位分析提交
  const handleJobTranslatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobTranslatorLoading(true);
    setError('');

    if (!modelConfig.apiKey) {
      setError('请先配置API密钥');
      setJobTranslatorLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/job-translator', {
        jobDescription: pageState.jobTranslator.jobDescription || undefined,
        jobLink: pageState.jobTranslator.jobLink || undefined,
        modelConfig,
      });
      updateJobTranslatorState({ result: response.data });
    } catch (err) {
      setError('分析失败，请稍后重试');
      console.error('Error:', err);
    } finally {
      setJobTranslatorLoading(false);
    }
  };

  // 处理行动规划提交
  const handleActionPlannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionPlannerLoading(true);
    setError('');

    if (!modelConfig.apiKey) {
      setError('请先配置API密钥');
      setActionPlannerLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/action-planner', {
        targetJob: pageState.actionPlanner.targetJob,
        grade: pageState.actionPlanner.grade,
        major: pageState.actionPlanner.major,
        modelConfig,
      });
      updateActionPlannerState({ result: response.data });
    } catch (err) {
      setError('生成计划失败，请稍后重试');
      console.error('Error:', err);
    } finally {
      setActionPlannerLoading(false);
    }
  };

  // 处理简历分析提交
  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResumeLoading(true);
    setError('');

    if (!modelConfig.apiKey) {
      setError('请先配置API密钥');
      setResumeLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/resume-interview/analyze-resume', {
        resumeContent: pageState.resumeInterview.resumeText,
        modelConfig,
      });
      updateResumeInterviewState({ resumeResult: response.data });
    } catch (err) {
      setError('分析简历失败，请稍后重试');
      console.error('Error:', err);
    } finally {
      setResumeLoading(false);
    }
  };

  // 处理面试模拟提交
  const handleInterviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInterviewLoading(true);
    setError('');

    if (!modelConfig.apiKey) {
      setError('请先配置API密钥');
      setInterviewLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/resume-interview/interview-feedback', {
        question: pageState.resumeInterview.interviewQuestion,
        answer: pageState.resumeInterview.interviewAnswer,
        jobType: pageState.resumeInterview.jobType,
        modelConfig,
      });
      updateResumeInterviewState({ interviewResult: response.data });
    } catch (err) {
      setError('生成反馈失败，请稍后重试');
      console.error('Error:', err);
    } finally {
      setInterviewLoading(false);
    }
  };

  // 下一步
  const handleNextStep = () => {
    if (currentStep === 'job-analysis' && pageState.jobTranslator.result) {
      syncDataToNextModule('job-translator');
      setCurrentStep('action-plan');
    } else if (currentStep === 'action-plan' && pageState.actionPlanner.result) {
      syncDataToNextModule('action-planner');
      setCurrentStep('resume-interview');
    }
  };

  // 上一步
  const handlePrevStep = () => {
    if (currentStep === 'action-plan') {
      setCurrentStep('job-analysis');
    } else if (currentStep === 'resume-interview') {
      setCurrentStep('action-plan');
    }
  };

  // 计算步骤进度
  const getStepProgress = () => {
    switch (currentStep) {
      case 'job-analysis':
        return 33;
      case 'action-plan':
        return 66;
      case 'resume-interview':
        return 100;
      default:
        return 0;
    }
  };

  // 保存到本地
  const saveToLocal = (data: any, filename: string) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fullFilename = `${filename}_${timestamp}.json`;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fullFilename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '0.75rem',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
          }}>
            🚀
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>
              全链路求职准备
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9375rem' }}>
              一步到位，完成从岗位分析到简历面试的全部准备
            </p>
          </div>
        </div>
      </div>

      {/* 进度条 */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>进度</span>
          <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#3b82f6' }}>
            {getStepProgress()}%
          </span>
        </div>
        <div style={{
          height: '8px',
          background: '#e5e7eb',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${getStepProgress()}%`,
            background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* 步骤导航 */}
      <div style={{
        display: 'flex',
        marginBottom: '2rem',
        borderBottom: '2px solid #e5e7eb',
      }}>
        <button
          style={{
            flex: 1,
            padding: '1rem',
            background: currentStep === 'job-analysis' ? '#eff6ff' : 'white',
            border: 'none',
            borderBottom: currentStep === 'job-analysis' ? '2px solid #3b82f6' : 'none',
            cursor: 'pointer',
            textAlign: 'center',
            fontSize: '0.9375rem',
            fontWeight: currentStep === 'job-analysis' ? '600' : '500',
            color: currentStep === 'job-analysis' ? '#3b82f6' : '#6b7280',
            transition: 'all 0.2s ease',
          }}
          onClick={() => setCurrentStep('job-analysis')}
        >
          <div style={{ marginBottom: '0.25rem' }}>💼</div>
          岗位分析
        </button>
        <button
          style={{
            flex: 1,
            padding: '1rem',
            background: currentStep === 'action-plan' ? '#eff6ff' : 'white',
            border: 'none',
            borderBottom: currentStep === 'action-plan' ? '2px solid #3b82f6' : 'none',
            cursor: 'pointer',
            textAlign: 'center',
            fontSize: '0.9375rem',
            fontWeight: currentStep === 'action-plan' ? '600' : '500',
            color: currentStep === 'action-plan' ? '#3b82f6' : '#6b7280',
            transition: 'all 0.2s ease',
          }}
          onClick={() => setCurrentStep('action-plan')}
          disabled={!pageState.jobTranslator.result}
        >
          <div style={{ marginBottom: '0.25rem' }}>📋</div>
          行动规划
        </button>
        <button
          style={{
            flex: 1,
            padding: '1rem',
            background: currentStep === 'resume-interview' ? '#eff6ff' : 'white',
            border: 'none',
            borderBottom: currentStep === 'resume-interview' ? '2px solid #3b82f6' : 'none',
            cursor: 'pointer',
            textAlign: 'center',
            fontSize: '0.9375rem',
            fontWeight: currentStep === 'resume-interview' ? '600' : '500',
            color: currentStep === 'resume-interview' ? '#3b82f6' : '#6b7280',
            transition: 'all 0.2s ease',
          }}
          onClick={() => setCurrentStep('resume-interview')}
          disabled={!pageState.actionPlanner.result}
        >
          <div style={{ marginBottom: '0.25rem' }}>🎯</div>
          简历面试
        </button>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <div>
            <strong>操作失败</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>{error}</p>
          </div>
        </div>
      )}

      {/* 步骤内容 */}
      <div style={{ marginBottom: '2rem' }}>
        {/* 岗位分析步骤 */}
        {currentStep === 'job-analysis' && (
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                岗位分析
              </h3>
              <form onSubmit={handleJobTranslatorSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label">
                    岗位描述
                  </label>
                  <textarea
                    className="textarea"
                    rows={6}
                    placeholder="请粘贴岗位描述（JD）文本，包括岗位职责、任职要求等内容..."
                    value={pageState.jobTranslator.jobDescription}
                    onChange={(e) => updateJobTranslatorState({ jobDescription: e.target.value })}
                    style={{ minHeight: '160px' }}
                  />
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                }}>
                  <div style={{ 
                    flex: 1, 
                    height: '1px', 
                    background: '#e5e7eb' 
                  }} />
                  <span>或者</span>
                  <div style={{ 
                    flex: 1, 
                    height: '1px', 
                    background: '#e5e7eb' 
                  }} />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label">
                    岗位链接
                  </label>
                  <input
                    type="url"
                    className="input"
                    placeholder="请输入招聘网站上的岗位链接..."
                    value={pageState.jobTranslator.jobLink}
                    onChange={(e) => updateJobTranslatorState({ jobLink: e.target.value })}
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={jobTranslatorLoading || (!pageState.jobTranslator.jobDescription && !pageState.jobTranslator.jobLink)}
                  style={{ width: '100%', padding: '1rem' }}
                >
                  {jobTranslatorLoading ? (
                    <>
                      <span className="loading"></span>
                      <span>分析中...</span>
                    </>
                  ) : (
                    <>
                      <span>🔍</span>
                      <span>开始分析岗位</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {pageState.jobTranslator.result && (
              <div>
                <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                  分析结果
                </h3>
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: '600' }}>
                    真实工作场景
                  </h4>
                  <p style={{ margin: 0, lineHeight: '1.6' }}>
                    {pageState.jobTranslator.result.realWorkScene}
                  </p>
                </div>
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: '600' }}>
                    技能拆解
                  </h4>
                  <div style={{ marginBottom: '1rem' }}>
                    <h5 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: '500' }}>
                      硬技能
                    </h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {pageState.jobTranslator.result.hardSkills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="badge badge-primary"
                          style={{ fontSize: '0.875rem' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: '500' }}>
                      软技能
                    </h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {pageState.jobTranslator.result.softSkills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="badge badge-secondary"
                          style={{ fontSize: '0.875rem' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: '600' }}>
                    不适合人群
                  </h4>
                  <p style={{ margin: 0, lineHeight: '1.6' }}>
                    {pageState.jobTranslator.result.notSuitableFor}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => saveToLocal(pageState.jobTranslator.result, 'job_translation')}
                    style={{ flex: 1, padding: '0.875rem' }}
                  >
                    <span>💾</span>
                    <span>保存到本地</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={!pageState.jobTranslator.result}
                    style={{ flex: 1, padding: '0.875rem' }}
                  >
                    <span>➡️</span>
                    <span>下一步：行动规划</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 行动规划步骤 */}
        {currentStep === 'action-plan' && (
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                行动规划
              </h3>
              <form onSubmit={handleActionPlannerSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label">
                    目标岗位
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="请输入目标岗位，如：产品经理、市场营销专员..."
                    value={pageState.actionPlanner.targetJob}
                    onChange={(e) => updateActionPlannerState({ targetJob: e.target.value })}
                  />
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}>
                  <div>
                    <label className="label">
                      年级
                    </label>
                    <select
                    className="select"
                    value={pageState.actionPlanner.grade}
                    onChange={(e) => updateActionPlannerState({ grade: e.target.value })}
                  >
                      <option value="">请选择年级</option>
                      <option value="大三">大三</option>
                      <option value="大四">大四</option>
                      <option value="应届毕业生">应届毕业生</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label">
                      专业
                    </label>
                    <input
                    type="text"
                    className="input"
                    placeholder="请输入专业"
                    value={pageState.actionPlanner.major}
                    onChange={(e) => updateActionPlannerState({ major: e.target.value })}
                  />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={actionPlannerLoading || !pageState.actionPlanner.targetJob || !pageState.actionPlanner.grade || !pageState.actionPlanner.major}
                  style={{ width: '100%', padding: '1rem' }}
                >
                  {actionPlannerLoading ? (
                    <>
                      <span className="loading"></span>
                      <span>生成计划中...</span>
                    </>
                  ) : (
                    <>
                      <span>🎯</span>
                      <span>生成行动规划</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {pageState.actionPlanner.result && (
              <div>
                <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                  行动规划结果
                </h3>
                <div className="card" style={{ 
                  marginBottom: '2rem', 
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  border: '2px solid #10b981',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>⚡</span>
                    <h4 style={{ margin: 0, fontWeight: '600', color: '#065f46', fontSize: '1.125rem' }}>
                      优先补充的能力
                    </h4>
                  </div>
                  <p style={{ 
                    color: '#047857', 
                    fontSize: '1.125rem', 
                    fontWeight: '500',
                    margin: 0,
                    padding: '0.75rem',
                    background: 'white',
                    borderRadius: '10px',
                  }}>
                    {pageState.actionPlanner.result.prioritySkill}
                  </p>
                </div>

                <h4 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: '600' }}>
                  分阶段行动清单
                </h4>
                <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                  {pageState.actionPlanner.result.phases.map((phase: any, index: number) => (
                    <div
                      key={index}
                      className="card"
                      style={{
                        borderLeft: `4px solid ${index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b'}`,
                        background: index === 0 ? '#eff6ff' : index === 1 ? '#ecfdf5' : '#fffbeb',
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>{index === 0 ? '1️⃣' : index === 1 ? '2️⃣' : '3️⃣'}</span>
                        <h4 style={{ margin: 0, fontWeight: '600', color: '#111827', fontSize: '1.125rem' }}>
                          第{index + 1}个月
                        </h4>
                      </div>
                      
                      <ul style={{ 
                        listStyle: 'none', 
                        padding: 0, 
                        margin: 0,
                        display: 'grid',
                        gap: '0.75rem',
                      }}>
                        {phase.tasks.map((task: string, taskIndex: number) => (
                          <li
                            key={taskIndex}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem',
                              padding: '1rem',
                              background: 'white',
                              borderRadius: '10px',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                            }}
                          >
                            <span style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b',
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              flexShrink: 0,
                            }}>
                              {taskIndex + 1}
                            </span>
                            <span style={{ color: '#374151', lineHeight: '1.5' }}>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handlePrevStep}
                    style={{ flex: 1, padding: '0.875rem' }}
                  >
                    <span>⬅️</span>
                    <span>上一步：岗位分析</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => saveToLocal(pageState.actionPlanner.result, 'action_plan')}
                    style={{ flex: 1, padding: '0.875rem' }}
                  >
                    <span>💾</span>
                    <span>保存到本地</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={!pageState.actionPlanner.result}
                    style={{ flex: 1, padding: '0.875rem' }}
                  >
                    <span>➡️</span>
                    <span>下一步：简历面试</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 简历面试步骤 */}
        {currentStep === 'resume-interview' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem',
            }}>
              {/* 简历分析 */}
              <div>
                <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                  简历分析
                </h3>
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <form onSubmit={handleResumeSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label className="label">
                        简历片段
                      </label>
                      <textarea
                        className="textarea"
                        rows={5}
                        placeholder="请粘贴简历片段，如项目经历、实习经历等..."
                        value={pageState.resumeInterview.resumeText}
                        onChange={(e) => updateResumeInterviewState({ resumeText: e.target.value })}
                        style={{ minHeight: '140px' }}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-accent"
                      disabled={resumeLoading || !pageState.resumeInterview.resumeText}
                      style={{ width: '100%' }}
                    >
                      {resumeLoading ? (
                        <>
                          <span className="loading"></span>
                          <span>分析中...</span>
                        </>
                      ) : (
                        <>
                          <span>🔍</span>
                          <span>分析简历</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {pageState.resumeInterview.resumeResult && (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                      <h4 style={{ margin: '0 0 0.75rem', fontSize: '1.125rem', fontWeight: '600' }}>
                        诊断
                      </h4>
                      <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                        {pageState.resumeInterview.resumeResult.diagnosis}
                      </p>
                    </div>
                    
                    <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                      <h4 style={{ margin: '0 0 0.75rem', fontSize: '1.125rem', fontWeight: '600' }}>
                        改写建议
                      </h4>
                      <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                        {pageState.resumeInterview.resumeResult.rewriteSuggestions}
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => saveToLocal(pageState.resumeInterview.resumeResult, 'resume_analysis')}
                      style={{ width: '100%', padding: '0.75rem' }}
                    >
                      <span>💾</span>
                      <span>保存简历分析</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 面试模拟 */}
              <div>
                <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                  面试模拟
                </h3>
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <form onSubmit={handleInterviewSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label className="label">
                        面试问题
                      </label>
                      <textarea
                        className="textarea"
                        rows={3}
                        placeholder="请输入面试问题，如：请介绍一下你的项目经历..."
                        value={pageState.resumeInterview.interviewQuestion}
                        onChange={(e) => updateResumeInterviewState({ interviewQuestion: e.target.value })}
                        style={{ minHeight: '80px' }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <label className="label">
                        你的回答
                      </label>
                      <textarea
                        className="textarea"
                        rows={4}
                        placeholder="请输入你的回答..."
                        value={pageState.resumeInterview.interviewAnswer}
                        onChange={(e) => updateResumeInterviewState({ interviewAnswer: e.target.value })}
                        style={{ minHeight: '100px' }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <label className="label">
                        岗位类型 <span style={{ color: '#9ca3af', fontWeight: '400' }}>(可选)</span>
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="如：产品经理、市场营销"
                        value={pageState.resumeInterview.jobType}
                        onChange={(e) => updateResumeInterviewState({ jobType: e.target.value })}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={interviewLoading || !pageState.resumeInterview.interviewQuestion || !pageState.resumeInterview.interviewAnswer}
                      style={{ width: '100%' }}
                    >
                      {interviewLoading ? (
                        <>
                          <span className="loading"></span>
                          <span>生成反馈中...</span>
                        </>
                      ) : (
                        <>
                          <span>🎯</span>
                          <span>获取改进建议</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {pageState.resumeInterview.interviewResult && (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                      <h4 style={{ margin: '0 0 0.75rem', fontSize: '1.125rem', fontWeight: '600' }}>
                        评价
                      </h4>
                      <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                        {pageState.resumeInterview.interviewResult.evaluation}
                      </p>
                    </div>
                    
                    <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                      <h4 style={{ margin: '0 0 0.75rem', fontSize: '1.125rem', fontWeight: '600' }}>
                        改进建议
                      </h4>
                      <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                        {pageState.resumeInterview.interviewResult.suggestions}
                      </p>
                    </div>
                    
                    <div className="card" style={{ 
                      borderLeft: '4px solid #10b981',
                      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                    }}>
                      <h4 style={{ margin: '0 0 0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#065f46' }}>
                        更好的回答示例
                      </h4>
                      <p style={{ color: '#047857', lineHeight: '1.7', margin: 0 }}>
                        {pageState.resumeInterview.interviewResult.betterAnswer}
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => saveToLocal(pageState.resumeInterview.interviewResult, 'interview_feedback')}
                      style={{ width: '100%', padding: '0.75rem' }}
                    >
                      <span>💾</span>
                      <span>保存面试反馈</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 完成按钮 */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrevStep}
                style={{ flex: 1, padding: '0.875rem' }}
              >
                <span>⬅️</span>
                <span>上一步：行动规划</span>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onTabChange('home')}
                style={{ flex: 1, padding: '0.875rem' }}
              >
                <span>🎉</span>
                <span>完成：返回工作流</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowPage;