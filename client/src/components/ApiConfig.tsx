import React, { useState, useEffect } from 'react';
import { ModelConfig } from '../App';

interface ApiConfigProps {
  onConfigChange: (config: ModelConfig) => void;
  currentConfig: ModelConfig;
}

const ApiConfig: React.FC<ApiConfigProps> = ({ onConfigChange, currentConfig }) => {
  const [apiKey, setApiKey] = useState(currentConfig.apiKey);
  const [baseUrl, setBaseUrl] = useState(currentConfig.baseUrl || 'https://api.siliconflow.cn/v1');
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  // 初始化配置
  useEffect(() => {
    setApiKey(currentConfig.apiKey);
    setBaseUrl(currentConfig.baseUrl || 'https://api.siliconflow.cn/v1');
  }, [currentConfig]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 清除之前的错误信息
    setError('');
    
    // 验证是否有输入内容
    if (!apiKey) {
      // 如果没有输入API Key，显示错误提示
      setError('请输入API Key');
      // 3秒后清除错误信息
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
    
    // 3秒后清除保存状态
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
      
      // 3秒后清除保存状态
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
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
            🔧
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>
              API配置
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9375rem' }}>
              配置AI模型API密钥，用于岗位解读、行动规划和简历面试教练
            </p>
          </div>
        </div>
      </div>

      {/* Config Form */}
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          {/* Model Info */}
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: '#f3e8ff',
            border: '1px solid #ddd6fe',
            borderRadius: '8px',
            marginBottom: '2rem',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <span style={{ fontSize: '2rem' }}>🤖</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
                  硅基流动 SiliconFlow
                </h3>
                <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
                  使用模型：Qwen/Qwen2.5-72B-Instruct
                </p>
              </div>
            </div>

          </div>

          {/* API Key */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label">
              API Key
            </label>
            <input
              type="password"
              className="input"
              placeholder="请输入硅基流动API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ font: 'inherit' }}
            />
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              marginTop: '0.5rem',
              lineHeight: '1.5'
            }}>
              获取地址: https://docs.siliconflow.cn/cn/userguide/quickstart
            </p>
          </div>

          {/* Base URL */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label">
              Base URL (可选)
            </label>
            <input
              type="text"
              className="input"
              placeholder="请输入硅基流动Base URL"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              marginTop: '0.5rem',
              lineHeight: '1.5'
            }}>
              默认为: https://api.siliconflow.cn/v1
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '0.875rem',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}
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
                background: '#fee2e2',
                color: '#991b1b',
                border: '1px solid #fecaca',
                borderRadius: '8px',
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
              background: '#d1fae5',
              color: '#065f46',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '0.875rem',
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
        background: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
      }}>
        <h4 style={{ 
          margin: '0 0 1rem 0', 
          fontSize: '1.125rem', 
          fontWeight: '600',
          color: '#1e293b'
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
            <span style={{ color: '#475569', lineHeight: '1.5' }}>
              密钥将存储在本地浏览器中，不会上传到服务器
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🌐</span>
            <span style={{ color: '#475569', lineHeight: '1.5' }}>
              硅基流动需要先注册并创建API Key
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>💾</span>
            <span style={{ color: '#475569', lineHeight: '1.5' }}>
              配置保存后，刷新页面依然有效
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ApiConfig;