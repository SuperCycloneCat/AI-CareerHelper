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
    try {
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
    } catch (error) {
      console.error('Failed to load saved state:', error);
      return {
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
    }
  });

  useEffect(() => {
    try {
      // 检查数据大小，避免超过localStorage限制
      const dataSize = new Blob([JSON.stringify(pageState)]).size;
      if (dataSize > 5000000) { // 5MB limit
        console.warn('State data too large, skipping localStorage save');
        return;
      }
      localStorage.setItem('pageState', JSON.stringify(pageState));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
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

  return (
    <PageStateContext.Provider
      value={{
        pageState,
        updateJobTranslatorState,
        updateActionPlannerState,
        updateResumeInterviewState,
      }}
    >
      {children}
    </PageStateContext.Provider>
  );
};