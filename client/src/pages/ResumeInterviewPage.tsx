import React, { useState } from 'react';
import axios from 'axios';
import { ModelConfig } from '../App';
import { usePageState } from '../context/PageStateContext';

interface ResumeInterviewPageProps {
  modelConfig: ModelConfig;
  onTabChange: (tabId: string) => void;
}

const ResumeInterviewPage: React.FC<ResumeInterviewPageProps> = ({ modelConfig, onTabChange }) => {
  const { pageState, updateResumeInterviewState } = usePageState();
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeError, setResumeError] = useState('');
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [interviewError, setInterviewError] = useState('');

  // 自动预填充数据
  React.useEffect(() => {
    if (pageState.actionPlanner.targetJob && !pageState.resumeInterview.jobType) {
      updateResumeInterviewState({ jobType: pageState.actionPlanner.targetJob });
    }
  }, [pageState.actionPlanner.targetJob, pageState.resumeInterview.jobType, updateResumeInterviewState]);

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResumeLoading(true);
    setResumeError('');

    if (!modelConfig.apiKey) {
      setResumeError('请先配置API密钥');
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
      setResumeError('分析简历失败，请稍后重试');
      console.error('Error:', err);
    } finally {
      setResumeLoading(false);
    }
  };

  const handleInterviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInterviewLoading(true);
    setInterviewError('');

    if (!modelConfig.apiKey) {
      setInterviewError('请先配置API密钥');
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
      setInterviewError('生成反馈失败，请稍后重试');
      console.error('Error:', err);
    } finally {
      setInterviewLoading(false);
    }
  };

  const saveResumeToLocal = (data: any) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `resume_analysis_${timestamp}.json`;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const saveInterviewToLocal = (data: any) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `interview_feedback_${timestamp}.json`;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResumeReset = () => {
    if (window.confirm('确定要重置简历分析部分吗？这将清除简历文本和分析结果。')) {
      updateResumeInterviewState({ 
        resumeText: '', 
        resumeResult: null 
      });
    }
  };

  const handleInterviewReset = () => {
    if (window.confirm('确定要重置面试模拟部分吗？这将清除面试问题、回答和反馈结果。')) {
      updateResumeInterviewState({ 
        interviewQuestion: '', 
        interviewAnswer: '', 
        jobType: '', 
        interviewResult: null 
      });
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Header */}
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
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
          }}>
            🎯
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>
              简历面试教练
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9375rem' }}>
              专业指导，让你的简历和面试更出色
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
      }}>
        {/* Resume Analysis Section */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}>
            <span style={{ fontSize: '1.25rem' }}>📄</span>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
              简历分析
            </h3>
          </div>

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
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  className="btn btn-accent"
                  disabled={resumeLoading || !pageState.resumeInterview.resumeText}
                  style={{ flex: 1 }}
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleResumeReset}
                  disabled={resumeLoading}
                >
                  <span>🔄</span>
                  <span>重置</span>
                </button>
              </div>
            </form>
          </div>

          {resumeError && (
            <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.25rem' }}>⚠️</span>
              <div>
                <strong>分析失败</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>{resumeError}</p>
              </div>
            </div>
          )}

          {pageState.resumeInterview.resumeResult && (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ fontSize: '1.125rem' }}>🔍</span>
                  <h4 style={{ margin: 0, fontWeight: '600', color: '#111827' }}>
                    诊断
                  </h4>
                </div>
                <ul style={{ 
                  margin: 0, 
                  padding: 0, 
                  listStyle: 'none',
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {Array.isArray(pageState.resumeInterview.resumeResult.diagnosis) ? (
                    pageState.resumeInterview.resumeResult.diagnosis.map((item: string, index: number) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                      }}>
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#3b82f6',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          flexShrink: 0,
                          marginTop: '0.25rem',
                        }}>
                          {index + 1}
                        </span>
                        <span style={{ color: '#4b5563', lineHeight: '1.5' }}>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li style={{ color: '#4b5563', lineHeight: '1.7' }}>
                      {pageState.resumeInterview.resumeResult.diagnosis}
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ fontSize: '1.125rem' }}>✨</span>
                  <h4 style={{ margin: 0, fontWeight: '600', color: '#111827' }}>
                    改写建议
                  </h4>
                </div>
                {Array.isArray(pageState.resumeInterview.resumeResult.rewriteSuggestions) ? (
                  pageState.resumeInterview.resumeResult.rewriteSuggestions.map((item: any, index: number) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <h5 style={{ margin: '0 0 0.25rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>
                          原始内容：
                        </h5>
                        <p style={{ margin: 0, padding: '0.75rem', background: '#f3f4f6', borderRadius: '8px', fontSize: '0.875rem', lineHeight: '1.5' }}>
                          {item.original || '无'}
                        </p>
                      </div>
                      <div>
                        <h5 style={{ margin: '0 0 0.25rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>
                          改写建议：
                        </h5>
                        <p style={{ margin: 0, padding: '0.75rem', background: '#ecfdf5', borderRadius: '8px', fontSize: '0.875rem', lineHeight: '1.5' }}>
                          {item.suggested || '无'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                    {pageState.resumeInterview.resumeResult.rewriteSuggestions}
                  </p>
                )}
              </div>
              
              {/* Save Button */}
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => saveResumeToLocal(pageState.resumeInterview.resumeResult)}
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <span>💾</span>
                  <span>保存到本地</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Interview Simulation Section */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}>
            <span style={{ fontSize: '1.25rem' }}>💬</span>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
              面试模拟
            </h3>
          </div>

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
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={interviewLoading || !pageState.resumeInterview.interviewQuestion || !pageState.resumeInterview.interviewAnswer}
                  style={{ flex: 1 }}
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleInterviewReset}
                  disabled={interviewLoading}
                >
                  <span>🔄</span>
                  <span>重置</span>
                </button>
              </div>
            </form>
          </div>

          {interviewError && (
            <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.25rem' }}>⚠️</span>
              <div>
                <strong>生成失败</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>{interviewError}</p>
              </div>
            </div>
          )}

          {pageState.resumeInterview.interviewResult && (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ fontSize: '1.125rem' }}>📊</span>
                  <h4 style={{ margin: 0, fontWeight: '600', color: '#111827' }}>
                    评价
                  </h4>
                </div>
                <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                  {pageState.resumeInterview.interviewResult.evaluation}
                </p>
              </div>
              
              <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ fontSize: '1.125rem' }}>💡</span>
                  <h4 style={{ margin: 0, fontWeight: '600', color: '#111827' }}>
                    改进建议
                  </h4>
                </div>
                <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                  {pageState.resumeInterview.interviewResult.suggestions}
                </p>
              </div>
              
              <div className="card" style={{ 
                borderLeft: '4px solid #10b981',
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ fontSize: '1.125rem' }}>⭐</span>
                  <h4 style={{ margin: 0, fontWeight: '600', color: '#065f46' }}>
                    更好的回答示例
                  </h4>
                </div>
                <p style={{ color: '#047857', lineHeight: '1.7', margin: 0 }}>
                  {pageState.resumeInterview.interviewResult.betterAnswer}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                flexDirection: 'column'
              }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => saveInterviewToLocal(pageState.resumeInterview.interviewResult)}
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <span>💾</span>
                  <span>保存到本地</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    onTabChange('home');
                  }}
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <span>🎉</span>
                  <span>完成：返回工作流</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeInterviewPage;