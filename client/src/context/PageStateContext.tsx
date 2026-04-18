import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PageState {
  jobTranslator: {
    jobDescription: string;
    jobLink: string;
    result: any;
  };
  actionPlanner: {
    targetJob: string;
    grade: string;
    major: string;
    result: any;
  };
  resumeInterview: {
    resumeText: string;
    resumeResult: any;
    interviewQuestion: string;
    interviewAnswer: string;
    jobType: string;
    interviewResult: any;
  };
}

interface PageStateContextType {
  pageState: PageState;
  updateJobTranslatorState: (state: Partial<PageState['jobTranslator']>) => void;
  updateActionPlannerState: (state: Partial<PageState['actionPlanner']>) => void;
  updateResumeInterviewState: (state: Partial<PageState['resumeInterview']>) => void;
  syncDataToNextModule: (currentModule: 'job-translator' | 'action-planner') => void;
  getRecommendations: () => string[];
  resetAllModules: () => void;
}

const PageStateContext = createContext<PageStateContextType | undefined>(undefined);

export const usePageState = () => {
  const context = useContext(PageStateContext);
  if (!context) {
    throw new Error('usePageState must be used within a PageStateProvider');
  }
  return context;
};

interface PageStateProviderProps {
  children: ReactNode;
}

export const PageStateProvider: React.FC<PageStateProviderProps> = ({ children }) => {
  const [pageState, setPageState] = useState<PageState>(() => {
    const savedState = localStorage.getItem('pageState');
    return savedState ? JSON.parse(savedState) : {
      jobTranslator: {
        jobDescription: '',
        jobLink: '',
        result: null,
      },
      actionPlanner: {
        targetJob: '',
        grade: '',
        major: '',
        result: null,
      },
      resumeInterview: {
        resumeText: '',
        resumeResult: null,
        interviewQuestion: '',
        interviewAnswer: '',
        jobType: '',
        interviewResult: null,
      },
    };
  });

  useEffect(() => {
    localStorage.setItem('pageState', JSON.stringify(pageState));
  }, [pageState]);

  const updateJobTranslatorState = (state: Partial<PageState['jobTranslator']>) => {
    setPageState(prev => ({
      ...prev,
      jobTranslator: {
        ...prev.jobTranslator,
        ...state,
      },
    }));
  };

  const updateActionPlannerState = (state: Partial<PageState['actionPlanner']>) => {
    setPageState(prev => ({
      ...prev,
      actionPlanner: {
        ...prev.actionPlanner,
        ...state,
      },
    }));
  };

  const updateResumeInterviewState = (state: Partial<PageState['resumeInterview']>) => {
    setPageState(prev => ({
      ...prev,
      resumeInterview: {
        ...prev.resumeInterview,
        ...state,
      },
    }));
  };

  const syncDataToNextModule = (currentModule: 'job-translator' | 'action-planner') => {
    if (currentModule === 'job-translator' && pageState.jobTranslator.result) {
      // 从岗位分析结果同步到行动规划师
      const jobTitle = pageState.jobTranslator.jobDescription.match(/职位[：:]\s*(.+)/)?.[1] || 
                      pageState.jobTranslator.jobDescription.match(/岗位[：:]\s*(.+)/)?.[1] || 
                      pageState.jobTranslator.jobDescription.substring(0, 50);
      
      setPageState(prev => ({
        ...prev,
        actionPlanner: {
          ...prev.actionPlanner,
          targetJob: prev.actionPlanner.targetJob || jobTitle || '',
        },
      }));
    } else if (currentModule === 'action-planner' && pageState.actionPlanner.result) {
      // 从行动规划结果同步到简历面试教练
      setPageState(prev => ({
        ...prev,
        resumeInterview: {
          ...prev.resumeInterview,
          jobType: prev.resumeInterview.jobType || prev.actionPlanner.targetJob || '',
        },
      }));
    }
  };

  const getRecommendations = (): string[] => {
    const recommendations: string[] = [];

    // 基于岗位分析结果的推荐
    if (pageState.jobTranslator.result) {
      const hardSkills = pageState.jobTranslator.result.hardSkills || [];
      const softSkills = pageState.jobTranslator.result.softSkills || [];
      
      if (hardSkills.length > 0) {
        recommendations.push(`建议重点提升以下硬技能：${hardSkills.slice(0, 3).join('、')}`);
      }
      
      if (softSkills.length > 0) {
        recommendations.push(`不要忽视软技能的培养：${softSkills.slice(0, 3).join('、')}`);
      }
    }

    // 基于行动规划结果的推荐
    if (pageState.actionPlanner.result) {
      const prioritySkill = pageState.actionPlanner.result.prioritySkill;
      if (prioritySkill) {
        recommendations.push(`优先提升能力：${prioritySkill}`);
      }

      const firstPhaseTasks = pageState.actionPlanner.result.phases?.[0]?.tasks;
      if (firstPhaseTasks && firstPhaseTasks.length > 0) {
        recommendations.push(`本周建议完成：${firstPhaseTasks[0]}`);
      }
    }

    // 基于简历面试结果的推荐
    if (pageState.resumeInterview.resumeResult) {
      recommendations.push('根据简历分析结果，优化简历内容，突出核心技能');
    }

    if (pageState.resumeInterview.interviewResult) {
      recommendations.push('根据面试反馈，练习回答问题的技巧和表达能力');
    }

    // 通用推荐
    if (recommendations.length === 0) {
      if (!pageState.jobTranslator.jobDescription && !pageState.jobTranslator.jobLink) {
        recommendations.push('开始分析一个岗位，了解其真实需求和技能要求');
      } else if (!pageState.actionPlanner.targetJob) {
        recommendations.push('设置目标岗位，制定个性化的行动规划');
      } else if (!pageState.resumeInterview.resumeText) {
        recommendations.push('上传简历片段，获取专业的分析和改进建议');
      } else if (!pageState.resumeInterview.interviewQuestion) {
        recommendations.push('模拟面试场景，练习回答常见问题');
      } else {
        recommendations.push('继续完善简历和面试准备，提高求职竞争力');
      }
    }

    return recommendations.slice(0, 3); // 最多返回3条推荐
  };

  const resetAllModules = () => {
    setPageState({
      jobTranslator: {
        jobDescription: '',
        jobLink: '',
        result: null,
      },
      actionPlanner: {
        targetJob: '',
        grade: '',
        major: '',
        result: null,
      },
      resumeInterview: {
        resumeText: '',
        resumeResult: null,
        interviewQuestion: '',
        interviewAnswer: '',
        jobType: '',
        interviewResult: null,
      },
    });
  };

  return (
    <PageStateContext.Provider
      value={{
        pageState,
        updateJobTranslatorState,
        updateActionPlannerState,
        updateResumeInterviewState,
        syncDataToNextModule,
        getRecommendations,
        resetAllModules,
      }}
    >
      {children}
    </PageStateContext.Provider>
  );
};