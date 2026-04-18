import React from 'react';
import WorkflowDashboard from '../components/WorkflowDashboard';
import { usePageState } from '../context/PageStateContext';

interface HomePageProps {
  onTabChange: (tab: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onTabChange }) => {
  const { resetAllModules } = usePageState();

  const handleResetAll = () => {
    if (window.confirm('确定要重置所有模块的数据吗？这将清除所有输入和分析结果。')) {
      resetAllModules();
      alert('所有模块已重置成功！');
    }
  };

  const features = [
    {
      icon: '💼',
      title: '岗位翻译器',
      description: '输入JD文本或链接，获取真实工作场景、技能拆解和适配性分析',
      color: '#3b82f6',
      bgColor: '#eff6ff',
      borderColor: '#bfdbfe',
    },
    {
      icon: '📋',
      title: '行动规划师',
      description: '输入目标岗位和个人信息，获取1-3个月分阶段行动清单',
      color: '#10b981',
      bgColor: '#ecfdf5',
      borderColor: '#a7f3d0',
    },
    {
      icon: '🎯',
      title: '简历面试教练',
      description: '分析简历并提供改写建议，模拟面试并给出改进意见',
      color: '#f59e0b',
      bgColor: '#fffbeb',
      borderColor: '#fde68a',
    },
  ];

  const targetUsers = [
    { icon: '👨‍🎓', text: '大三、大四学生' },
    { icon: '🎓', text: '应届毕业生' },
    { icon: '💼', text: '非技术岗求职者' },
    { icon: '🔄', text: '跨专业求职学生' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'white',
            borderRadius: '9999px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}>
            <span style={{ color: '#3b82f6' }}>✨</span>
            为求职者打造的智能助手
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.025em',
          }}>
            AI职场行动教练
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#4b5563',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.7',
          }}>
            从岗位解读到简历面试全链路AI化<br />
            让你的求职之路更加清晰、高效
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
              onClick={() => onTabChange('job-translator')}
            >
              🚀 开始使用
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
              onClick={() => onTabChange('about')}
            >
              📖 了解更多
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ 
                fontSize: '1rem', 
                padding: '0.875rem 2rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onClick={handleResetAll}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              🔄 一键重置
            </button>
          </div>
        </div>
      </div>

      {/* Workflow Dashboard */}
      <WorkflowDashboard onTabChange={onTabChange} />

      {/* Target Users Section */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        borderRadius: '20px',
        padding: '2.5rem',
        marginBottom: '3rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#92400e',
            marginBottom: '0.5rem',
          }}>
            🎯 目标人群
          </h3>
          <p style={{ color: '#b45309' }}>
            专为以下群体设计
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {targetUsers.map((user, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                padding: '1.25rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{user.icon}</span>
              <span style={{ fontWeight: '500', color: '#374151' }}>{user.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '0.75rem',
        }}>
          准备好开始了吗？
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          选择上方的功能模块，开始你的职场进阶之旅
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}>
          <span className="badge" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            ✅ 免费使用
          </span>
          <span className="badge badge-success" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            ⚡ 即时响应
          </span>
          <span className="badge" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', background: '#fef3c7', color: '#92400e' }}>
            🔒 数据安全
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;