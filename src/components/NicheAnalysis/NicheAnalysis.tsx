import React from 'react';
import { TrendingUp, TrendingDown, Search, Target, Minus, RefreshCw, AlertCircle, MoreVertical } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAnalysisContext } from '../../contexts/AnalysisContext';

interface NicheAnalysisProps {
  brandName: string;
  url: string;
  industry: string;
}

export const NicheAnalysis: React.FC<NicheAnalysisProps> = ({ brandName, url, industry }) => {
  const { data: analysisData, loading, error, lastAnalyzed, analyzeWebsite } = useAnalysisContext();

  // Transform real data if available - ensure we have exactly 4 platforms
  const brandVisibility = analysisData ? 
    {
      chatgpt: analysisData.brand_visibility.find(item => item.model.toLowerCase() === 'chatgpt')?.mentions || 0,
      perplexity: analysisData.brand_visibility.find(item => item.model.toLowerCase() === 'perplexity')?.mentions || 0,
      claude: analysisData.brand_visibility.find(item => item.model.toLowerCase() === 'claude')?.mentions || 0,
      sge: analysisData.brand_visibility.find(item => item.model.toLowerCase() === 'sge')?.mentions || 0,
    } : 
    {};

  // Extend industry rankings to show top 20, with user's brand if not in top 20
  const getExtendedIndustryRankings = () => {
    if (!analysisData) return [];
    
    const rankings = analysisData.industry_rankings.map((item, index) => ({
      rank: index + 1,
      brand: item.name,
      mentions: item.mentions,
      visibility: Math.round((item.mentions / Math.max(...analysisData.industry_rankings.map(r => r.mentions))) * 100),
      trend: Math.floor(Math.random() * 10) - 5,
      previousRank: index + 1 + Math.floor(Math.random() * 3) - 1,
    }));

    // Check if user's brand is in top 20
    const userBrandIndex = rankings.findIndex(item => item.brand.toLowerCase() === brandName.toLowerCase());
    const top20 = rankings.slice(0, 20);
    
    // If user's brand is not in top 20 but exists in the data, add it with separator
    if (userBrandIndex >= 20) {
      const userBrand = rankings[userBrandIndex];
      return [...top20, { ...userBrand, separator: true }];
    }
    
    return top20;
  };

  const industryRankings = getExtendedIndustryRankings();

  // Get top 5 brands for graph, ensuring user's brand is included if not in top 5
  const getGraphBrands = () => {
    if (!industryRankings.length) return [];
    
    const top5 = industryRankings.slice(0, 5);
    const userBrandInTop5 = top5.find(brand => brand.brand.toLowerCase() === brandName.toLowerCase());
    
    if (!userBrandInTop5) {
      const userBrand = industryRankings.find(brand => brand.brand.toLowerCase() === brandName.toLowerCase());
      if (userBrand) {
        // Replace the 5th brand with user's brand
        return [...top5.slice(0, 4), userBrand];
      }
    }
    
    return top5;
  };

  const graphBrands = getGraphBrands();

  const handleAnalyze = async () => {
    if (!url || !brandName || !industry) {
      alert('Please fill in all brand information first');
      return;
    }

    try {
      await analyzeWebsite({
        category: industry,
        brandName: brandName,
        location: 'Global',
        keywords: [],
        website: url.startsWith('http') ? url : `https://${url}`,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  // Competition trend data over time (generated from current data if available)
  const generateCompetitionData = () => {
    if (!graphBrands.length) return [];
    
    const dates = ['17 Feb', '18 Feb', '19 Feb', '20 Feb', '21 Feb'];
    return dates.map(date => {
      const dataPoint: any = { date };
      graphBrands.forEach(brand => {
        dataPoint[brand.brand] = Math.max(0, brand.visibility + Math.floor(Math.random() * 10) - 5);
      });
      return dataPoint;
    });
  };

  const competitionData = generateCompetitionData();

  const getBrandColor = (brand: string) => {
    const colors = {
      'Louis Vuitton': '#8b5a2b',
      [brandName]: '#ff6b35',
      'Prada': '#000000',
      'Gucci': '#006341',
      'Burberry': '#d4af37',
      'Chanel': '#cc0066',
      'Dior': '#1a1a1a',
      'Versace': '#ffd700',
      'Armani': '#2c3e50',
      'Balenciaga': '#34495e'
    };
    return colors[brand as keyof typeof colors] || '#6b7280';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  // LLM Platform Icons
  const getLLMIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'chatgpt':
        return (
          <div className="w-6 h-6 rounded-lg overflow-hidden">
            <img src="/photo_5404436818792935908_y copy.jpg" alt="ChatGPT" className="w-full h-full object-cover" />
          </div>
        );
      case 'perplexity':
        return (
          <div className="w-6 h-6 rounded-lg overflow-hidden">
            <img src="/photo_5404436818792935911_y copy.jpg" alt="Perplexity" className="w-full h-full object-cover" />
          </div>
        );
      case 'claude':
        return (
          <div className="w-6 h-6 rounded-lg overflow-hidden">
            <img src="/photo_5404436818792935909_y copy.jpg" alt="Claude" className="w-full h-full object-cover" />
          </div>
        );
      case 'sge':
        return (
          <div className="w-6 h-6 rounded-lg overflow-hidden">
            <img src="/985_google_g_icon copy.jpg" alt="Google SGE" className="w-full h-full object-cover" />
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 bg-gray-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
        );
    }
  };

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Competition Data Available</h3>
      <p className="text-gray-600 mb-6">Analyze your website to see how you compare against competitors in the {industry} industry.</p>
      <button
        onClick={handleAnalyze}
        disabled={loading || !url || !brandName || !industry}
        className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Analyzing...' : 'Analyze Competition'}</span>
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header with Analysis Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Niche Analysis</h1>
          <p className="text-gray-600 mt-1">{industry} industry analysis for {brandName}</p>
          {lastAnalyzed && (
            <p className="text-sm text-gray-500 mt-1">Last analyzed: {lastAnalyzed}</p>
          )}
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading || !url || !brandName || !industry}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Analyzing...' : 'Analyze Competition'}</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">Analysis Error</p>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Show empty state if no data and not loading */}
      {!analysisData && !loading && (
        <div className="bg-white rounded-xl border border-gray-200">
          <EmptyState />
        </div>
      )}

      {/* Show data if available or loading */}
      {(analysisData || loading) && (
        <>
          {/* Competition Graph and Rankings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Competition Trend Graph */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Visibility Trend</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <button className="text-orange-600 font-medium border-b-2 border-orange-600 pb-1">Last 7 Days</button>
                  <button className="text-gray-500 hover:text-gray-700">30 Days</button>
                  <button className="text-gray-500 hover:text-gray-700">All Brands</button>
                </div>
              </div>
              
              {loading ? (
                <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
              ) : competitionData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={competitionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#6b7280"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="#6b7280" 
                        tick={{ fontSize: 12 }}
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      {graphBrands.map((brand, index) => (
                        <Line 
                          key={brand.brand}
                          type="monotone" 
                          dataKey={brand.brand} 
                          stroke={getBrandColor(brand.brand)} 
                          strokeWidth={brand.brand === brandName ? 4 : 2}
                          dot={{ fill: getBrandColor(brand.brand), strokeWidth: 2, r: brand.brand === brandName ? 5 : 3 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  No trend data available
                </div>
              )}
            </div>

            {/* Industry Rankings - Top 20 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Ranking</h3>
                <p className="text-sm text-gray-600">Top 20 brands with highest visibility</p>
              </div>
              
              {loading ? (
                <div className="space-y-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : industryRankings.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-200 sticky top-0 bg-white">
                    <div className="col-span-1 text-right">#</div>
                    <div className="col-span-4">Brand</div>
                    <div className="col-span-3 text-right">Visibility</div>
                    <div className="col-span-2 text-right">Previous</div>
                    <div className="col-span-2 text-right">Trend</div>
                  </div>
                  
                  {industryRankings.map((item, index) => (
                    <div key={index}>
                      {/* Show separator dots if this is the user's brand and not in top 20 */}
                      {item.separator && (
                        <div className="flex items-center justify-center py-4">
                          <div className="flex flex-col items-center space-y-1">
                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                          </div>
                        </div>
                      )}
                      
                      <div className={`grid grid-cols-12 gap-2 items-center py-3 rounded-lg hover:bg-gray-50 transition-colors ${
                        item.brand === brandName ? 'bg-orange-50 border-2 border-orange-200 mx-1' : ''
                      }`}>
                        <div className="col-span-1 flex items-center justify-end">
                          <span className="font-bold text-gray-900 tabular-nums">{item.rank}</span>
                        </div>
                        
                        <div className="col-span-4 flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: getBrandColor(item.brand) }}
                          ></div>
                          <span className={`font-medium ${
                            item.brand === brandName ? 'text-orange-700' : 'text-gray-900'
                          }`}>
                            {item.brand}
                            {item.brand === brandName && <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">You</span>}
                          </span>
                        </div>
                        
                        <div className="col-span-3 text-right">
                          <span className="font-medium text-gray-900 tabular-nums">{item.visibility}%</span>
                        </div>
                        
                        <div className="col-span-2 text-right">
                          <span className="text-gray-600 tabular-nums">#{item.previousRank}</span>
                        </div>
                        
                        <div className="col-span-2 flex items-center justify-end space-x-1">
                          {getTrendIcon(item.trend)}
                          <span className={`text-sm font-medium tabular-nums ${getTrendColor(item.trend)}`}>
                            {item.trend > 0 ? `+${item.trend}%` : item.trend < 0 ? `${item.trend}%` : '0%'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No ranking data available
                </div>
              )}
            </div>
          </div>

          {/* Brand Visibility in LLMs - Fixed 4 platforms */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Brand Visibility in Top LLMs</h3>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : Object.keys(brandVisibility).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { key: 'chatgpt', name: 'ChatGPT' },
                    { key: 'perplexity', name: 'Perplexity' },
                    { key: 'claude', name: 'Claude' },
                    { key: 'sge', name: 'Google SGE' }
                  ].map(({ key, name }) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{name}</h4>
                        {getLLMIcon(key)}
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Mentions</span>
                          <span className="font-bold text-orange-600 tabular-nums">{Math.round(brandVisibility[key as keyof typeof brandVisibility])}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.round(brandVisibility[key as keyof typeof brandVisibility])}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No LLM visibility data available
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};