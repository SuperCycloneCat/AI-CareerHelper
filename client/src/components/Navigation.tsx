import React from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, isDarkMode = false, onToggleTheme }) => {
  const tabs = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'job-major', label: '岗位专业匹配', icon: '🎓' },
    { id: 'job-translator', label: '岗位翻译器', icon: '💼' },
    { id: 'action-planner', label: '行动规划师', icon: '📋' },
    { id: 'resume-interview', label: '简历面试教练', icon: '🎯' },
    { id: 'api-config', label: 'API配置', icon: '🔧' },
    { id: 'about', label: '关于', icon: 'ℹ️' },
  ];

  return (
    <nav style={{
      background: isDarkMode 
        ? 'linear-gradient(135deg, rgba(10, 15, 26, 0.98) 0%, rgba(15, 23, 42, 0.98) 50%, rgba(30, 41, 59, 0.98) 100%)' 
        : 'linear-gradient(135deg, rgba(30, 64, 175, 0.95) 0%, rgba(59, 130, 246, 0.95) 100%)',
      boxShadow: isDarkMode 
        ? '0 4px 30px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.05) inset' 
        : '0 4px 30px rgba(0, 0, 0, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.875rem 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              boxShadow: isDarkMode 
                ? '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                : '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
              transition: 'all 0.3s ease',
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
                textShadow: isDarkMode 
                  ? '0 0 20px rgba(59, 130, 246, 0.5)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'text-shadow 0.3s ease',
              }}>
                AI职场行动教练
              </h1>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.85)',
                margin: 0,
                fontWeight: '400',
              }}>
                从岗位解读到简历面试全链路AI化
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              display: 'flex',
              gap: '0.375rem',
              background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)' 
                : 'rgba(255, 255, 255, 0.1)',
              padding: '0.375rem',
              borderRadius: '14px',
              border: `1px solid ${isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
              transition: 'all 0.3s ease',
              boxShadow: isDarkMode ? 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' : 'none',
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  style={{
                    padding: '0.625rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.8125rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: activeTab === tab.id 
                      ? (isDarkMode 
                          ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
                          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)')
                      : 'transparent',
                    color: activeTab === tab.id 
                      ? (isDarkMode ? '#ffffff' : '#2563eb')
                      : 'rgba(255, 255, 255, 0.9)',
                    boxShadow: activeTab === tab.id 
                      ? (isDarkMode 
                          ? '0 4px 16px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                          : '0 4px 12px rgba(0, 0, 0, 0.15)')
                      : 'none',
                    transform: activeTab === tab.id ? 'scale(1.02)' : 'scale(1)',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = isDarkMode 
                        ? 'rgba(59, 130, 246, 0.2)' 
                        : 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                style={{
                  width: '64px',
                  height: '34px',
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' 
                    : 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                  borderRadius: '17px',
                  border: isDarkMode 
                    ? '1px solid rgba(59, 130, 246, 0.4)' 
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isDarkMode 
                    ? '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}
                aria-label={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
              >
                <span style={{
                  position: 'absolute',
                  top: '3px',
                  left: isDarkMode ? '32px' : '3px',
                  width: '26px',
                  height: '26px',
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)' 
                    : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  borderRadius: '50%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isDarkMode 
                    ? '0 2px 8px rgba(139, 92, 246, 0.5)' 
                    : '0 2px 8px rgba(251, 191, 36, 0.5)',
                }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    fontSize: '14px',
                  }}>
                    {isDarkMode ? '🌙' : '☀️'}
                  </span>
                </span>
                <span style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: isDarkMode ? '8px' : 'auto',
                  right: isDarkMode ? 'auto' : '8px',
                  fontSize: '12px',
                  opacity: isDarkMode ? 0.6 : 0.6,
                  transition: 'all 0.3s ease',
                }}>
                  {isDarkMode ? '☀️' : '🌙'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
