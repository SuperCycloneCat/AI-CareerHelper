import React, { useState, useEffect } from 'react';
import { ModelConfig } from '../App';

interface ApiConfigProps {
  onConfigChange: (config: ModelConfig) => void;
  currentConfig: ModelConfig;
  isDarkMode?: boolean;
}

const ApiConfig: React.FC<ApiConfigProps> = ({ onConfigChange, currentConfig, isDarkMode = false }) => {
  const [apiKey, setApiKey] = useState(currentConfig.apiKey);
  const [baseUrl, setBaseUrl] = useState(currentConfig.baseUrl || 'https://api.siliconflow.cn/v1');
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setApiKey(currentConfig.apiKey);
    setBaseUrl(currentConfig.baseUrl || 'https://api.siliconflow.cn/v1');
  }, [currentConfig]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setError('');
    
    if (!apiKey) {
      setError('请输入API Key');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    
    const config: ModelConfig = {
      model: 'siliconflow',
      apiKey,
      baseUrl,
    };
    
    onConfigChange(config);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleDeleteConfig = () => {
    if (window.confirm('确定要删除当前配置吗？')) {
      const emptyConfig: ModelConfig = {
        model: 'siliconflow',
        apiKey: '',
        baseUrl: 'https://api.siliconflow.cn/v1',
      };
      
      setApiKey('');
      setBaseUrl('https://api.siliconflow.cn/v1');
      onConfigChange(emptyConfig);
      setIsSaved(true);
      
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div className="fade-in" style={{ marginBottom: '2rem' }}>
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
            boxShadow: isDarkMode 
              ? '0 8px 24px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
              : '0 8px 16px rgba(139, 92, 246, 0.3)',
            transition: 'all 0.3s ease',
          }}>
            🔧
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', color: isDarkMode ? '#f1f5f9' : '#111827', transition: 'color 0.3s ease' }}>
              API配置
            </h2>
            <p style={{ margin: 0, color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
              配置AI模型API密钥，用于岗位解读、行动规划和简历面试教练
            </p>
          </div>
        </div>
      </div>

      {/* Config Form */}
      <div className="card hover-lift fade-in" style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        background: isDarkMode ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' : undefined,
        border: isDarkMode ? '1px solid rgba(139, 92, 246, 0.2)' : undefined,
        boxShadow: isDarkMode 
          ? '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
          : undefined,
        transition: 'all 0.3s ease',
      }}>
        <form onSubmit={handleSubmit}>
          {/* Model Info */}
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.15)' : '#f3e8ff',
            border: isDarkMode ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid #ddd6fe',
            borderRadius: '12px',
            marginBottom: '2rem',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <span style={{ fontSize: '2rem' }}>🤖</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#111827', transition: 'color 0.3s ease' }}>
                  硅基流动 SiliconFlow
                </h3>
                <p style={{ margin: '0.5rem 0 0 0', color: isDarkMode ? '#94a3b8' : '#6b7280', transition: 'color 0.3s ease' }}>
                  使用模型：Qwen/Qwen2.5-72B-Instruct
                </p>
              </div>
            </div>

          </div>

          {/* API Key */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label" style={{ color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
              API Key
            </label>
            <input
              type="password"
              className="input"
              placeholder="请输入硅基流动API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ 
                font: 'inherit',
                background: isDarkMode ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)' : undefined,
                border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined,
                color: isDarkMode ? '#e2e8f0' : undefined,
                boxShadow: isDarkMode ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : undefined,
                transition: 'all 0.3s ease',
              }}
            />
            <p style={{ 
              fontSize: '0.875rem', 
              color: isDarkMode ? '#94a3b8' : '#6b7280', 
              marginTop: '0.5rem',
              lineHeight: '1.5',
              transition: 'color 0.3s ease',
            }}>
              获取地址: https://docs.siliconflow.cn/cn/userguide/quickstart
            </p>
          </div>

          {/* Base URL */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label" style={{ color: isDarkMode ? '#e2e8f0' : undefined, transition: 'color 0.3s ease' }}>
              Base URL (可选)
            </label>
            <input
              type="text"
              className="input"
              placeholder="请输入硅基流动Base URL"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              style={{ 
                background: isDarkMode ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)' : undefined,
                border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.8)' : undefined,
                color: isDarkMode ? '#e2e8f0' : undefined,
                boxShadow: isDarkMode ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : undefined,
                transition: 'all 0.3s ease',
              }}
            />
            <p style={{ 
              fontSize: '0.875rem', 
              color: isDarkMode ? '#94a3b8' : '#6b7280', 
              marginTop: '0.5rem',
              lineHeight: '1.5',
              transition: 'color 0.3s ease',
            }}>
              默认为: https://api.siliconflow.cn/v1
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              background: isDarkMode ? 'linear-gradient(145deg, #7f1d1d 0%, #991b1b 100%)' : '#fee2e2',
              color: isDarkMode ? '#fca5a5' : '#991b1b',
              borderRadius: '12px',
              textAlign: 'center',
              fontSize: '0.875rem',
              border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.3)' : 'none',
              transition: 'all 0.3s ease',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            className="btn btn-primary hover-lift"
            style={{ width: '100%', padding: '1rem', marginBottom: '1rem', borderRadius: '12px', fontWeight: '600' }}
          >
            保存配置
          </button>

          {/* Delete Button */}
          {apiKey && (
            <button
              type="button"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.9375rem',
                fontWeight: '500',
                background: isDarkMode ? 'linear-gradient(145deg, #7f1d1d 0%, #991b1b 100%)' : '#fee2e2',
                color: isDarkMode ? '#fca5a5' : '#991b1b',
                border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid #fecaca',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={handleDeleteConfig}
            >
              🗑️ 删除配置
            </button>
          )}

          {/* Save Success Message */}
          {isSaved && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: isDarkMode ? 'linear-gradient(145deg, #064e3b 0%, #065f46 100%)' : '#d1fae5',
              color: isDarkMode ? '#34d399' : '#065f46',
              borderRadius: '12px',
              textAlign: 'center',
              fontSize: '0.875rem',
              border: isDarkMode ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
              transition: 'all 0.3s ease',
            }}>
              ✅ 配置保存成功！
            </div>
          )}
        </form>
      </div>

      {/* Tips */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: isDarkMode 
          ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
          : '#f8fafc',
        borderRadius: '16px',
        border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid #e2e8f0',
        boxShadow: isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <h4 style={{ 
          margin: '0 0 1rem 0', 
          fontSize: '1.125rem', 
          fontWeight: '600',
          color: isDarkMode ? '#f1f5f9' : '#1e293b',
          transition: 'color 0.3s ease',
        }}>
          💡 配置提示
        </h4>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🔒</span>
            <span style={{ color: isDarkMode ? '#cbd5e1' : '#475569', lineHeight: '1.5', transition: 'color 0.3s ease' }}>
              密钥将存储在本地浏览器中，不会上传到服务器
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🌐</span>
            <span style={{ color: isDarkMode ? '#cbd5e1' : '#475569', lineHeight: '1.5', transition: 'color 0.3s ease' }}>
              硅基流动需要先注册并创建API Key
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>💾</span>
            <span style={{ color: isDarkMode ? '#cbd5e1' : '#475569', lineHeight: '1.5', transition: 'color 0.3s ease' }}>
              配置保存后，刷新页面依然有效
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ApiConfig;
