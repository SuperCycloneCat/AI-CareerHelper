import React, { useState } from 'react';
import axios from 'axios';
import { ModelConfig } from '../App';
import { usePageState } from '../context/PageStateContext';

interface JobTranslatorPageProps {
  modelConfig: ModelConfig;
  onTabChange: (tabId: string) => void;
}

const JobTranslatorPage: React.FC<JobTranslatorPageProps> = ({ modelConfig, onTabChange }) => {
  const { pageState, updateJobTranslatorState, syncDataToNextModule } = usePageState();
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
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
          }}>
            💼
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>
              岗位翻译器
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9375rem' }}>
              深度解析岗位需求，助你精准定位
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSubmit}>
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
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || (!pageState.jobTranslator.jobDescription && !pageState.jobTranslator.jobLink)}
              style={{ flex: 1, padding: '1rem' }}
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
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={loading}
              style={{ padding: '1rem' }}
            >
              <span>🔄</span>
              <span>重置</span>
            </button>
          </div>
        </form>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <div>
            <strong>分析失败</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {pageState.jobTranslator.result && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{ fontSize: '1.25rem' }}>✨</span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
              分析结果
            </h3>
          </div>

          {/* Real Work Scenario */}
          <div className="card" style={{ marginBottom: '1rem', borderLeft: '4px solid #3b82f6' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{ fontSize: '1.25rem' }}>🏢</span>
              <h4 style={{ margin: 0, fontWeight: '600', color: '#111827' }}>
                真实工作场景
              </h4>
            </div>
            <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
              {pageState.jobTranslator.result.realWorkScenario}
            </p>
          </div>

          {/* Hard Skills */}
          <div className="card" style={{ marginBottom: '1rem', borderLeft: '4px solid #10b981' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{ fontSize: '1.25rem' }}>🛠️</span>
              <h4 style={{ margin: 0, fontWeight: '600', color: '#111827' }}>
                硬技能拆解
              </h4>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {pageState.jobTranslator.result.hardSkills.map((skill: string, index: number) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    background: '#ecfdf5',
                    color: '#065f46',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="card" style={{ marginBottom: '1rem', borderLeft: '4px solid #f59e0b' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{ fontSize: '1.25rem' }}>💡</span>
              <h4 style={{ margin: 0, fontWeight: '600', color: '#111827' }}>
                软技能拆解
              </h4>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {pageState.jobTranslator.result.softSkills.map((skill: string, index: number) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    background: '#fffbeb',
                    color: '#92400e',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Not Suitable For */}
          <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{ fontSize: '1.25rem' }}>🚫</span>
              <h4 style={{ margin: 0, fontWeight: '600', color: '#111827' }}>
                不适合什么样的人
              </h4>
            </div>
            <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
              {pageState.jobTranslator.result.notSuitableFor}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div style={{ 
            marginTop: '2rem', 
            display: 'flex', 
            gap: '1rem',
            flexDirection: 'column'
          }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => saveToLocal(pageState.jobTranslator.result)}
              style={{ width: '100%', padding: '0.875rem' }}
            >
              <span>💾</span>
              <span>保存到本地</span>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                syncDataToNextModule('job-translator');
                onTabChange('action-planner');
              }}
              style={{ width: '100%', padding: '0.875rem' }}
            >
              <span>➡️</span>
              <span>下一步：制定行动规划</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTranslatorPage;