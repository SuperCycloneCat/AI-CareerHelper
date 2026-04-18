import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import JobMajorPage from './pages/JobMajorPage';
import JobTranslatorPage from './pages/JobTranslatorPage';
import ActionPlannerPage from './pages/ActionPlannerPage';
import ResumeInterviewPage from './pages/ResumeInterviewPage';
import ApiConfigPage from './pages/ApiConfigPage';
import WorkflowPage from './pages/WorkflowPage';
import { PageStateProvider } from './context/PageStateContext';

interface ModelConfig {
  model: 'siliconflow';
  apiKey: string;
  baseUrl?: string; // 硅基流动需要
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    model: 'siliconflow',
    apiKey: '',
    baseUrl: 'https://api.siliconflow.cn/v1',
  });

  // 从localStorage加载配置
  useEffect(() => {
    const savedConfig = localStorage.getItem('siliconflowConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setModelConfig(parsedConfig);
      } catch (error) {
        console.error('解析配置失败:', error);
      }
    }
  }, []);

  // 保存配置到localStorage
  const handleConfigChange = (config: ModelConfig) => {
    setModelConfig(config);
    localStorage.setItem('siliconflowConfig', JSON.stringify(config));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onTabChange={setActiveTab} />;
      case 'about':
        return <AboutPage onTabChange={setActiveTab} />;
      case 'job-major':
        return <JobMajorPage />;
      case 'job-translator':
        return <JobTranslatorPage modelConfig={modelConfig} onTabChange={setActiveTab} />;
      case 'action-planner':
        return <ActionPlannerPage modelConfig={modelConfig} onTabChange={setActiveTab} />;
      case 'resume-interview':
        return <ResumeInterviewPage modelConfig={modelConfig} onTabChange={setActiveTab} />;
      case 'workflow':
        return <WorkflowPage modelConfig={modelConfig} onTabChange={setActiveTab} />;
      case 'api-config':
        return <ApiConfigPage modelConfig={modelConfig} setModelConfig={handleConfigChange} />;
      default:
        return <HomePage onTabChange={setActiveTab} />;
    }
  };

  return (
    <PageStateProvider>
      <div className="App min-h-screen bg-gray-100">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="py-8">
          {renderContent()}
        </main>
      </div>
    </PageStateProvider>
  );
}

export default App