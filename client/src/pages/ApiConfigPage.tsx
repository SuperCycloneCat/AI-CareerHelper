import React from 'react';
import ApiConfig from '../components/ApiConfig';
import { ModelConfig } from '../App';

interface ApiConfigPageProps {
  modelConfig: ModelConfig;
  setModelConfig: (config: ModelConfig) => void;
  isDarkMode?: boolean;
}

const ApiConfigPage: React.FC<ApiConfigPageProps> = ({ modelConfig, setModelConfig, isDarkMode = false }) => {
  return (
    <ApiConfig 
      currentConfig={modelConfig} 
      onConfigChange={setModelConfig}
      isDarkMode={isDarkMode}
    />
  );
};

export default ApiConfigPage;
