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
import MeteorEffect from './components/MeteorEffect';
import DayModeEffect from './components/DayModeEffect';
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
  const [isDarkMode, setIsDarkMode] = useState(false);

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

    // 从localStorage加载主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }, []);

  // 保存配置到localStorage
  const handleConfigChange = (config: ModelConfig) => {
    setModelConfig(config);
    localStorage.setItem('siliconflowConfig', JSON.stringify(config));
  };

  // 切换主题
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onTabChange={setActiveTab} isDarkMode={isDarkMode} />;
      case 'about':
        return <AboutPage onTabChange={setActiveTab} isDarkMode={isDarkMode} />;
      case 'job-major':
        return <JobMajorPage isDarkMode={isDarkMode} />;
      case 'job-translator':
        return <JobTranslatorPage modelConfig={modelConfig} isDarkMode={isDarkMode} />;
      case 'action-planner':
        return <ActionPlannerPage modelConfig={modelConfig} isDarkMode={isDarkMode} />;
      case 'resume-interview':
        return <ResumeInterviewPage modelConfig={modelConfig} isDarkMode={isDarkMode} />;
      case 'api-config':
        return <ApiConfigPage modelConfig={modelConfig} setModelConfig={handleConfigChange} isDarkMode={isDarkMode} />;
      default:
        return <HomePage onTabChange={setActiveTab} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <PageStateProvider>
      <div className="App min-h-screen" style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0a0f1a 0%, #0f172a 50%, #0a0f1a 100%)'
          : 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #E0F4FF 70%, #F0F9FF 100%)',
        transition: 'background 0.5s ease',
      }}>
        <MeteorEffect isDarkMode={isDarkMode} />
        <DayModeEffect isDarkMode={isDarkMode} />
        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
        <main className="py-8">
          {renderContent()}
        </main>
      </div>
    </PageStateProvider>
  );
}

export default App