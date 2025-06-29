import React, { useState } from 'react';
import { HelpCircle, CheckCircle, AlertTriangle, Clock, Target, Globe, Users, Zap, Palette, Link, Share2, ExternalLink, FileText, Calendar, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { useAnalysisContext } from '../../contexts/AnalysisContext';

interface OptimizationProps {
  brandName: string;
  url: string;
  industry: string;
}

interface OptimizationFactor {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  weight: number;
  backendKey: string;
}

interface OptimizationItem {
  id: string;
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  section: string;
}

export const Optimization: React.FC<OptimizationProps> = ({ brandName, url, industry }) => {
  const { data: analysisData, loading, error, isRateLimit, lastAnalyzed, analyzeWebsite } = useAnalysisContext();
  const [hoveredFactor, setHoveredFactor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const optimizationFactors: OptimizationFactor[] = [
    {
      id: 'content-quality',
      name: 'Content Quality & Structure',
      score: 78,
      maxScore: 10,
      description: 'Create listicles, comparisons, FAQ sections with clear structure, bullets, and long-form useful content.',
      icon: FileText,
      color: 'blue',
      weight: 20,
      backendKey: 'Content Quality & Structure'
    },
    {
      id: 'external-sources',
      name: 'Trusted External Sources',
      score: 65,
      maxScore: 10,
      description: 'Get listed on Wikipedia, Crunchbase, G2, industry directories with accurate, LLM-readable descriptions.',
      icon: ExternalLink,
      color: 'green',
      weight: 15,
      backendKey: 'Trusted External Sources'
    },
    {
      id: 'intent-keywords',
      name: 'Intent-Mapped Keywords & Pages',
      score: 72,
      maxScore: 10,
      description: 'Create pages for "Best X for Y", "Alternatives to Brand", use natural phrasing in headings.',
      icon: Target,
      color: 'purple',
      weight: 15,
      backendKey: 'Intent-Mapped Keywords & Pages'
    },
    {
      id: 'freshness',
      name: 'Freshness & Update Frequency',
      score: 45,
      maxScore: 10,
      description: 'Publish 2-4 new posts monthly, update old content every 3-6 months, add 2024/2025 in titles.',
      icon: Calendar,
      color: 'yellow',
      weight: 10,
      backendKey: 'Freshness & Update Frequency'
    },
    {
      id: 'internal-linking',
      name: 'Internal Linking & Structure',
      score: 68,
      maxScore: 10,
      description: 'Ensure clear H1→H2→H3 hierarchy, add jump links, related posts blocks, avoid duplicate H1s.',
      icon: Link,
      color: 'indigo',
      weight: 10,
      backendKey: 'Internal Linking & Structure'
    },
    {
      id: 'backlink-diversity',
      name: 'Backlink Diversity',
      score: 54,
      maxScore: 10,
      description: 'Target backlinks from media, niche blogs, educational sites, forums with diverse anchor text.',
      icon: TrendingUp,
      color: 'orange',
      weight: 10,
      backendKey: 'Backlink Diversity'
    },
    {
      id: 'page-accessibility',
      name: 'Page Accessibility',
      score: 82,
      maxScore: 10,
      description: 'Lighthouse score >85, compress images/JS, mobile-friendly, HTTPS, no robots.txt blocking.',
      icon: Zap,
      color: 'red',
      weight: 8,
      backendKey: 'Page Accessibility (speed, mobile, crawlability)'
    },
    {
      id: 'schema-data',
      name: 'Schema & Structured Data',
      score: 75,
      maxScore: 10,
      description: 'Add schema for articles, FAQ, products, reviews using Google Rich Results Test.',
      icon: Globe,
      color: 'teal',
      weight: 5,
      backendKey: 'Schema & Structured Data'
    },
    {
      id: 'social-mentions',
      name: 'Social Mentions',
      score: 43,
      maxScore: 10,
      description: 'Get discussed on Reddit, Twitter/X, IndieHackers with real commentary and branded hashtags.',
      icon: Share2,
      color: 'pink',
      weight: 4,
      backendKey: 'Social Mentions'
    },
    {
      id: 'ux-design',
      name: 'UX/UI Visual Design',
      score: 88,
      maxScore: 10,
      description: 'Clear CTAs, fast interface, readable spacing/fonts, no dark patterns or blocking modals.',
      icon: Palette,
      color: 'cyan',
      weight: 3,
      backendKey: 'UX/UI Visual Design'
    }
  ];

  // Update scores with real data from backend if available
  const getUpdatedFactors = () => {
    if (!analysisData?.visibility) {
      return optimizationFactors;
    }

    return optimizationFactors.map(factor => ({
      ...factor,
      score: analysisData.visibility[factor.backendKey as keyof typeof analysisData.visibility] || factor.score
    }));
  };

  const updatedFactors = getUpdatedFactors();

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

  const optimizationItems: OptimizationItem[] = [
    // Content Quality & Structure (20%)
    {
      id: '1',
      title: 'Create Comparison and Listicle Content',
      description: 'Develop "Best CRM Software 2024", "Top 10 Project Management Tools" style content with clear comparisons, bullet points, and structured formatting that LLMs can easily extract and cite.',
      priority: 'High',
      category: 'content-quality',
      section: 'Content Quality & Structure'
    },
    {
      id: '2',
      title: 'Add FAQ Sections to Key Pages',
      description: 'Implement comprehensive FAQ sections on pricing, features, and support pages. Structure with clear questions and concise answers that match user search intents and voice queries.',
      priority: 'High',
      category: 'content-quality',
      section: 'Content Quality & Structure'
    },
    {
      id: '3',
      title: 'Optimize Content Structure with Bullets and Headings',
      description: 'Restructure existing content to use clear H1→H2→H3 hierarchy, bullet points, bold text, and short paragraphs. Add internal links to related topics for better content connectivity.',
      priority: 'Medium',
      category: 'content-quality',
      section: 'Content Quality & Structure'
    },
    {
      id: '4',
      title: 'Expand Content to Long-form Comprehensive Guides',
      description: 'Transform existing short articles into comprehensive 2000+ word guides that cover topics in depth. Include examples, case studies, and actionable advice that provides real value.',
      priority: 'Medium',
      category: 'content-quality',
      section: 'Content Quality & Structure'
    },

    // Trusted External Sources (15%)
    {
      id: '5',
      title: 'Get Listed on Industry Directories',
      description: `Submit ${brandName} to relevant industry directories like G2, Capterra, ProductHunt, and ${industry.toLowerCase()} specific platforms. Ensure descriptions are accurate and optimized for LLM extraction.`,
      priority: 'High',
      category: 'external-sources',
      section: 'Trusted External Sources'
    },
    {
      id: '6',
      title: 'Create Wikipedia Presence',
      description: 'Research if your company qualifies for a Wikipedia page or can be mentioned in relevant industry articles. Ensure all information is factual, well-sourced, and follows Wikipedia guidelines.',
      priority: 'Medium',
      category: 'external-sources',
      section: 'Trusted External Sources'
    },
    {
      id: '7',
      title: 'Optimize Crunchbase and Business Profiles',
      description: 'Complete and optimize your Crunchbase profile with detailed company information, funding details, and key personnel. Ensure consistency across all business directory listings.',
      priority: 'Medium',
      category: 'external-sources',
      section: 'Trusted External Sources'
    },
    {
      id: '8',
      title: 'Engage in Reddit and Community Discussions',
      description: 'Participate authentically in relevant Reddit communities, Hacker News discussions, and industry forums. Share valuable insights and mention your brand naturally when relevant.',
      priority: 'Low',
      category: 'external-sources',
      section: 'Trusted External Sources'
    },

    // Intent-Mapped Keywords & Pages (15%)
    {
      id: '9',
      title: 'Create "Best X for Y" Landing Pages',
      description: `Develop targeted pages like "Best ${industry} Software for Small Business", "Best CRM for Startups" using natural, user-like phrasing in H1/H2 tags that match search intents.`,
      priority: 'High',
      category: 'intent-keywords',
      section: 'Intent-Mapped Keywords & Pages'
    },
    {
      id: '10',
      title: 'Build Alternative and Competitor Pages',
      description: 'Create "Alternatives to [Competitor]" pages that provide honest comparisons and highlight your unique value propositions. Focus on user goals rather than just features.',
      priority: 'High',
      category: 'intent-keywords',
      section: 'Intent-Mapped Keywords & Pages'
    },
    {
      id: '11',
      title: 'Develop Use Case Specific Pages',
      description: `Create pages targeting specific use cases like "${industry} tools for remote teams", "Project management for agencies" with clear user goal alignment and topic clustering.`,
      priority: 'Medium',
      category: 'intent-keywords',
      section: 'Intent-Mapped Keywords & Pages'
    },

    // Freshness & Update Frequency (10%)
    {
      id: '12',
      title: 'Establish Regular Publishing Schedule',
      description: 'Implement a content calendar to publish 2-4 new blog posts per month. Focus on trending topics, industry updates, and evergreen content that maintains relevance over time.',
      priority: 'High',
      category: 'freshness',
      section: 'Freshness & Update Frequency'
    },
    {
      id: '13',
      title: 'Update Existing Content Quarterly',
      description: 'Review and update old content every 3-6 months. Add current statistics, refresh examples, update screenshots, and add "Updated 2024" to titles where relevant.',
      priority: 'Medium',
      category: 'freshness',
      section: 'Freshness & Update Frequency'
    },
    {
      id: '14',
      title: 'Add Publication and Update Dates',
      description: 'Prominently display last update dates on all content. This signals freshness to both users and LLMs, improving trust and citation likelihood.',
      priority: 'Low',
      category: 'freshness',
      section: 'Freshness & Update Frequency'
    },

    // Internal Linking & Structure (10%)
    {
      id: '15',
      title: 'Fix Heading Hierarchy Issues',
      description: 'Audit all pages to ensure proper H1→H2→H3 structure. Fix pages with multiple H1s, missing headings, or chaotic nesting that confuses both users and crawlers.',
      priority: 'High',
      category: 'internal-linking',
      section: 'Internal Linking & Structure'
    },
    {
      id: '16',
      title: 'Add In-Article Jump Links',
      description: 'Implement table of contents with jump links for long-form content. This improves user experience and helps LLMs understand content structure and key sections.',
      priority: 'Medium',
      category: 'internal-linking',
      section: 'Internal Linking & Structure'
    },
    {
      id: '17',
      title: 'Create Related Posts Blocks',
      description: 'Add contextual "Related Articles" sections to blog posts and key pages. Use semantic relationships to suggest relevant content and improve site engagement.',
      priority: 'Medium',
      category: 'internal-linking',
      section: 'Internal Linking & Structure'
    },

    // Backlink Diversity (10%)
    {
      id: '18',
      title: 'Target Industry Media Publications',
      description: `Reach out to ${industry.toLowerCase()} publications, trade magazines, and industry blogs for guest posting opportunities and expert commentary. Focus on providing valuable insights rather than promotional content.`,
      priority: 'High',
      category: 'backlink-diversity',
      section: 'Backlink Diversity'
    },
    {
      id: '19',
      title: 'Engage with Educational and Government Sites',
      description: 'Identify opportunities to contribute to educational resources, government databases, or research publications relevant to your industry. These high-authority links are valuable for LLM training data.',
      priority: 'Medium',
      category: 'backlink-diversity',
      section: 'Backlink Diversity'
    },
    {
      id: '20',
      title: 'Use HARO and Expert Positioning',
      description: 'Sign up for Help a Reporter Out (HARO) and similar services to provide expert quotes and insights. Monitor anchor text diversity to maintain natural link profiles.',
      priority: 'Medium',
      category: 'backlink-diversity',
      section: 'Backlink Diversity'
    },

    // Page Accessibility (8%)
    {
      id: '21',
      title: 'Achieve Lighthouse Score Above 85',
      description: 'Optimize Core Web Vitals to achieve Lighthouse performance scores above 85. Focus on LCP, FID, and CLS improvements through image optimization and code splitting.',
      priority: 'High',
      category: 'page-accessibility',
      section: 'Page Accessibility'
    },
    {
      id: '22',
      title: 'Implement Mobile-First Design',
      description: 'Ensure all pages are fully responsive and mobile-friendly. Test touch targets, viewport settings, and mobile user experience across different devices.',
      priority: 'Medium',
      category: 'page-accessibility',
      section: 'Page Accessibility'
    },
    {
      id: '23',
      title: 'Verify Crawlability for LLM Bots',
      description: 'Check robots.txt to ensure LLM bots (GPTBot, ChatGPT-User, etc.) are not blocked. Implement proper HTTPS, fix redirect chains, and ensure clean URL structure.',
      priority: 'Medium',
      category: 'page-accessibility',
      section: 'Page Accessibility'
    },

    // Schema & Structured Data (5%)
    {
      id: '24',
      title: 'Implement Article Schema Markup',
      description: 'Add JSON-LD structured data for all blog posts and articles. Include author information, publication date, and article body markup for better LLM understanding.',
      priority: 'High',
      category: 'schema-data',
      section: 'Schema & Structured Data'
    },
    {
      id: '25',
      title: 'Add Product and Review Schema',
      description: 'Implement product schema for software features and review schema for customer testimonials. Use Google Rich Results Test to validate all markup.',
      priority: 'Medium',
      category: 'schema-data',
      section: 'Schema & Structured Data'
    },

    // Social Mentions (4%)
    {
      id: '26',
      title: 'Build Reddit Community Presence',
      description: 'Actively participate in relevant subreddits by sharing valuable insights and engaging in discussions. Share blog posts with thoughtful commentary rather than just links.',
      priority: 'Medium',
      category: 'social-mentions',
      section: 'Social Mentions'
    },
    {
      id: '27',
      title: 'Encourage User-Generated Content',
      description: 'Create campaigns to encourage customers to post about your product on social media. Develop branded hashtags and share customer success stories.',
      priority: 'Low',
      category: 'social-mentions',
      section: 'Social Mentions'
    },

    // UX/UI Design (3%)
    {
      id: '28',
      title: 'Optimize Call-to-Action Placement',
      description: 'Review and optimize CTA placement, copy, and design. Ensure clear value propositions and remove any dark patterns that might frustrate users or block content.',
      priority: 'Medium',
      category: 'ux-design',
      section: 'UX/UI Visual Design'
    },
    {
      id: '29',
      title: 'Improve Typography and Readability',
      description: 'Optimize font sizes, line spacing, and contrast ratios for better readability. Ensure content is easily scannable with proper white space and visual hierarchy.',
      priority: 'Low',
      category: 'ux-design',
      section: 'UX/UI Visual Design'
    }
  ];

  // Calculate overall score using the LLM visibility formula with real data
  const calculateOverallScore = () => {
    const factorMap = {
      'content-quality': 0.20,
      'external-sources': 0.15,
      'intent-keywords': 0.15,
      'freshness': 0.10,
      'internal-linking': 0.10,
      'backlink-diversity': 0.10,
      'page-accessibility': 0.08,
      'schema-data': 0.05,
      'social-mentions': 0.04,
      'ux-design': 0.03
    };

    const weightedSum = updatedFactors.reduce((sum, factor) => {
      const weight = factorMap[factor.id as keyof typeof factorMap] || 0;
      // Convert score to percentage (score/maxScore * 100) then apply weight
      const percentage = (factor.score / factor.maxScore) * 100;
      return sum + (percentage * weight);
    }, 0);

    return Math.round(weightedSum);
  };

  const overallScore = calculateOverallScore();

  const categories = ['All', 'content-quality', 'external-sources', 'intent-keywords', 'freshness', 'internal-linking', 'backlink-diversity', 'page-accessibility', 'schema-data', 'social-mentions', 'ux-design'];

  const filteredItems = selectedCategory === 'All' 
    ? optimizationItems 
    : optimizationItems.filter(item => item.category === selectedCategory);

  // Group items by section
  const groupedItems = filteredItems.reduce((groups, item) => {
    const section = item.section;
    if (!groups[section]) {
      groups[section] = [];
    }
    groups[section].push(item);
    return groups;
  }, {} as Record<string, typeof optimizationItems>);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFactorClick = (factorId: string) => {
    setSelectedCategory(factorId);
  };

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Optimization Data Available</h3>
      <p className="text-gray-600 mb-6">Analyze your website to get personalized optimization recommendations based on real data.</p>
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
    <div className="space-y-6">
      {/* Header with Analysis Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Optimization</h1>
          <p className="text-gray-600 mt-1">LLM-focused optimization checklist for {brandName}</p>
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

      {/* Show empty state if no data and not loading */}
      {!analysisData && !loading && (
        <div className="bg-white rounded-xl border border-gray-200">
          <EmptyState />
        </div>
      )}

      {/* Show data if available or loading */}
      {(analysisData || loading) && (
        <>
          {/* Overall Score */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">LLM Visibility Score</h2>
                <p className="text-blue-100 text-sm">Weighted score optimized for AI search visibility</p>
              </div>
              <div className="text-right">
                {loading ? (
                  <div className="h-12 w-16 bg-white bg-opacity-20 rounded animate-pulse"></div>
                ) : (
                  <>
                    <div className="text-4xl font-bold mb-1">{overallScore}</div>
                    <div className="text-lg text-blue-100">/ 100</div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: loading ? '0%' : `${overallScore}%` }}
              ></div>
            </div>
          </div>

          {/* Optimization Factors Grid - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {updatedFactors.map((factor) => {
              const Icon = factor.icon;
              const percentage = Math.round((factor.score / factor.maxScore) * 100);
              
              return (
                <div 
                  key={factor.id}
                  className={`bg-white p-3 rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer relative ${
                    selectedCategory === factor.id ? 'ring-2 ring-blue-500 border-blue-300' : ''
                  }`}
                  onMouseEnter={() => setHoveredFactor(factor.id)}
                  onMouseLeave={() => setHoveredFactor(null)}
                  onClick={() => handleFactorClick(factor.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 bg-gray-100 rounded-lg">
                      <Icon className="w-3 h-3 text-gray-600" />
                    </div>
                    <div className="relative">
                      <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                      {hoveredFactor === factor.id && (
                        <div className="absolute right-0 top-5 w-72 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
                          {factor.description}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 text-xs leading-tight">{factor.name}</h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    {loading ? (
                      <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">{factor.score}</span>
                    )}
                    <span className={`text-sm font-medium ${
                      loading ? 'text-gray-400' :
                      percentage >= 80 ? 'text-green-600' :
                      percentage >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {loading ? '--' : `${percentage}%`}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        loading ? 'bg-gray-300' :
                        percentage >= 80 ? 'bg-green-500' :
                        percentage >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: loading ? '0%' : `${percentage}%` }}
                    ></div>
                  </div>
                  
                  {selectedCategory === factor.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Filter Info */}
          {selectedCategory !== 'All' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <p className="text-blue-900 font-medium text-sm">
                  Showing tasks for: {updatedFactors.find(f => f.id === selectedCategory)?.name}
                </p>
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Show All Tasks
                </button>
              </div>
            </div>
          )}

          {/* Optimization Checklist by Sections */}
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([section, items]) => (
              <div key={section} className="bg-white rounded-xl border border-gray-200">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">{section}</h3>
                  <p className="text-sm text-gray-600 mt-1">{items.length} optimization tasks</p>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                          {/* Title/Task - Column 1 */}
                          <div className="lg:col-span-1">
                            <h4 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h4>
                          </div>
                          
                          {/* Description - Column 2 */}
                          <div className="lg:col-span-2">
                            <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                          </div>
                          
                          {/* Priority Tag - Column 3 (Centered at top) */}
                          <div className="lg:col-span-1 flex justify-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};