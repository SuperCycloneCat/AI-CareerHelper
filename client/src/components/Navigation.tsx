import React from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'workflow', label: '全链路工作流', icon: '🚀' },
    { id: 'job-major', label: '岗位专业匹配', icon: '🎓' },
    { id: 'job-translator', label: '岗位翻译器', icon: '💼' },
    { id: 'action-planner', label: '行动规划师', icon: '📋' },
    { id: 'resume-interview', label: '简历面试教练', icon: '🎯' },
    { id: 'api-config', label: 'API配置', icon: '🔧' },
    { id: 'about', label: '关于', icon: 'ℹ️' },
  ];

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.25)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(10px)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              🎓
            </div>
            <div>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'white',
                margin: 0,
                letterSpacing: '-0.025em',
              }}>
                AI职场行动教练
              </h1>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0,
              }}>
                从岗位解读到简历面试全链路AI化
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.375rem',
            borderRadius: '12px',
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                style={{
                  padding: '0.625rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: activeTab === tab.id 
                    ? 'white' 
                    : 'transparent',
                  color: activeTab === tab.id 
                    ? '#2563eb' 
                    : 'rgba(255, 255, 255, 0.9)',
                  boxShadow: activeTab === tab.id 
                    ? '0 2px 8px rgba(0, 0, 0, 0.15)' 
                    : 'none',
                }}
              >
                <span style={{ fontSize: '1rem' }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;