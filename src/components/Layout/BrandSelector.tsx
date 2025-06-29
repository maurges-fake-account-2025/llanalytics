import React, { useState } from 'react';
import { Building2, Globe, ChevronDown, Tag, X } from 'lucide-react';

interface BrandSelectorProps {
  brandName: string;
  setBrandName: (name: string) => void;
  url: string;
  setUrl: (url: string) => void;
  industry: string;
  setIndustry: (industry: string) => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

const industries = [
  'Technology',
  'E-commerce',
  'Healthcare',
  'Finance',
  'Education',
  'Marketing',
  'Real Estate',
  'Manufacturing',
  'Consulting',
  'SaaS',
  'Media',
  'Travel',
  'Food & Beverage',
  'Fashion',
  'Automotive'
];

const regions = [
  { id: 'global', name: 'Global', flag: '🌍' },
  { id: 'us', name: 'United States', flag: '🇺🇸' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦' },
  { id: 'au', name: 'Australia', flag: '🇦🇺' },
  { id: 'de', name: 'Germany', flag: '🇩🇪' },
  { id: 'fr', name: 'France', flag: '🇫🇷' },
  { id: 'es', name: 'Spain', flag: '🇪🇸' },
  { id: 'it', name: 'Italy', flag: '🇮🇹' },
  { id: 'jp', name: 'Japan', flag: '🇯🇵' }
];

export const BrandSelector: React.FC<BrandSelectorProps> = ({
  brandName,
  setBrandName,
  url,
  setUrl,
  industry,
  setIndustry,
  keywords,
  setKeywords
}) => {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [keywordInput, setKeywordInput] = useState('');

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    console.log('Region changed to:', regionId);
  };

  const handleKeywordAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim() && keywords.length < 3) {
      e.preventDefault();
      const newKeyword = keywordInput.trim();
      if (!keywords.includes(newKeyword)) {
        setKeywords([...keywords, newKeyword]);
      }
      setKeywordInput('');
    }
  };

  const handleKeywordRemove = (indexToRemove: number) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  const currentRegion = regions.find(r => r.id === selectedRegion) || regions[0];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Brand Name"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-500" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Website URL"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select Industry</option>
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Keywords Input */}
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-gray-500" />
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordAdd}
                placeholder={keywords.length < 3 ? "Add keyword (press Enter)" : "Max 3 keywords"}
                disabled={keywords.length >= 3}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                    >
                      {keyword}
                      <button
                        onClick={() => handleKeywordRemove(index)}
                        className="ml-1 text-orange-600 hover:text-orange-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Region Selector */}
        <div className="relative">
          <select
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>
                {region.flag} {region.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};