import React from 'react';

interface HomePageProps {
  onTabChange: (tab: string) => void;
  isDarkMode?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onTabChange, isDarkMode = false }) => {
  const features = [
    {
      icon: '💼',
      title: '岗位翻译器',
      description: '输入JD文本或链接，获取真实工作场景、技能拆解和适配性分析',
      color: isDarkMode ? '#60a5fa' : '#3b82f6',
      bgColor: isDarkMode ? 'linear-gradient(145deg, #1e3a5f 0%, #0f172a 100%)' : '#eff6ff',
      borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.4)' : '#bfdbfe',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      glowColor: 'rgba(59, 130, 246, 0.3)',
    },
    {
      icon: '📋',
      title: '行动规划师',
      description: '输入目标岗位和个人信息，获取1-3个月分阶段行动清单',
      color: isDarkMode ? '#4ade80' : '#10b981',
      bgColor: isDarkMode ? 'linear-gradient(145deg, #064e3b 0%, #022c22 100%)' : '#ecfdf5',
      borderColor: isDarkMode ? 'rgba(34, 197, 94, 0.4)' : '#a7f3d0',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      glowColor: 'rgba(34, 197, 94, 0.3)',
    },
    {
      icon: '🎯',
      title: '简历面试教练',
      description: '分析简历并提供改写建议，模拟面试并给出改进意见',
      color: isDarkMode ? '#fbbf24' : '#f59e0b',
      bgColor: isDarkMode ? 'linear-gradient(145deg, #78350f 0%, #451a03 100%)' : '#fffbeb',
      borderColor: isDarkMode ? 'rgba(251, 191, 36, 0.4)' : '#fde68a',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      glowColor: 'rgba(251, 191, 36, 0.3)',
    },
  ];

  const targetUsers = [
    { icon: '👨‍🎓', text: '大三、大四学生', delay: '0.1s' },
    { icon: '🎓', text: '应届毕业生', delay: '0.2s' },
    { icon: '💼', text: '非技术岗求职者', delay: '0.3s' },
    { icon: '🔄', text: '跨专业求职学生', delay: '0.4s' },
  ];

  const stats = [
    { number: '100%', label: '免费使用', icon: '🎁' },
    { number: '24/7', label: '全天候服务', icon: '⏰' },
    { number: 'AI', label: '智能分析', icon: '🤖' },
    { number: '∞', label: '无限次使用', icon: '♾️' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        padding: '4rem 2rem',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0a0f1a 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #0a0f1a 100%)' 
          : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #e0e7ff 100%)',
        borderRadius: '32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isDarkMode 
          ? '0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
          : '0 8px 40px rgba(0, 0, 0, 0.08)',
        border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.15)' : 'none',
      }}>
        {/* Animated Background Blobs */}
        <div className="blob" style={{
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)' 
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%)',
          animationDelay: '0s',
        }} />
        <div className="blob" style={{
          bottom: '-20%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.08) 100%)' 
            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)',
          animationDelay: '2s',
        }} />
        <div className="blob" style={{
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.06) 100%)' 
            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(251, 191, 36, 0.3) 100%)',
          animationDelay: '4s',
        }} />
        
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)' 
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
          animation: 'float 6s ease-in-out infinite',
          boxShadow: isDarkMode ? '0 0 30px rgba(59, 130, 246, 0.2)' : 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%)' 
            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
          animation: 'float 5s ease-in-out infinite',
          animationDelay: '1s',
          boxShadow: isDarkMode ? '0 0 20px rgba(34, 197, 94, 0.2)' : 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)' 
            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)',
          animation: 'float 4s ease-in-out infinite',
          animationDelay: '2s',
          boxShadow: isDarkMode ? '0 0 15px rgba(251, 191, 36, 0.2)' : 'none',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="fade-in" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            background: isDarkMode 
              ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)' 
              : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '9999px',
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
              : '0 4px 16px rgba(0, 0, 0, 0.08)',
            marginBottom: '2rem',
            fontSize: '0.9375rem',
            color: isDarkMode ? '#94a3b8' : '#6b7280',
            backdropFilter: 'blur(10px)',
            border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid rgba(255, 255, 255, 0.5)',
            transition: 'all 0.3s ease',
          }}>
            <span style={{ 
              color: isDarkMode ? '#60a5fa' : '#3b82f6',
              animation: 'pulse 2s ease-in-out infinite',
            }}>✨</span>
            为求职者打造的智能助手
            <span style={{ 
              color: isDarkMode ? '#4ade80' : '#10b981',
              animation: 'pulse 2s ease-in-out infinite',
              animationDelay: '0.5s',
            }}>🚀</span>
          </div>
          
          <h1 className="fade-in" style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            color: isDarkMode 
              ? '#f1f5f9' 
              : 'transparent',
            background: isDarkMode 
              ? 'none' 
              : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #6366f1 50%, #8b5cf6 75%, #a855f7 100%)',
            WebkitBackgroundClip: isDarkMode ? 'unset' : 'text',
            WebkitTextFillColor: isDarkMode ? '#f1f5f9' : 'transparent',
            backgroundClip: isDarkMode ? 'unset' : 'text',
            letterSpacing: '-0.025em',
            lineHeight: '1.2',
            textShadow: isDarkMode ? '0 0 40px rgba(96, 165, 250, 0.3)' : 'none',
            transition: 'all 0.3s ease',
          }}>
            AI职场行动教练
          </h1>
          
          <p className="fade-in" style={{
            fontSize: '1.375rem',
            color: isDarkMode ? '#94a3b8' : '#4b5563',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.8',
            fontWeight: '400',
            transition: 'color 0.3s ease',
          }}>
            从岗位解读到简历面试全链路AI化<br />
            让你的求职之路更加清晰、高效、专业
          </p>
          
          <div className="fade-in" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}>
            <button 
              className="btn btn-primary hover-lift" 
              style={{ 
                fontSize: '1.0625rem', 
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                fontWeight: '600',
                boxShadow: isDarkMode 
                  ? '0 8px 24px rgba(59, 130, 246, 0.4)' 
                  : '0 8px 24px rgba(59, 130, 246, 0.3)',
              }}
              onClick={() => onTabChange('job-translator')}
            >
              🚀 立即开始
            </button>
            <button 
              className="btn btn-secondary hover-lift" 
              style={{ 
                fontSize: '1.0625rem', 
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                fontWeight: '600',
                background: isDarkMode 
                  ? 'linear-gradient(145deg, #334155 0%, #1e293b 100%)' 
                  : 'white',
                border: `2px solid ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : '#e5e7eb'}`,
                color: isDarkMode ? '#e2e8f0' : '#374151',
                boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : 'none',
                transition: 'all 0.3s ease',
              }}
              onClick={() => onTabChange('about')}
            >
              📖 了解更多
            </button>
          </div>

          {/* Stats Section */}
          <div className="fade-in" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
                    : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  padding: '1.5rem 1rem',
                  borderRadius: '16px',
                  border: isDarkMode 
                    ? '1px solid rgba(59, 130, 246, 0.2)' 
                    : '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: isDarkMode 
                    ? '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
                    : '0 4px 16px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: isDarkMode ? '#60a5fa' : '#1e40af',
                  marginBottom: '0.25rem',
                  transition: 'color 0.3s ease',
                  textShadow: isDarkMode ? '0 0 20px rgba(96, 165, 250, 0.3)' : 'none',
                }}>{stat.number}</div>
                <div style={{
                  fontSize: '0.875rem',
                  color: isDarkMode ? '#94a3b8' : '#6b7280',
                  fontWeight: '500',
                  transition: 'color 0.3s ease',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="fade-in" style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: isDarkMode ? '#f1f5f9' : '#111827',
            marginBottom: '1rem',
            letterSpacing: '-0.025em',
            transition: 'color 0.3s ease',
          }}>
            三大核心功能
          </h2>
          <p className="fade-in" style={{ 
            color: isDarkMode ? '#94a3b8' : '#6b7280', 
            fontSize: '1.125rem', 
            maxWidth: '600px', 
            margin: '0 auto',
            transition: 'color 0.3s ease',
          }}>
            全方位助力你的求职之旅，让每一步都更加清晰
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="hover-lift fade-in"
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
                  : 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: isDarkMode 
                  ? '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: `2px solid ${feature.borderColor}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => {
                if (feature.title === '岗位翻译器') onTabChange('job-translator');
                else if (feature.title === '行动规划师') onTabChange('action-planner');
                else if (feature.title === '简历面试教练') onTabChange('resume-interview');
              }}
            >
              {/* Decorative gradient overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: feature.gradient,
                boxShadow: isDarkMode ? `0 4px 20px ${feature.glowColor}` : 'none',
              }} />
              
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: feature.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                boxShadow: isDarkMode 
                  ? `0 8px 32px ${feature.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.2)` 
                  : `0 8px 24px ${feature.color}33`,
              }}>
                {feature.icon}
              </div>
              
              <h3 style={{
                fontSize: '1.375rem',
                fontWeight: '600',
                color: isDarkMode ? '#f1f5f9' : '#111827',
                marginBottom: '1rem',
                letterSpacing: '-0.025em',
                transition: 'color 0.3s ease',
              }}>
                {feature.title}
              </h3>
              
              <p style={{
                color: isDarkMode ? '#94a3b8' : '#6b7280',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
              }}>
                {feature.description}
              </p>
              
              <div style={{
                padding: '1.25rem',
                background: feature.bgColor,
                borderRadius: '12px',
                fontSize: '0.9375rem',
                color: feature.color,
                fontWeight: '500',
                border: `1px solid ${feature.borderColor}`,
                transition: 'all 0.3s ease',
                boxShadow: isDarkMode ? 'inset 0 1px 2px rgba(0, 0, 0, 0.2)' : 'none',
              }}>
                💡 帮助你理解岗位真实需求，避免盲目投递
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Users Section */}
      <div style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #1c1917 0%, #292524 25%, #1c1917 50%, #292524 75%, #1c1917 100%)' 
          : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
        borderRadius: '24px',
        padding: '3rem',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isDarkMode 
          ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03)' 
          : 'none',
        border: isDarkMode ? '1px solid rgba(251, 191, 36, 0.15)' : 'none',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
        }} />
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <h3 className="fade-in" style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: isDarkMode ? '#fbbf24' : '#92400e',
            marginBottom: '0.75rem',
            letterSpacing: '-0.025em',
            transition: 'color 0.3s ease',
            textShadow: isDarkMode ? '0 0 20px rgba(251, 191, 36, 0.3)' : 'none',
          }}>
            🎯 目标人群
          </h3>
          <p className="fade-in" style={{ 
            color: isDarkMode ? '#fcd34d' : '#b45309', 
            fontSize: '1.0625rem',
            transition: 'color 0.3s ease',
          }}>
            专为以下群体精心设计
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {targetUsers.map((user, index) => (
            <div
              key={index}
              className="fade-in hover-lift"
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '1.5rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: isDarkMode 
                  ? '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
                  : '0 4px 16px rgba(0, 0, 0, 0.08)',
                border: isDarkMode 
                  ? '1px solid rgba(251, 191, 36, 0.15)' 
                  : '1px solid rgba(255, 255, 255, 0.5)',
                animationDelay: user.delay,
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ fontSize: '2rem' }}>{user.icon}</span>
              <span style={{ 
                fontWeight: '600', 
                color: isDarkMode ? '#e2e8f0' : '#374151', 
                fontSize: '1rem',
                transition: 'color 0.3s ease',
              }}>{user.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="fade-in" style={{
        textAlign: 'center',
        padding: '3rem',
        background: isDarkMode 
          ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '24px',
        boxShadow: isDarkMode 
          ? '0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
          : '0 8px 32px rgba(0, 0, 0, 0.08)',
        border: `1px solid ${isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#e5e7eb'}`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Decorative gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 50%, #f59e0b 100%)',
          boxShadow: isDarkMode ? '0 4px 20px rgba(59, 130, 246, 0.3)' : 'none',
        }} />
        
        <h3 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: isDarkMode ? '#f1f5f9' : '#111827',
          marginBottom: '1rem',
          letterSpacing: '-0.025em',
          transition: 'color 0.3s ease',
        }}>
          准备好开始了吗？
        </h3>
        <p style={{ 
          color: isDarkMode ? '#94a3b8' : '#6b7280', 
          marginBottom: '2rem', 
          fontSize: '1.0625rem', 
          maxWidth: '500px', 
          margin: '0 auto 2rem',
          transition: 'color 0.3s ease',
        }}>
          选择上方的功能模块，开始你的职场进阶之旅
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <span className="badge hover-lift" style={{ 
            fontSize: '0.9375rem', 
            padding: '0.625rem 1.25rem',
            borderRadius: '12px',
            fontWeight: '500',
            boxShadow: isDarkMode 
              ? '0 4px 16px rgba(59, 130, 246, 0.2)' 
              : '0 2px 8px rgba(59, 130, 246, 0.15)',
            background: isDarkMode 
              ? 'linear-gradient(145deg, #1e3a5f 0%, #0f172a 100%)' 
              : undefined,
            color: isDarkMode ? '#93c5fd' : undefined,
            border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : undefined,
            transition: 'all 0.3s ease',
          }}>
            ✅ 免费使用
          </span>
          <span className="badge badge-success hover-lift" style={{ 
            fontSize: '0.9375rem', 
            padding: '0.625rem 1.25rem',
            borderRadius: '12px',
            fontWeight: '500',
            boxShadow: isDarkMode 
              ? '0 4px 16px rgba(34, 197, 94, 0.2)' 
              : '0 2px 8px rgba(16, 185, 129, 0.15)',
            transition: 'all 0.3s ease',
          }}>
            ⚡ 即时响应
          </span>
          <span className="badge hover-lift" style={{ 
            fontSize: '0.9375rem', 
            padding: '0.625rem 1.25rem',
            borderRadius: '12px',
            fontWeight: '500',
            background: isDarkMode 
              ? 'linear-gradient(145deg, #78350f 0%, #451a03 100%)' 
              : '#fef3c7',
            color: isDarkMode ? '#fcd34d' : '#92400e',
            boxShadow: isDarkMode 
              ? '0 4px 16px rgba(251, 191, 36, 0.2)' 
              : '0 2px 8px rgba(245, 158, 11, 0.15)',
            border: isDarkMode ? '1px solid rgba(251, 191, 36, 0.3)' : undefined,
            transition: 'all 0.3s ease',
          }}>
            🔒 数据安全
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
