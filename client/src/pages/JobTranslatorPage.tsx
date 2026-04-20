import React, { useState } from 'react';
import axios from 'axios';
import { ModelConfig } from '../App';
import { usePageState } from '../context/PageStateContext';

interface JobTranslatorPageProps {
  modelConfig: ModelConfig;
  isDarkMode?: boolean;
}

const JobTranslatorPage: React.FC<JobTranslatorPageProps> = ({ modelConfig, isDarkMode = false }) => {
  const { pageState, updateJobTranslatorState } = usePageState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!modelConfig.apiKey) {
      setError('请先配置API密钥');
      setLoading(false);
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
      setLoading(false);
    }
  };

  const saveToLocal = (data: any) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `job_translation_${timestamp}.json`;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (window.confirm('确定要重置所有内容吗？这将清除所有输入和分析结果。')) {
      updateJobTranslatorState({ 
        jobDescription: '', 
        jobLink: '', 
        result: null 
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
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: isDarkMode 
              ? '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
              : '0 8px 24px rgba(59, 130, 246, 0.3)',
          }}>
            💼
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.025em', color: isDarkMode ? '#f1f5f9' : '#111827', transition: 'color 0.3s ease' }}>
              岗位翻译器
            </h2>
            <p style={{ margin: 0, color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '1rem', transition: 'color 0.3s ease' }}>
              深度解析岗位需求，助你精准定位职业方向
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="card fade-in hover-lift" style={{ 
        marginBottom: '2rem',
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
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label" style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.625rem', color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
              岗位描述
            </label>
            <textarea
              className="textarea"
              rows={6}
              placeholder="请粘贴岗位描述（JD）文本，包括岗位职责、任职要求等内容..."
              value={pageState.jobTranslator.jobDescription}
              onChange={(e) => updateJobTranslatorState({ jobDescription: e.target.value })}
              style={{ 
                minHeight: '160px', 
                fontSize: '0.9375rem', 
                background: isDarkMode ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)' : undefined, 
                border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined, 
                color: isDarkMode ? '#e2e8f0' : undefined, 
                boxShadow: isDarkMode ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : undefined,
                transition: 'all 0.3s ease' 
              }}
            />
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '1.5rem',
            color: isDarkMode ? '#64748b' : '#9ca3af',
            fontSize: '0.875rem',
            transition: 'color 0.3s ease',
          }}>
            <div style={{ 
              flex: 1, 
              height: '1px', 
              background: isDarkMode ? 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)' : 'linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%)',
              transition: 'background 0.3s ease',
            }} />
            <span style={{ fontWeight: '500' }}>或者</span>
            <div style={{ 
              flex: 1, 
              height: '1px', 
              background: isDarkMode ? 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)' : 'linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%)',
              transition: 'background 0.3s ease',
            }} />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label" style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.625rem', color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
              岗位链接
            </label>
            <input
              type="url"
              className="input"
              placeholder="请输入招聘网站上的岗位链接..."
              value={pageState.jobTranslator.jobLink}
              onChange={(e) => updateJobTranslatorState({ jobLink: e.target.value })}
              style={{ 
                fontSize: '0.9375rem', 
                background: isDarkMode ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)' : undefined, 
                border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined, 
                color: isDarkMode ? '#e2e8f0' : undefined,
                boxShadow: isDarkMode ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : undefined,
                transition: 'all 0.3s ease' 
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              className="btn btn-primary hover-lift"
              disabled={loading || (!pageState.jobTranslator.jobDescription && !pageState.jobTranslator.jobLink)}
              style={{ flex: 1, padding: '1rem', fontSize: '1rem', fontWeight: '600', borderRadius: '12px' }}
            >
              {loading ? (
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
            <button
              type="button"
              className="btn btn-secondary hover-lift"
              onClick={handleReset}
              disabled={loading}
              style={{ 
                padding: '1rem', 
                fontSize: '1rem', 
                borderRadius: '12px', 
                background: isDarkMode ? 'linear-gradient(145deg, #334155 0%, #1e293b 100%)' : undefined, 
                border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined, 
                color: isDarkMode ? '#e2e8f0' : undefined, 
                boxShadow: isDarkMode ? '0 2px 8px rgba(0, 0, 0, 0.3)' : undefined,
                transition: 'all 0.3s ease' 
              }}
            >
              <span>🔄</span>
              <span>重置</span>
            </button>
          </div>
        </form>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error fade-in" style={{ 
          marginBottom: '1.5rem', 
          borderRadius: '12px', 
          background: isDarkMode ? 'linear-gradient(145deg, #450a0a 0%, #7f1d1d 100%)' : undefined, 
          border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.3)' : undefined, 
          boxShadow: isDarkMode ? '0 4px 16px rgba(239, 68, 68, 0.2)' : undefined,
          transition: 'all 0.3s ease' 
        }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <div>
            <strong style={{ color: isDarkMode ? '#fca5a5' : undefined }}>分析失败</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: isDarkMode ? '#fecaca' : undefined }}>{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {pageState.jobTranslator.result && (
        <div className="fade-in">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{ fontSize: '1.5rem' }}>✨</span>
            <h3 style={{ margin: 0, fontSize: '1.375rem', fontWeight: '700', letterSpacing: '-0.025em', color: isDarkMode ? '#f1f5f9' : '#111827', transition: 'color 0.3s ease' }}>
              分析结果
            </h3>
          </div>

          {/* Real Work Scenario */}
          <div className="card hover-lift" style={{ 
            marginBottom: '1rem', 
            borderLeft: '4px solid #3b82f6',
            position: 'relative',
            overflow: 'hidden',
            background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
            border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.2)' : undefined,
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
              : undefined,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
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
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.125rem',
                boxShadow: isDarkMode ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
              }}>🏢</div>
              <h4 style={{ margin: 0, fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#111827', fontSize: '1.0625rem', transition: 'color 0.3s ease' }}>
                真实工作场景
              </h4>
            </div>
            <p style={{ color: isDarkMode ? '#94a3b8' : '#4b5563', lineHeight: '1.75', margin: 0, fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
              {pageState.jobTranslator.result.realWorkScenario || '暂无工作场景信息'}
            </p>
          </div>

          {/* Hard Skills */}
          <div className="card hover-lift" style={{ 
            marginBottom: '1rem', 
            borderLeft: '4px solid #10b981',
            position: 'relative',
            overflow: 'hidden',
            background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
            border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.2)' : undefined,
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
              : undefined,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: isDarkMode 
                ? 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)' 
                : 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.875rem',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.125rem',
                boxShadow: isDarkMode ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none',
              }}>🛠️</div>
              <h4 style={{ margin: 0, fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#111827', fontSize: '1.0625rem', transition: 'color 0.3s ease' }}>
                硬技能拆解
              </h4>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {(pageState.jobTranslator.result.hardSkills || []).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="hover-lift"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    background: isDarkMode ? 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                    color: isDarkMode ? '#6ee7b7' : '#065f46',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid #a7f3d0',
                    boxShadow: isDarkMode ? '0 2px 8px rgba(34, 197, 94, 0.2)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="card hover-lift" style={{ 
            marginBottom: '1rem', 
            borderLeft: '4px solid #f59e0b',
            position: 'relative',
            overflow: 'hidden',
            background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
            border: isDarkMode ? '1px solid rgba(251, 191, 36, 0.2)' : undefined,
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
              : undefined,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: isDarkMode 
                ? 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)' 
                : 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.875rem',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.125rem',
                boxShadow: isDarkMode ? '0 4px 12px rgba(251, 191, 36, 0.3)' : 'none',
              }}>💡</div>
              <h4 style={{ margin: 0, fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#111827', fontSize: '1.0625rem', transition: 'color 0.3s ease' }}>
                软技能拆解
              </h4>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {(pageState.jobTranslator.result.softSkills || []).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="hover-lift"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    background: isDarkMode ? 'linear-gradient(135deg, #78350f 0%, #92400e 100%)' : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                    color: isDarkMode ? '#fcd34d' : '#92400e',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    border: isDarkMode ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid #fde68a',
                    boxShadow: isDarkMode ? '0 2px 8px rgba(251, 191, 36, 0.2)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Not Suitable For */}
          <div className="card hover-lift" style={{ 
            borderLeft: '4px solid #ef4444',
            position: 'relative',
            overflow: 'hidden',
            background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
            border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.2)' : undefined,
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
              : undefined,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: isDarkMode 
                ? 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)' 
                : 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.875rem',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.125rem',
                boxShadow: isDarkMode ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 'none',
              }}>🚫</div>
              <h4 style={{ margin: 0, fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#111827', fontSize: '1.0625rem', transition: 'color 0.3s ease' }}>
                不适合什么样的人
              </h4>
            </div>
            <p style={{ color: isDarkMode ? '#94a3b8' : '#4b5563', lineHeight: '1.75', margin: 0, fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
              {pageState.jobTranslator.result.notSuitableFor || '暂无相关信息'}
            </p>
          </div>
          
          {/* Save Button */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary hover-lift"
              onClick={() => saveToLocal(pageState.jobTranslator.result)}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                fontSize: '0.9375rem', 
                borderRadius: '12px', 
                background: isDarkMode ? 'linear-gradient(145deg, #334155 0%, #1e293b 100%)' : undefined, 
                border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined, 
                color: isDarkMode ? '#e2e8f0' : undefined,
                boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : undefined,
                transition: 'all 0.3s ease' 
              }}
            >
              <span>💾</span>
              <span>保存到本地</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTranslatorPage;
