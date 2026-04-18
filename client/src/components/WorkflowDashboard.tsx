import React from 'react';
import { usePageState } from '../context/PageStateContext';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  inProgress: boolean;
}

const WorkflowDashboard: React.FC<{
  onTabChange: (tabId: string) => void;
}> = ({ onTabChange }) => {
  const { pageState, getRecommendations } = usePageState();
  const recommendations = getRecommendations();

  // 计算工作流步骤状态
  const steps: WorkflowStep[] = [
    {
      id: 'job-translator',
      title: '岗位分析',
      description: '分析岗位需求，了解技能要求',
      icon: '💼',
      completed: !!pageState.jobTranslator.result,
      inProgress: !!pageState.jobTranslator.jobDescription || !!pageState.jobTranslator.jobLink,
    },
    {
      id: 'action-planner',
      title: '行动规划',
      description: '制定个性化的求职行动计划',
      icon: '📋',
      completed: !!pageState.actionPlanner.result,
      inProgress: !!pageState.actionPlanner.targetJob,
    },
    {
      id: 'resume-interview',
      title: '简历面试',
      description: '优化简历，准备面试',
      icon: '🎯',
      completed: !!pageState.resumeInterview.resumeResult || !!pageState.resumeInterview.interviewResult,
      inProgress: !!pageState.resumeInterview.resumeText || !!pageState.resumeInterview.interviewQuestion,
    },
  ];

  // 计算整体进度
  const calculateProgress = () => {
    const totalSteps = steps.length;
    const completedSteps = steps.filter(step => step.completed).length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const progress = calculateProgress();

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem',
    }}>
      {/* 标题和进度 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
      }}>
        <div>
          <h3 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
          }}>
            求职准备工作流
          </h3>
          <p style={{
            margin: '0.5rem 0 0',
            color: '#6b7280',
            fontSize: '0.9375rem',
          }}>
            按照流程一步步完成，获得全链路AI指导
          </p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#3b82f6',
          }}>
            {progress}%
          </span>
          <span style={{
            fontSize: '0.875rem',
            color: '#6b7280',
          }}>
            完成进度
          </span>
        </div>
      </div>

      {/* 进度条 */}
      <div style={{
        height: '8px',
        background: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '2rem',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* 步骤列表 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              borderRadius: '12px',
              border: `2px solid ${step.completed ? '#10b981' : step.inProgress ? '#f59e0b' : '#e5e7eb'}`,
              background: step.completed 
                ? 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)' 
                : step.inProgress 
                ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' 
                : 'white',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onClick={() => onTabChange(step.id)}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                background: step.completed 
                  ? '#10b981' 
                  : step.inProgress 
                  ? '#f59e0b' 
                  : '#e5e7eb',
                color: step.completed || step.inProgress ? 'white' : '#6b7280',
                marginRight: '1rem',
              }}>
                {step.completed ? '✓' : step.icon}
              </div>
              <div>
                <h4 style={{
                  margin: 0,
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                }}>
                  {step.title}
                </h4>
                <p style={{
                  margin: '0.25rem 0 0',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                }}>
                  {step.description}
                </p>
              </div>
            </div>
            <div style={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #3b82f6',
                  background: 'white',
                  color: '#3b82f6',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onTabChange(step.id);
                }}
              >
                {step.completed ? '查看结果' : '开始'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 智能推荐 */}
      {progress < 100 && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: '12px',
          border: '1px solid #bfdbfe',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}>
            <span style={{
              fontSize: '1.25rem',
              marginRight: '0.75rem',
            }}>💡</span>
            <h4 style={{
              margin: 0,
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1e40af',
            }}>
              智能推荐
            </h4>
          </div>
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}>
            {recommendations.map((recommendation, index) => (
              <li key={index} style={{
                marginBottom: '0.75rem',
                color: '#1e3a8a',
                lineHeight: '1.6',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}>
                <span style={{
                  fontSize: '1rem',
                  marginTop: '0.25rem',
                  flexShrink: 0,
                }}>✨</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 完成提示 */}
      {progress === 100 && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          borderRadius: '12px',
          border: '1px solid #a7f3d0',
          textAlign: 'center',
        }}>
          <span style={{
            fontSize: '2rem',
            display: 'block',
            marginBottom: '1rem',
          }}>🎉</span>
          <h4 style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#065f46',
            marginBottom: '0.5rem',
          }}>
            恭喜！您已完成所有求职准备步骤
          </h4>
          <p style={{
            margin: 0,
            color: '#047857',
            lineHeight: '1.6',
          }}>
            您已经准备好了，可以自信地开始求职之旅了！
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkflowDashboard;