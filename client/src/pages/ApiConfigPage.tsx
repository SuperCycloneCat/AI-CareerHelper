import React from 'react';
import ApiConfig from '../components/ApiConfig';
import { ModelConfig } from '../App';

interface ApiConfigPageProps {
  modelConfig: ModelConfig;
  setModelConfig: (config: ModelConfig) => void;
}

const ApiConfigPage: React.FC<ApiConfigPageProps> = ({ modelConfig, setModelConfig }) => {
  return (
    <ApiConfig 
      currentConfig={modelConfig} 
      onConfigChange={setModelConfig} 
    />
  );
};

export default ApiConfigPage;