import React, { useState } from 'react';
import axios from 'axios';
import { ModelConfig } from '../App';
import { usePageState } from '../context/PageStateContext';

interface ResumeInterviewPageProps {
  modelConfig: ModelConfig;
  isDarkMode?: boolean;
}

const ResumeInterviewPage: React.FC<ResumeInterviewPageProps> = ({ modelConfig, isDarkMode = false }) => {
  const { pageState, updateResumeInterviewState } = usePageState();
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeError, setResumeError] = useState('');
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [interviewError, setInterviewError] = useState('');

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
      if (response.data && typeof response.data === 'object') {
        updateResumeInterviewState({ resumeResult: response.data });
      } else {
        setResumeError('分析结果格式错误');
        console.error('Invalid response data:', response.data);
      }
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
    try {
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
    } catch (error) {
      console.error('Failed to save resume analysis:', error);
      alert('保存失败，请稍后重试');
    }
  };

  const saveInterviewToLocal = (data: any) => {
    try {
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
    } catch (error) {
      console.error('Failed to save interview feedback:', error);
      alert('保存失败，请稍后重试');
    }
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
      <div className="fade-in" style={{ marginBottom: '2.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          marginBottom: '1rem',
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: isDarkMode 
              ? '0 8px 32px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
              : '0 8px 24px rgba(245, 158, 11, 0.3)',
            transition: 'all 0.3s ease',
          }}>
            🎯
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.025em', color: isDarkMode ? '#f1f5f9' : '#111827', transition: 'color 0.3s ease' }}>
              简历面试教练
            </h2>
            <p style={{ margin: 0, color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '1rem', transition: 'color 0.3s ease' }}>
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
        <div className="fade-in">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.125rem',
              boxShadow: isDarkMode 
                ? '0 4px 16px rgba(59, 130, 246, 0.4)' 
                : '0 4px 12px rgba(59, 130, 246, 0.25)',
              transition: 'all 0.3s ease',
            }}>📄</div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em', color: isDarkMode ? '#f1f5f9' : '#111827', transition: 'color 0.3s ease' }}>
              简历分析
            </h3>
          </div>

          <div className="card hover-lift" style={{ 
            marginBottom: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
            border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.2)' : undefined,
            boxShadow: isDarkMode 
              ? '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
              : undefined,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
              boxShadow: isDarkMode ? '0 4px 20px rgba(59, 130, 246, 0.3)' : 'none',
            }} />
            <form onSubmit={handleResumeSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label className="label" style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.625rem', color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
                  简历片段
                </label>
                <textarea
                  className="textarea"
                  rows={5}
                  placeholder="请粘贴简历片段，如项目经历、实习经历等..."
                  value={pageState.resumeInterview.resumeText}
                  onChange={(e) => updateResumeInterviewState({ resumeText: e.target.value })}
                  style={{ 
                    minHeight: '140px', 
                    fontSize: '0.9375rem',
                    background: isDarkMode ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)' : undefined,
                    border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined,
                    color: isDarkMode ? '#e2e8f0' : undefined,
                    boxShadow: isDarkMode ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : undefined,
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  className="btn btn-accent hover-lift"
                  disabled={resumeLoading || !pageState.resumeInterview.resumeText}
                  style={{ flex: 1, borderRadius: '12px', fontWeight: '600' }}
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
                  className="btn btn-secondary hover-lift"
                  onClick={handleResumeReset}
                  disabled={resumeLoading}
                  style={{ borderRadius: '12px' }}
                >
                  <span>🔄</span>
                  <span>重置</span>
                </button>
              </div>
            </form>
          </div>

          {resumeError && (
            <div className="alert alert-error fade-in" style={{ marginBottom: '1rem', borderRadius: '12px', background: isDarkMode ? 'linear-gradient(145deg, #7f1d1d 0%, #991b1b 100%)' : undefined, border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.3)' : undefined, transition: 'all 0.3s ease' }}>
              <span style={{ fontSize: '1.25rem' }}>⚠️</span>
              <div>
                <strong style={{ color: isDarkMode ? '#fca5a5' : undefined }}>分析失败</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: isDarkMode ? '#fecaca' : undefined }}>{resumeError}</p>
              </div>
            </div>
          )}

          {pageState.resumeInterview.resumeResult && typeof pageState.resumeInterview.resumeResult === 'object' && (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div className="card hover-lift" style={{ 
                borderLeft: '4px solid #3b82f6',
                position: 'relative',
                overflow: 'hidden',
                background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
                border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.2)' : undefined,
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: isDarkMode 
                    ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' 
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                }} />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.875rem',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    boxShadow: isDarkMode ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
                  }}>🔍</div>
                  <h4 style={{ margin: 0, fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#111827', fontSize: '1rem', transition: 'color 0.3s ease' }}>
                    诊断
                  </h4>
                </div>
                <p style={{ color: isDarkMode ? '#cbd5e1' : '#4b5563', lineHeight: '1.75', margin: 0, fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
                  {typeof pageState.resumeInterview.resumeResult.diagnosis === 'string' ? pageState.resumeInterview.resumeResult.diagnosis : '暂无诊断结果'}
                </p>
              </div>
              
              <div className="card hover-lift" style={{ 
                borderLeft: '4px solid #10b981',
                position: 'relative',
                overflow: 'hidden',
                background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
                border: isDarkMode ? '1px solid rgba(16, 185, 129, 0.2)' : undefined,
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: isDarkMode 
                    ? 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)' 
                    : 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                }} />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.875rem',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    boxShadow: isDarkMode ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
                  }}>✨</div>
                  <h4 style={{ margin: 0, fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#111827', fontSize: '1rem', transition: 'color 0.3s ease' }}>
                    改写建议
                  </h4>
                </div>
                <p style={{ color: isDarkMode ? '#cbd5e1' : '#4b5563', lineHeight: '1.75', margin: 0, fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
                  {typeof pageState.resumeInterview.resumeResult.rewriteSuggestions === 'string' ? pageState.resumeInterview.resumeResult.rewriteSuggestions : '暂无改写建议'}
                </p>
              </div>
              
              <div>
                <button
                  type="button"
                  className="btn btn-secondary hover-lift"
                  onClick={() => saveResumeToLocal(pageState.resumeInterview.resumeResult)}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', fontWeight: '600' }}
                >
                  <span>💾</span>
                  <span>保存到本地</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Interview Simulation Section */}
        <div className="fade-in">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.125rem',
              boxShadow: isDarkMode 
                ? '0 4px 16px rgba(139, 92, 246, 0.4)' 
                : '0 4px 12px rgba(139, 92, 246, 0.25)',
              transition: 'all 0.3s ease',
            }}>💬</div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em', color: isDarkMode ? '#f1f5f9' : '#111827', transition: 'color 0.3s ease' }}>
              面试模拟
            </h3>
          </div>

          <div className="card hover-lift" style={{ 
            marginBottom: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
            border: isDarkMode ? '1px solid rgba(139, 92, 246, 0.2)' : undefined,
            boxShadow: isDarkMode 
              ? '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
              : undefined,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
              boxShadow: isDarkMode ? '0 4px 20px rgba(139, 92, 246, 0.3)' : 'none',
            }} />
            <form onSubmit={handleInterviewSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label className="label" style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.625rem', color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
                  面试问题
                </label>
                <textarea
                  className="textarea"
                  rows={3}
                  placeholder="请输入面试问题，如：请介绍一下你的项目经历..."
                  value={pageState.resumeInterview.interviewQuestion}
                  onChange={(e) => updateResumeInterviewState({ interviewQuestion: e.target.value })}
                  style={{ 
                    minHeight: '80px', 
                    fontSize: '0.9375rem',
                    background: isDarkMode ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)' : undefined,
                    border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined,
                    color: isDarkMode ? '#e2e8f0' : undefined,
                    boxShadow: isDarkMode ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : undefined,
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="label" style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.625rem', color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
                  你的回答
                </label>
                <textarea
                  className="textarea"
                  rows={4}
                  placeholder="请输入你的回答..."
                  value={pageState.resumeInterview.interviewAnswer}
                  onChange={(e) => updateResumeInterviewState({ interviewAnswer: e.target.value })}
                  style={{ 
                    minHeight: '100px', 
                    fontSize: '0.9375rem',
                    background: isDarkMode ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)' : undefined,
                    border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined,
                    color: isDarkMode ? '#e2e8f0' : undefined,
                    boxShadow: isDarkMode ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : undefined,
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="label" style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.625rem', color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
                  岗位类型 <span style={{ color: isDarkMode ? '#64748b' : '#9ca3af', fontWeight: '400' }}>(可选)</span>
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="如：产品经理、市场营销"
                  value={pageState.resumeInterview.jobType}
                  onChange={(e) => updateResumeInterviewState({ jobType: e.target.value })}
                  style={{ 
                    fontSize: '0.9375rem',
                    background: isDarkMode ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)' : undefined,
                    border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined,
                    color: isDarkMode ? '#e2e8f0' : undefined,
                    boxShadow: isDarkMode ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : undefined,
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary hover-lift"
                  disabled={interviewLoading || !pageState.resumeInterview.interviewQuestion || !pageState.resumeInterview.interviewAnswer}
                  style={{ flex: 1, borderRadius: '12px', fontWeight: '600' }}
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
                  className="btn btn-secondary hover-lift"
                  onClick={handleInterviewReset}
                  disabled={interviewLoading}
                  style={{ borderRadius: '12px' }}
                >
                  <span>🔄</span>
                  <span>重置</span>
                </button>
              </div>
            </form>
          </div>

          {interviewError && (
            <div className="alert alert-error fade-in" style={{ marginBottom: '1rem', borderRadius: '12px', background: isDarkMode ? 'linear-gradient(145deg, #7f1d1d 0%, #991b1b 100%)' : undefined, border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.3)' : undefined, transition: 'all 0.3s ease' }}>
              <span style={{ fontSize: '1.25rem' }}>⚠️</span>
              <div>
                <strong style={{ color: isDarkMode ? '#fca5a5' : undefined }}>生成失败</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: isDarkMode ? '#fecaca' : undefined }}>{interviewError}</p>
              </div>
            </div>
          )}

          {pageState.resumeInterview.interviewResult && (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div className="card hover-lift" style={{ 
                borderLeft: '4px solid #f59e0b',
                position: 'relative',
                overflow: 'hidden',
                background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
                border: isDarkMode ? '1px solid rgba(245, 158, 11, 0.2)' : undefined,
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: isDarkMode 
                    ? 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)' 
                    : 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                }} />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.875rem',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    boxShadow: isDarkMode ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none',
                  }}>📊</div>
                  <h4 style={{ margin: 0, fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#111827', fontSize: '1rem', transition: 'color 0.3s ease' }}>
                    评价
                  </h4>
                </div>
                <p style={{ color: isDarkMode ? '#cbd5e1' : '#4b5563', lineHeight: '1.75', margin: 0, fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
                  {pageState.resumeInterview.interviewResult.evaluation || '暂无评价'}
                </p>
              </div>
              
              <div className="card hover-lift" style={{ 
                borderLeft: '4px solid #3b82f6',
                position: 'relative',
                overflow: 'hidden',
                background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
                border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.2)' : undefined,
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: isDarkMode 
                    ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' 
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                }} />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.875rem',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    boxShadow: isDarkMode ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
                  }}>💡</div>
                  <h4 style={{ margin: 0, fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#111827', fontSize: '1rem', transition: 'color 0.3s ease' }}>
                    改进建议
                  </h4>
                </div>
                <p style={{ color: isDarkMode ? '#cbd5e1' : '#4b5563', lineHeight: '1.75', margin: 0, fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
                  {pageState.resumeInterview.interviewResult.suggestions || '暂无改进建议'}
                </p>
              </div>
              
              <div className="card hover-lift" style={{ 
                borderLeft: '4px solid #10b981',
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' 
                  : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-20%',
                  right: '-10%',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: isDarkMode 
                    ? 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)' 
                    : 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
                }} />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.875rem',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    boxShadow: isDarkMode ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
                  }}>⭐</div>
                  <h4 style={{ margin: 0, fontWeight: '600', color: isDarkMode ? '#34d399' : '#065f46', fontSize: '1rem', transition: 'color 0.3s ease' }}>
                    更好的回答示例
                  </h4>
                </div>
                <p style={{ color: isDarkMode ? '#6ee7b7' : '#047857', lineHeight: '1.75', margin: 0, fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
                  {pageState.resumeInterview.interviewResult.betterAnswer || '暂无回答示例'}
                </p>
              </div>
              
              <div>
                <button
                  type="button"
                  className="btn btn-secondary hover-lift"
                  onClick={() => saveInterviewToLocal(pageState.resumeInterview.interviewResult)}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', fontWeight: '600' }}
                >
                  <span>💾</span>
                  <span>保存到本地</span>
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
