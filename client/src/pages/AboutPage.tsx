import React from 'react';

interface AboutPageProps {
  onTabChange: (tab: string) => void;
  isDarkMode?: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ onTabChange, isDarkMode = false }) => {
  const features = [
    {
      icon: '💼',
      title: '岗位翻译器',
      description: '输入JD文本或链接，获取真实工作场景、技能拆解和适配性分析。帮助你理解岗位真实需求，避免盲目投递。',
      details: [
        '深度解析岗位职责和要求',
        '识别核心硬技能和软技能',
        '分析岗位适合度',
        '提供详细的工作场景描述',
      ],
      color: '#3b82f6',
      bgColor: isDarkMode ? '#1e3a5f' : '#eff6ff',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    },
    {
      icon: '📋',
      title: '行动规划师',
      description: '输入目标岗位和个人信息，获取1-3个月分阶段行动清单，帮助你有计划地提升竞争力。',
      details: [
        '个性化制定学习计划',
        '分阶段目标设定',
        '优先能力识别',
        '时间管理建议',
      ],
      color: '#10b981',
      bgColor: isDarkMode ? '#064e3b' : '#ecfdf5',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
      icon: '🎯',
      title: '简历面试教练',
      description: '分析简历并提供改写建议，模拟面试并给出改进意见，让你的简历和面试表现更加专业。',
      details: [
        '简历内容优化',
        '面试问题模拟',
        '回答质量评估',
        '专业改进建议',
      ],
      color: '#f59e0b',
      bgColor: isDarkMode ? '#78350f' : '#fffbeb',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
  ];

  const benefits = [
    { icon: '⚡', title: '高效便捷', description: 'AI驱动，快速生成专业分析和建议', color: '#3b82f6' },
    { icon: '🎯', title: '精准定位', description: '基于岗位需求，提供个性化指导', color: '#10b981' },
    { icon: '📈', title: '全面提升', description: '覆盖求职全流程，从岗位分析到面试准备', color: '#f59e0b' },
    { icon: '💡', title: '专业建议', description: '基于行业标准和最佳实践', color: '#8b5cf6' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div className="fade-in" style={{
        textAlign: 'center',
        marginBottom: '4rem',
        padding: '4rem 2rem',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
        borderRadius: '32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}>
        {/* Decorative blobs */}
        <div className="blob" style={{
          top: '-30%',
          right: '-10%',
          width: '400px',
          height: '400px',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)' 
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
          animationDelay: '0s',
        }} />
        <div className="blob" style={{
          bottom: '-30%',
          left: '-10%',
          width: '350px',
          height: '350px',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)' 
            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
          animationDelay: '2s',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            background: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '9999px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            marginBottom: '1.5rem',
            fontSize: '0.9375rem',
            color: isDarkMode ? '#94a3b8' : '#6b7280',
            backdropFilter: 'blur(10px)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
            transition: 'all 0.3s ease',
          }}>
            <span style={{ color: '#3b82f6' }}>✨</span>
            了解我们的使命
          </div>
          
          <h1 style={{
            fontSize: '2.75rem',
            fontWeight: '700',
            marginBottom: '1.25rem',
            color: isDarkMode ? '#f1f5f9' : '#111827',
            letterSpacing: '-0.025em',
            transition: 'color 0.3s ease',
          }}>
            关于AI职场行动教练
          </h1>
          <p style={{
            fontSize: '1.1875rem',
            color: isDarkMode ? '#94a3b8' : '#4b5563',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: '1.8',
            transition: 'color 0.3s ease',
          }}>
            我们致力于为求职者提供全方位的AI辅助，帮助你在竞争激烈的职场中脱颖而出，
            从岗位解读到简历面试，全程保驾护航。
          </p>
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
            核心功能
          </h2>
          <p className="fade-in" style={{ 
            color: isDarkMode ? '#94a3b8' : '#6b7280', 
            fontSize: '1.125rem',
            transition: 'color 0.3s ease',
          }}>
            三大模块，全方位助力你的求职之旅
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
                background: isDarkMode ? '#1e293b' : 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: `2px solid ${feature.bgColor}`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Top gradient bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: feature.gradient,
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
                boxShadow: `0 8px 24px ${feature.color}33`,
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
                color: isDarkMode ? '#94a3b8' : '#4b5563',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
              }}>
                {feature.description}
              </p>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {feature.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      marginBottom: '0.875rem',
                      color: isDarkMode ? '#cbd5e1' : '#374151',
                      fontSize: '0.9375rem',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    <span style={{ 
                      fontSize: '1.25rem',
                      color: feature.color,
                    }}>✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="fade-in" style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)' 
          : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)',
        borderRadius: '24px',
        padding: '3.5rem',
        marginBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        }} />
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: isDarkMode ? '#f1f5f9' : '#111827',
            marginBottom: '1rem',
            letterSpacing: '-0.025em',
            transition: 'color 0.3s ease',
          }}>
            为什么选择我们
          </h2>
          <p style={{ 
            color: isDarkMode ? '#94a3b8' : '#6b7280', 
            fontSize: '1.125rem',
            transition: 'color 0.3s ease',
          }}>
            专业、高效、贴心的求职辅助体验
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="hover-lift"
              style={{
                background: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '2rem',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${benefit.color}15 0%, ${benefit.color}10 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                marginBottom: '1.25rem',
              }}>
                {benefit.icon}
              </div>
              <h3 style={{
                fontSize: '1.1875rem',
                fontWeight: '600',
                color: isDarkMode ? '#f1f5f9' : '#111827',
                marginBottom: '0.625rem',
                transition: 'color 0.3s ease',
              }}>
                {benefit.title}
              </h3>
              <p style={{
                color: isDarkMode ? '#94a3b8' : '#6b7280',
                lineHeight: '1.6',
                fontSize: '0.9375rem',
                transition: 'color 0.3s ease',
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="fade-in" style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
        borderRadius: '24px',
        padding: '4rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'white',
            letterSpacing: '-0.025em',
          }}>
            准备好开始你的职场之旅了吗？
          </h2>
          <p style={{
            fontSize: '1.1875rem',
            marginBottom: '2.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '500px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.7',
          }}>
            立即使用AI职场行动教练，让你的求职之路更加顺畅
          </p>
          <button
            className="hover-lift"
            style={{
              padding: '1.125rem 2.5rem',
              fontSize: '1.0625rem',
              fontWeight: '600',
              background: 'white',
              color: '#2563eb',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            }}
            onClick={() => onTabChange('job-translator')}
          >
            🚀 立即开始
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;