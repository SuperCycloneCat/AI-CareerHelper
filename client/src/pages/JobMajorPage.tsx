import React, { useState } from 'react';

interface JobMajor {
  id: string;
  jobTitle: string;
  relatedMajors: string[];
  crossMajorDifficulty: '低' | '中' | '高';
  description: string;
  requiredSkills: string[];
}

const JobMajorPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobMajor | null>(null);
  
  const jobs: JobMajor[] = [
    {
      id: '1',
      jobTitle: '产品经理',
      relatedMajors: ['工商管理', '市场营销', '计算机科学', '心理学'],
      crossMajorDifficulty: '中',
      description: '产品经理负责产品的全生命周期管理，包括需求分析、产品设计、项目管理等工作。需要具备良好的沟通能力、产品思维和用户洞察能力。',
      requiredSkills: ['产品思维', '用户研究', '数据分析', '项目管理']
    },
    {
      id: '2',
      jobTitle: '软件工程师',
      relatedMajors: ['计算机科学', '软件工程', '信息工程', '电子工程'],
      crossMajorDifficulty: '高',
      description: '软件工程师负责软件系统的设计、开发和维护。需要具备扎实的编程基础和解决问题的能力。',
      requiredSkills: ['编程能力', '算法知识', '系统设计', '问题解决']
    },
    {
      id: '3',
      jobTitle: '市场营销专员',
      relatedMajors: ['市场营销', '工商管理', '传播学', '广告学'],
      crossMajorDifficulty: '低',
      description: '市场营销专员负责制定和执行市场营销策略，包括市场调研、品牌推广、活动策划等工作。',
      requiredSkills: ['市场分析', '内容创作', '社交媒体运营', '活动策划']
    },
    {
      id: '4',
      jobTitle: '人力资源专员',
      relatedMajors: ['人力资源管理', '心理学', '社会学', '工商管理'],
      crossMajorDifficulty: '低',
      description: '人力资源专员负责企业的人力资源管理工作，包括招聘、培训、绩效管理、员工关系等。',
      requiredSkills: ['招聘', '培训', '绩效管理', '员工关系']
    },
    {
      id: '5',
      jobTitle: '财务专员',
      relatedMajors: ['会计学', '财务管理', '金融学', '经济学'],
      crossMajorDifficulty: '中',
      description: '财务专员负责企业的财务管理工作，包括财务分析、会计核算、税务处理、报表制作等。',
      requiredSkills: ['财务分析', '会计核算', '税务知识', '报表制作']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '低':
        return '#10b981';
      case '中':
        return '#f59e0b';
      case '高':
        return '#ef4444';
      default:
        return '#6b7280';
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
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
          }}>
            🎓
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>
              岗位专业匹配
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9375rem' }}>
              了解不同岗位对应的专业要求，评估跨专业求职难度
            </p>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {jobs.map((job) => (
          <div
            key={job.id}
            className="card"
            style={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid #e5e7eb'
            }}
            onClick={() => setSelectedJob(job)}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
                {job.jobTitle}
              </h3>
              <div style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '500',
                background: getDifficultyColor(job.crossMajorDifficulty) + '20',
                color: getDifficultyColor(job.crossMajorDifficulty)
              }}>
                跨专业难度：{job.crossMajorDifficulty}
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>
                相关专业
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {job.relatedMajors.map((major, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '0.375rem 0.75rem',
                      background: '#f3f4f6',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}
                  >
                    {major}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedJob(job);
              }}
            >
              查看详情
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
                {selectedJob.jobTitle}
              </h3>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                onClick={() => setSelectedJob(null)}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-flex',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '500',
                background: getDifficultyColor(selectedJob.crossMajorDifficulty) + '20',
                color: getDifficultyColor(selectedJob.crossMajorDifficulty),
                marginBottom: '1rem'
              }}>
                跨专业难度：{selectedJob.crossMajorDifficulty}
              </div>
              <p style={{ margin: 0, lineHeight: '1.6', color: '#4b5563' }}>
                {selectedJob.description}
              </p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
                核心技能要求
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedJob.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#f3f4f6',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
                相关专业
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedJob.relatedMajors.map((major, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#f3f4f6',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {major}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
                跨专业求职建议
              </h4>
              <p style={{ margin: 0, lineHeight: '1.6', color: '#4b5563' }}>
                {selectedJob.crossMajorDifficulty === '低' && 
                  '该岗位跨专业求职难度较低，建议通过实习、项目经验等方式积累相关经验，提高竞争力。'}
                {selectedJob.crossMajorDifficulty === '中' && 
                  '该岗位跨专业求职难度适中，建议系统学习相关知识，考取相关证书，积累实习经验。'}
                {selectedJob.crossMajorDifficulty === '高' && 
                  '该岗位跨专业求职难度较高，建议通过专业培训、认证课程等方式系统学习相关技能，同时积累项目经验。'}
              </p>
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedJob(null)}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMajorPage;