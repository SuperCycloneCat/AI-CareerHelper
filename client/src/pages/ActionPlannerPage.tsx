import React, { useState } from 'react';
import axios from 'axios';
import { ModelConfig } from '../App';
import { usePageState } from '../context/PageStateContext';

interface ActionPlannerPageProps {
  modelConfig: ModelConfig;
}

const ActionPlannerPage: React.FC<ActionPlannerPageProps> = ({ modelConfig }) => {
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

  const monthColors = [
    { bg: '#eff6ff', border: '#3b82f6', icon: '1️⃣' },
    { bg: '#ecfdf5', border: '#10b981', icon: '2️⃣' },
    { bg: '#fffbeb', border: '#f59e0b', icon: '3️⃣' },
  ];

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
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
          }}>
            📋
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>
              行动规划师
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9375rem' }}>
              定制个性化求职计划，步步为营
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSubmit}>
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
            disabled={loading || !pageState.actionPlanner.targetJob || !pageState.actionPlanner.grade || !pageState.actionPlanner.major}
            style={{ width: '100%', padding: '1rem' }}
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
        </form>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <div>
            <strong>生成失败</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {pageState.actionPlanner.result && (
        <div>
          {/* Priority Skill */}
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

          {/* Phases */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{ fontSize: '1.25rem' }}>📅</span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
              分阶段行动清单
            </h3>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {pageState.actionPlanner.result.phases.map((phase: any, index: number) => (
              <div
                key={index}
                className="card"
                style={{
                  borderLeft: `4px solid ${monthColors[index].border}`,
                  background: monthColors[index].bg,
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{monthColors[index].icon}</span>
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
                        background: monthColors[index].border,
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
          
          {/* Save Button */}
          <div style={{ marginTop: '2rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => saveToLocal(pageState.actionPlanner.result)}
              style={{ width: '100%', padding: '0.875rem' }}
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