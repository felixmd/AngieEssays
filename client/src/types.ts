export type EssayType = 'narrative' | 'descriptive' | 'compare-contrast' | 'argumentative';

export interface EssayTopic {
  id: string;
  title: string;
  type: EssayType;
  description: string;
}

export interface FeedbackCategory {
  category: 'Structure' | 'Argument' | 'Grammar' | 'Evidence';
  suggestions: string[];
}

export interface EssayFeedback {
  categories: FeedbackCategory[];
  timestamp: Date;
}

export interface FinalAssessment extends EssayFeedback {
  overallScore: number;
  summary: string;
}

export interface Essay {
  id: string;
  type: EssayType;
  topic: string;
  content: string;
  feedbackHistory: EssayFeedback[];
  finalAssessment?: FinalAssessment;
  createdAt: Date;
  updatedAt: Date;
}
