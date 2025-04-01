
export interface Quote {
  quote: string;
  quote_explanation: string;
  source_link: string;
}

export interface ContentRatio {
  expertise: string;
  essay: string;
  travel: string;
  self_improvement: string;
}

export interface MbtiExplanation {
  "E/I": string;
  "S/N": string;
  "T/F": string;
  "J/P": string;
}

export interface BlogAnalysis {
  summary: string;
  summary_explanation: string;
  mbti: string;
  mbti_explanation: MbtiExplanation;
  keywords: string[];
  quotes: Quote[];
  content_ratio: ContentRatio;
}
