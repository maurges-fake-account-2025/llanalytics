export interface AnalysisRequest {
  category: string;
  brandName: string;
  location: string;
  keywords: string[];
  website: string;
}

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

export class AnalysisAPI {
  private baseUrl = import.meta.env.DEV ? '/api' : 'https://random.test.morj.men';

  async analyzeWebsite(data: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Transform API response to match our component interfaces
  transformAnalysisData(apiResponse: AnalysisResponse) {
    return {
      llmCitations: {
        total: apiResponse.llm_citations,
        breakdown: this.transformBrandVisibility(apiResponse.brand_visibility),
      },
      avgSummarizability: apiResponse.avg_summarizability,
      aiVisibilityScore: apiResponse.ai_visibility,
      avgPosition: apiResponse.avg_position,
      sentiment: apiResponse.sentiment,
      industryRankings: this.transformIndustryRankings(apiResponse.industry_rankings),
      visibility: apiResponse.visibility,
    };
  }

  private transformBrandVisibility(brandVisibility: BrandVisibilityData[]) {
    const breakdown: Record<string, number> = {};
    
    brandVisibility.forEach(item => {
      const modelName = item.model.toLowerCase();
      breakdown[modelName] = Math.round(item.mentions);
    });

    return breakdown;
  }

  private transformIndustryRankings(rankings: IndustryRankingData[]) {
    return rankings.map((item, index) => ({
      rank: index + 1,
      brand: item.name,
      mentions: item.mentions,
      visibility: Math.round((item.mentions / Math.max(...rankings.map(r => r.mentions))) * 100),
      trend: Math.floor(Math.random() * 10) - 5, // Mock trend data since not provided
      previousRank: index + 1 + Math.floor(Math.random() * 3) - 1,
    }));
  }
}

export const analysisAPI = new AnalysisAPI();