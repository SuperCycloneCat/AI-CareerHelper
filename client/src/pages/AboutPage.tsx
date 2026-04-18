import React from 'react';

interface AboutPageProps {
  onTabChange: (tab: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onTabChange }) => {
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
      bgColor: '#eff6ff',
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
      bgColor: '#ecfdf5',
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
      bgColor: '#fffbeb',
    },
  ];

  const benefits = [
    { icon: '⚡', title: '高效便捷', description: 'AI驱动，快速生成专业分析和建议' },
    { icon: '🎯', title: '精准定位', description: '基于岗位需求，提供个性化指导' },
    { icon: '📈', title: '全面提升', description: '覆盖求职全流程，从岗位分析到面试准备' },
    { icon: '💡', title: '专业建议', description: '基于行业标准和最佳实践' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '24px',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#111827',
        }}>
          关于AI职场行动教练
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#4b5563',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.7',
        }}>
          我们致力于为求职者提供全方位的AI辅助，帮助你在竞争激烈的职场中脱颖而出，
          从岗位解读到简历面试，全程保驾护航。
        </p>
      </div>

      {/* Features Section */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          核心功能
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: `2px solid ${feature.color}`,
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: feature.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '1.5rem',
              }}>
                {feature.icon}
              </div>
              
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1rem',
              }}>
                {feature.title}
              </h3>
              
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
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
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                      color: '#374151',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>✅</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        borderRadius: '20px',
        padding: '3rem',
        marginBottom: '4rem',
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          为什么选择我们
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {benefit.icon}
              </span>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem',
              }}>
                {benefit.title}
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
        borderRadius: '20px',
        padding: '3rem',
        textAlign: 'center',
        color: 'white',
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#111827',
        }}>
          准备好开始你的职场之旅了吗？
        </h2>
        <p style={{
          fontSize: '1.125rem',
          marginBottom: '2rem',
          color: '#1e3a8a',
        }}>
          立即使用AI职场行动教练，让你的求职之路更加顺畅
        </p>
        <button
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            background: '#1e40af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
          onClick={() => onTabChange('job-translator')}
        >
          开始使用
        </button>
      </div>
    </div>
  );
};

export default AboutPage;