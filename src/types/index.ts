export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'SEO Lead' | 'Content Manager' | 'Developer' | 'Analyst';
  avatar?: string;
}

export interface Domain {
  id: string;
  name: string;
  url: string;
  score: number;
  lastUpdated: string;
}

// API Response Types
export interface SentimentData {
  sentence: string;
  name: string;
  score: number;
}

export interface BrandVisibilityData {
  model: string;
  mentions: number;
}

export interface IndustryRankingData {
  name: string;
  mentions: number;
}

export interface VisibilityBreakdown {
  'Content Quality & Structure': number;
  'Trusted External Sources': number;
  'Intent-Mapped Keywords & Pages': number;
  'Freshness & Update Frequency': number;
  'Internal Linking & Structure': number;
  'Backlink Diversity': number;
  'Page Accessibility (speed, mobile, crawlability)': number;
  'Schema & Structured Data': number;
  'Social Mentions': number;
  'UX/UI Visual Design': number;
}

export interface AnalysisResponse {
  llm_citations: number;
  avg_position: number;
  avg_summarizability: number;
  ai_visibility: number;
  sentiment: SentimentData[];
  brand_visibility: BrandVisibilityData[];
  industry_rankings: IndustryRankingData[];
  visibility: VisibilityBreakdown;
}

export interface AnalysisRequest {
  category: string;
  brandName: string;
  location: string;
  keywords: string[];
  website: string;
}