import React, { useState } from 'react';
import axios from 'axios';
import { ModelConfig } from '../App';
import { usePageState } from '../context/PageStateContext';

interface ActionPlannerPageProps {
  modelConfig: ModelConfig;
  isDarkMode?: boolean;
}

const ActionPlannerPage: React.FC<ActionPlannerPageProps> = ({ modelConfig, isDarkMode = false }) => {
  const { pageState, updateActionPlannerState } = usePageState();
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
      setLoading(false);
    }
  };

  const saveToLocal = (data: any) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `action_plan_${timestamp}.json`;
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
    if (window.confirm('确定要重置所有内容吗？这将清除所有输入和生成的计划。')) {
      updateActionPlannerState({ 
        targetJob: '', 
        grade: '', 
        major: '', 
        result: null 
      });
    }
  };

  const monthColors = [
    { bg: isDarkMode ? 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)' : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '#3b82f6', icon: '1️⃣', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    { bg: isDarkMode ? 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '#10b981', icon: '2️⃣', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { bg: isDarkMode ? 'linear-gradient(135deg, #78350f 0%, #92400e 100%)' : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', border: '#f59e0b', icon: '3️⃣', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  ];

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
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
          }}>
            📋
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.025em', color: isDarkMode ? '#f1f5f9' : '#111827', transition: 'color 0.3s ease' }}>
              行动规划师
            </h2>
            <p style={{ margin: 0, color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '1rem', transition: 'color 0.3s ease' }}>
              定制个性化求职计划，步步为营
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="card fade-in hover-lift" style={{ 
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        background: isDarkMode ? '#1e293b' : undefined,
        border: isDarkMode ? '1px solid #334155' : undefined,
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
        }} />
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label" style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.625rem', color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
              目标岗位
            </label>
            <input
              type="text"
              className="input"
              placeholder="请输入目标岗位，如：产品经理、市场营销专员..."
              value={pageState.actionPlanner.targetJob}
              onChange={(e) => updateActionPlannerState({ targetJob: e.target.value })}
              style={{ fontSize: '0.9375rem', background: isDarkMode ? '#0f172a' : undefined, border: isDarkMode ? '1px solid #334155' : undefined, color: isDarkMode ? '#e2e8f0' : undefined, transition: 'all 0.3s ease' }}
            />
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            <div>
              <label className="label" style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.625rem', color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
                年级
              </label>
              <select
                className="select"
                value={pageState.actionPlanner.grade}
                onChange={(e) => updateActionPlannerState({ grade: e.target.value })}
                style={{ fontSize: '0.9375rem', background: isDarkMode ? '#0f172a' : undefined, border: isDarkMode ? '1px solid #334155' : undefined, color: isDarkMode ? '#e2e8f0' : undefined, transition: 'all 0.3s ease' }}
              >
                <option value="">请选择年级</option>
                <option value="大三">大三</option>
                <option value="大四">大四</option>
                <option value="应届毕业生">应届毕业生</option>
              </select>
            </div>
            
            <div>
              <label className="label" style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.625rem', color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
                专业
              </label>
              <input
                type="text"
                className="input"
                placeholder="请输入专业"
                value={pageState.actionPlanner.major}
                onChange={(e) => updateActionPlannerState({ major: e.target.value })}
                style={{ fontSize: '0.9375rem', background: isDarkMode ? '#0f172a' : undefined, border: isDarkMode ? '1px solid #334155' : undefined, color: isDarkMode ? '#e2e8f0' : undefined, transition: 'all 0.3s ease' }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              className="btn btn-success hover-lift"
              disabled={loading || !pageState.actionPlanner.targetJob || !pageState.actionPlanner.grade || !pageState.actionPlanner.major}
              style={{ flex: 1, padding: '1rem', fontSize: '1rem', fontWeight: '600', borderRadius: '12px' }}
            >
              {loading ? (
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
            <button
              type="button"
              className="btn btn-secondary hover-lift"
              onClick={handleReset}
              disabled={loading}
              style={{ padding: '1rem', fontSize: '1rem', borderRadius: '12px', background: isDarkMode ? '#334155' : undefined, border: isDarkMode ? '1px solid #475569' : undefined, color: isDarkMode ? '#e2e8f0' : undefined, transition: 'all 0.3s ease' }}
            >
              <span>🔄</span>
              <span>重置</span>
            </button>
          </div>
        </form>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error fade-in" style={{ marginBottom: '1.5rem', borderRadius: '12px', background: isDarkMode ? '#450a0a' : undefined, border: isDarkMode ? '1px solid #7f1d1d' : undefined, transition: 'all 0.3s ease' }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <div>
            <strong style={{ color: isDarkMode ? '#fca5a5' : undefined }}>生成失败</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: isDarkMode ? '#fecaca' : undefined }}>{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {pageState.actionPlanner.result && (
        <div className="fade-in">
          {/* Priority Skill */}
          <div className="card hover-lift" style={{ 
            marginBottom: '2.5rem', 
            background: isDarkMode ? 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            border: '2px solid #10b981',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
              }}>⚡</div>
              <h4 style={{ margin: 0, fontWeight: '700', color: isDarkMode ? '#6ee7b7' : '#065f46', fontSize: '1.25rem', transition: 'color 0.3s ease' }}>
                优先补充的能力
              </h4>
            </div>
            <p style={{ 
              color: isDarkMode ? '#34d399' : '#047857', 
              fontSize: '1.125rem', 
              fontWeight: '500',
              margin: 0,
              padding: '1rem',
              background: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              lineHeight: '1.7',
              transition: 'all 0.3s ease',
            }}>
              {pageState.actionPlanner.result.prioritySkill || '暂无优先能力建议'}
            </p>
          </div>

          {/* Phases */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{ fontSize: '1.5rem' }}>📅</span>
            <h3 style={{ margin: 0, fontSize: '1.375rem', fontWeight: '700', letterSpacing: '-0.025em', color: isDarkMode ? '#f1f5f9' : '#111827', transition: 'color 0.3s ease' }}>
              分阶段行动清单
            </h3>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {(pageState.actionPlanner.result.phases || []).map((phase: any, index: number) => (
              <div
                key={index}
                className="card hover-lift"
                style={{
                  borderLeft: `4px solid ${monthColors[index].border}`,
                  background: monthColors[index].bg,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-20%',
                  right: '-5%',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${monthColors[index].border}15 0%, transparent 70%)`,
                }} />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: monthColors[index].gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    boxShadow: `0 4px 12px ${monthColors[index].border}33`,
                  }}>{monthColors[index].icon}</div>
                  <h4 style={{ margin: 0, fontWeight: '700', color: isDarkMode ? '#f1f5f9' : '#111827', fontSize: '1.1875rem', transition: 'color 0.3s ease' }}>
                    第{index + 1}个月
                  </h4>
                </div>
                
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  display: 'grid',
                  gap: '0.875rem',
                }}>
                  {(phase.tasks || []).map((task: string, taskIndex: number) => (
                    <li
                      key={taskIndex}
                      className="hover-lift"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        padding: '1.125rem',
                        background: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: monthColors[index].gradient,
                        color: 'white',
                        fontSize: '0.8125rem',
                        fontWeight: '700',
                        flexShrink: 0,
                        boxShadow: `0 2px 8px ${monthColors[index].border}33`,
                      }}>
                        {taskIndex + 1}
                      </span>
                      <span style={{ color: isDarkMode ? '#cbd5e1' : '#374151', lineHeight: '1.6', fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Save Button */}
          <div style={{ marginTop: '2rem' }}>
            <button
              type="button"
              className="btn btn-secondary hover-lift"
              onClick={() => saveToLocal(pageState.actionPlanner.result)}
              style={{ width: '100%', padding: '1rem', fontSize: '0.9375rem', borderRadius: '12px', background: isDarkMode ? '#334155' : undefined, border: isDarkMode ? '1px solid #475569' : undefined, color: isDarkMode ? '#e2e8f0' : undefined, transition: 'all 0.3s ease' }}
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

export default ActionPlannerPage;