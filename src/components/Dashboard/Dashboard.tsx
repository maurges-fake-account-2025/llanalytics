import React from 'react';
import { Bot, TrendingUp, Eye, BarChart3, RefreshCw, AlertCircle, Clock, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAnalysisContext } from '../../contexts/AnalysisContext';

interface DashboardProps {
  brandName: string;
  url: string;
  industry: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ brandName, url, industry }) => {
  const { data: analysisData, loading, error, isRateLimit, lastAnalyzed, analyzeWebsite } = useAnalysisContext();

  // Use real data if available, otherwise show empty state
  const displayData = analysisData ? {
    llmCitations: { 
      total: analysisData.llm_citations,
      breakdown: analysisData.brand_visibility.reduce((acc, item) => {
        acc[item.model.toLowerCase()] = Math.round(item.mentions);
        return acc;
      }, {} as Record<string, number>)
    },
    avgSummarizability: analysisData.avg_summarizability,
    aiVisibilityScore: analysisData.ai_visibility,
    avgPosition: analysisData.avg_position,
  } : null;

  // Generate trend data based on current values (if available)
  const generateTrendData = (currentValue: number, label: string) => {
    if (!currentValue) return [];
    return [
      { date: 'Mon', value: Math.max(0, currentValue - Math.floor(Math.random() * 10)) },
      { date: 'Tue', value: Math.max(0, currentValue - Math.floor(Math.random() * 7)) },
      { date: 'Wed', value: Math.max(0, currentValue - Math.floor(Math.random() * 5)) },
      { date: 'Thu', value: Math.max(0, currentValue - Math.floor(Math.random() * 3)) },
      { date: 'Fri', value: currentValue },
      { date: 'Sat', value: Math.max(0, currentValue + Math.floor(Math.random() * 3)) },
      { date: 'Sun', value: currentValue }
    ];
  };

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

  // LLM Platform Icons
  const getLLMIcon = (platform: string, size: string = 'w-6 h-6') => {
    switch (platform.toLowerCase()) {
      case 'chatgpt':
        return (
          <div className={`${size} rounded-lg overflow-hidden`}>
            <img src="/photo_5404436818792935908_y copy.jpg" alt="ChatGPT" className="w-full h-full object-cover" />
          </div>
        );
      case 'perplexity':
        return (
          <div className={`${size} rounded-lg overflow-hidden`}>
            <img src="/photo_5404436818792935911_y copy.jpg" alt="Perplexity" className="w-full h-full object-cover" />
          </div>
        );
      case 'claude':
        return (
          <div className={`${size} rounded-lg overflow-hidden`}>
            <img src="/photo_5404436818792935909_y copy.jpg" alt="Claude" className="w-full h-full object-cover" />
          </div>
        );
      case 'sge':
        return (
          <div className={`${size} rounded-lg overflow-hidden`}>
            <img src="/985_google_g_icon copy.jpg" alt="Google SGE" className="w-full h-full object-cover" />
          </div>
        );
      default:
        return (
          <div className={`${size} bg-gray-600 rounded-lg flex items-center justify-center`}>
            <span className="text-white text-xs font-bold">AI</span>
          </div>
        );
    }
  };

  const MetricCard = ({ title, value, change, changeLabel, data, color, icon: Icon, suffix = '', loading: isLoading = false }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color === 'orange' ? 'bg-orange-100' : color === 'sky' ? 'bg-sky-100' : 'bg-purple-100'}`}>
            <Icon className={`w-5 h-5 ${color === 'orange' ? 'text-orange-600' : color === 'sky' ? 'text-sky-600' : 'text-purple-600'}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-baseline space-x-2">
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : value !== null && value !== undefined ? (
                <p className="text-2xl font-bold text-gray-900">{value}{suffix}</p>
              ) : (
                <p className="text-2xl font-bold text-gray-400">--</p>
              )}
              {change && !isLoading && value !== null && (
                <div className={`flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">{change > 0 ? '+' : ''}{change}{changeLabel}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {data && data.length > 0 && (
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={
                    color === 'orange' ? '#ff6b35' : 
                    color === 'sky' ? '#0ea5e9' : '#8b5cf6'
                  } stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={
                    color === 'orange' ? '#ff6b35' : 
                    color === 'sky' ? '#0ea5e9' : '#8b5cf6'
                  } stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={
                  color === 'orange' ? '#ff6b35' : 
                  color === 'sky' ? '#0ea5e9' : '#8b5cf6'
                }
                strokeWidth={2}
                fill={`url(#gradient-${color})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );

  const LLMCard = ({ platform, value, data, color }: any) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getLLMIcon(platform, 'w-5 h-5')}
          <div>
            <p className="text-sm font-medium text-gray-600">{platform}</p>
            {loading ? (
              <div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
            ) : value !== null && value !== undefined ? (
              <p className="text-xl font-bold text-gray-900">{value}%</p>
            ) : (
              <p className="text-xl font-bold text-gray-400">--</p>
            )}
          </div>
        </div>
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
      </div>
      {data && data.length > 0 && (
        <div className="h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={
                  color === 'bg-green-500' ? '#10b981' : 
                  color === 'bg-orange-500' ? '#ff6b35' : 
                  color === 'bg-purple-500' ? '#8b5cf6' : '#0ea5e9'
                }
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Data Available</h3>
      <p className="text-gray-600 mb-6">Click "Analyze Website" to get real-time insights about your brand's AI visibility.</p>
      <button
        onClick={handleAnalyze}
        disabled={loading || !url || !brandName || !industry}
        className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Analyzing...' : 'Analyze Website'}</span>
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header with Analysis Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">AI visibility and performance overview for {brandName}</p>
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
          <span>{loading ? 'Analyzing...' : 'Analyze Website'}</span>
        </button>
      </div>

      {/* Rate Limit Error Display */}
      {isRateLimit && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium">Rate Limit Reached</p>
              <p className="text-amber-700 text-sm mt-1">
                You've reached the maximum number of analysis requests for now. Please try again in a few minutes.
              </p>
              <div className="mt-3 flex items-center space-x-2 text-amber-700">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Tip: Upgrade to Pro for higher rate limits and priority processing</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Error Display */}
      {error && !isRateLimit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">Analysis Error</p>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Show empty state if no data */}
      {!analysisData && !loading && (
        <div className="bg-white rounded-xl border border-gray-200">
          <EmptyState />
        </div>
      )}

      {/* Show data if available */}
      {(analysisData || loading) && (
        <>
          {/* Main Metrics with Integrated Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MetricCard
              title="LLM Citations"
              value={displayData?.llmCitations.total}
              change={null}
              changeLabel=""
              data={displayData ? generateTrendData(displayData.llmCitations.total, 'citations') : []}
              color="orange"
              icon={Bot}
              loading={loading}
            />

            <MetricCard
              title="Avg Summarizability"
              value={displayData?.avgSummarizability}
              change={null}
              changeLabel=""
              data={displayData ? generateTrendData(displayData.avgSummarizability, 'summarizability') : []}
              color="purple"
              icon={BarChart3}
              loading={loading}
            />

            <MetricCard
              title="AI Visibility Score"
              value={displayData?.aiVisibilityScore}
              change={null}
              changeLabel=""
              data={displayData ? generateTrendData(displayData.aiVisibilityScore, 'visibility') : []}
              color="sky"
              icon={Eye}
              loading={loading}
            />
          </div>

          {/* LLM Citations Breakdown */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">LLM Citations Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <LLMCard
                platform="ChatGPT"
                value={displayData?.llmCitations.breakdown.chatgpt}
                data={displayData ? generateTrendData(displayData.llmCitations.breakdown.chatgpt || 0, 'chatgpt') : []}
                color="bg-green-500"
              />
              <LLMCard
                platform="Perplexity"
                value={displayData?.llmCitations.breakdown.perplexity}
                data={displayData ? generateTrendData(displayData.llmCitations.breakdown.perplexity || 0, 'perplexity') : []}
                color="bg-orange-500"
              />
              <LLMCard
                platform="Claude"
                value={displayData?.llmCitations.breakdown.claude}
                data={displayData ? generateTrendData(displayData.llmCitations.breakdown.claude || 0, 'claude') : []}
                color="bg-purple-500"
              />
              <LLMCard
                platform="Google SGE"
                value={displayData?.llmCitations.breakdown.sge}
                data={displayData ? generateTrendData(displayData.llmCitations.breakdown.sge || 0, 'sge') : []}
                color="bg-sky-500"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};