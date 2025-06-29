import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Star,
  Check,
  ArrowRight,
  Sparkles,
  Brain,
  Bot,
  Zap,
  Search,
  Globe,
  Target,
  Eye
} from 'lucide-react'
import WaitlistModal from './WaitlistModal'
import { WavyBackground } from './ui/wavy-background'
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input'

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0)

  const platforms = [
    { 
      name: 'ChatGPT', 
      logo: '/gpt logo.png',
      gradient: 'from-green-500 to-teal-500'
    },
    { 
      name: 'Mistral', 
      logo: '/mistral-color.png',
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      name: 'Claude', 
      logo: '/claude-color.png',
      gradient: 'from-orange-400 to-amber-500'
    },
    { 
      name: 'Perplexity', 
      logo: '/perplexity-color.png',
      gradient: 'from-cyan-400 to-blue-500'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatformIndex((prevIndex) => (prevIndex + 1) % platforms.length)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [platforms.length])

  const handleGetStarted = () => {
    setSelectedPlan('')
    setShowWaitlistModal(true)
  }

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName)
    setShowWaitlistModal(true)
  }

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "LLMs Visibility Reports",
      description: "Track your brand's ranking with detailed analytics and insights.",
      gradient: "from-orange-100 to-red-100",
      screenshot: "/1.png"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      title: "Competitor & Trend Insights",
      description: "Monitor competitor performance and identify emerging trends in AI-generated recommendations.",
      gradient: "from-amber-100 to-orange-100",
      screenshot: "/Group 2 copy copy copy.png"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-red-600" />,
      title: "Optimizations Suggestion",
      description: "Get smart optimizations to help your brand get discovered, trusted, and chosen.",
      gradient: "from-red-100 to-pink-100",
      screenshot: "/screencapture_melodic_gingersnap_66c14b_netlify_app_2025_06_28_17 2 (1).png"
    }
  ]

  const stats = [
    { value: "73%", label: "of GenZ consumers use AI for a search" },
    { value: "3x", label: "higher conversion rates for top-ranked brands" },
    { value: "42%", label: "increase in brand awareness from AI visibility" }
  ]

  const pricingPlans = [
    {
      name: "Starter",
      description: "Ideal for growing brands",
      oldPrice: 99,
      newPrice: 69,
      discount: 30,
      features: [
        "25 AI prompts daily",
        "ChatGPT/Claude/Perplexity/Mistral tracking",
        "Basic sentiment analysis",
        "3 countries tracking",
        "2 team seats",
        "Email support",
        "Daily tracking updates"
      ]
    },
    {
      name: "Pro",
      description: "Designed for established brands",
      oldPrice: 199,
      newPrice: 159,
      discount: 20,
      popular: true,
      features: [
        "100 AI prompts daily",
        "ChatGPT/Claude/Perplexity/Mistral tracking",
        "Advanced sentiment & competitor analysis",
        "5 countries tracking",
        "5 team seats",
        "Email + Slack support",
        "Custom brand keywords"
      ]
    },
    {
      name: "Enterprise",
      description: "Tailored for enterprises",
      oldPrice: 459,
      newPrice: 399,
      discount: 13,
      features: [
        "300 AI prompts daily",
        "Full AI platform coverage",
        "Complete sentiment intelligence",
        "10 countries tracking",
        "Unlimited team seats",
        "Email + Slack + Phone support",
        "Custom integrations",
        "Dedicated GEO specialist",
        "Implementation support"
      ]
    }
  ]

  const currentPlatform = platforms[currentPlatformIndex]

  // Placeholders for the interactive input
  const placeholders = [
    "Cool Parisian streetwear brands?",
    "Which brands in lux are the most eco-friendly?",
    "Which car model are trending in NY right now?",
    "Best hotel to book for a weekend in Venice",
    "Buy powerful but affordable AC near Austin?",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Know Your Position in{' '}
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent font-extrabold animate-pulse">
                  AI Search Results
                </span>
              </h1>
              <div className="text-xl text-gray-600 mb-8 leading-relaxed">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-gray-600">Track your brand's ranking across</span>
                  <div className="relative inline-block min-w-[200px] h-[1.5em]">
                    <span 
                      className={`inline-flex items-center space-x-2 font-bold bg-gradient-to-r ${currentPlatform.gradient} bg-clip-text text-transparent transition-all duration-500 ease-in-out absolute left-0 top-1`}
                      key={currentPlatformIndex}
                      style={{
                        animation: 'slideInFromLeft 0.5s ease-in-out'
                      }}
                    >
                      <span>{currentPlatform.name}</span>
                      <img 
                        src={currentPlatform.logo} 
                        alt={`${currentPlatform.name} logo`}
                        className="w-6 h-6 object-contain"
                      />
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600">Monitor AI visibility, competitor insights, and improve it with data-driven insights</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-center px-2">
                  <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">73%</div>
                  <div className="text-xs md:text-sm text-gray-600">of GenZ consumers use AI for a search</div>
                </div>
                <div className="text-center px-2">
                  <div className="text-2xl md:text-3xl font-bold text-red-600 mb-1">3x</div>
                  <div className="text-xs md:text-sm text-gray-600">higher conversion rates for top-ranked brands</div>
                </div>
                <div className="text-center px-2">
                  <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">42%</div>
                  <div className="text-xs md:text-sm text-gray-600">increase in brand awareness from AI visibility</div>
                </div>
              </div>

              {/* Launching Text with Discount */}
              <div className="mb-6 flex items-center space-x-4">
                <p className="text-orange-600 font-medium">
                  <span className="rocket-shake">🚀</span> Launching August 2025
                </p>
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  30% OFF Early Access
                </div>
              </div>

              {/* CTA Button */}
              <div className="max-w-md">
                <button
                  onClick={handleGetStarted}
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Optimize your search visibility now
                </button>
              </div>
            </div>

            {/* Right Column - Tablet Mockup */}
            <div className="relative">
              <div className="tablet-container">
                {/* Tablet Frame */}
                <div className="relative mx-auto w-full max-w-2xl">
                  <div className="bg-gray-800 rounded-[2.5rem] p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                    <div className="bg-black rounded-[2rem] p-1">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        {/* Dashboard Screenshot */}
                        <div className="dashboard-scroll">
                          <img 
                            src="/screencapture_melodic_gingersnap_66c14b_netlify_app_2025_06_28_17 (3) 1.png" 
                            alt="Promptaize Dashboard - AI Visibility Tracking Interface"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Redesigned */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three powerful features that give your brand the AI search ranking advantage
            </p>
          </div>

          <div className="space-y-20">
            {features.map((feature, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Text Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{feature.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">{feature.description}</p>
                  
                  {/* Feature highlights based on the type */}
                  <div className="space-y-4">
                    {index === 0 && (
                      <>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-700">ChatGPT, Claude & Perplexity, Mistral search results</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-700">Detailed analytics and performance metrics</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-700">Historical data and trend analysis</span>
                        </div>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-700">Industry ranking and competitive analysis</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-700">Visibility trends and market insights</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-700">Brand positioning analysis</span>
                        </div>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-700">AI-focused optimization checklist</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-700">Content quality and structure analysis</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-700">Actionable improvement recommendations</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Screenshot */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src={feature.screenshot} 
                      alt={`${feature.title} - Dashboard Screenshot`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters - Enhanced with Interactive Input */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why This Matters</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Brand search is evolving. People ask AI questions like these:
            </p>
            
            {/* Interactive Input Component */}
            <div className="mb-6">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              What will they hear — and will your brand show up?
            </p>
          </div>
        </div>
      </section>

      {/* Modern Quote Section with AI Platform Logos */}
      <section className="py-8 bg-gradient-to-br from-gray-50 via-white to-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Quote Content */}
            <div className="text-center lg:text-left">
              <blockquote className="text-3xl md:text-4xl font-light leading-relaxed text-gray-900 mb-8">
                "AI is completely reimagining how people search for brands and information."
              </blockquote>
              <cite className="text-xl text-gray-600 font-medium">
                — Sundar Pichai, CEO, Google
              </cite>
            </div>
            
            {/* AI Platform Logos Animation */}
            <div className="relative h-80 flex items-center justify-center">
              {/* Floating Data Points - Behind everything with z-index */}
              <div className="absolute inset-0 z-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-bounce"
                    style={{
                      left: `${20 + (i * 10)}%`,
                      top: `${30 + (i * 5)}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
              
              {/* Central Search Node */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <Search className="h-8 w-8 text-white" />
                </div>
              </div>
              
              {/* Orbiting AI Platform Logos - Container rotates, logos counter-rotate to stay horizontal */}
              <div className="absolute inset-0 animate-spin z-30" style={{ animationDuration: '20s' }}>
                <div className="relative w-full h-full">
                  {/* ChatGPT Logo */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                    <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                      <img 
                        src="/gpt logo.png" 
                        alt="ChatGPT"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Claude Logo */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                    <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                      <img 
                        src="/claude-color.png" 
                        alt="Claude"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Perplexity Logo */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                    <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                      <img 
                        src="/perplexity-color.png" 
                        alt="Perplexity"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Mistral Logo */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                    <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                      <img 
                        src="/mistral-color.png" 
                        alt="Mistral"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connecting Lines */}
              <div className="absolute inset-0 animate-pulse z-10">
                <svg className="w-full h-full" viewBox="0 0 320 320">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Animated connecting lines */}
                  <line x1="160" y1="80" x2="160" y2="160" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" />
                  <line x1="240" y1="160" x2="160" y2="160" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" />
                  <line x1="160" y1="240" x2="160" y2="160" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" />
                  <line x1="80" y1="160" x2="160" y2="160" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(249, 115, 22, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(220, 38, 38, 0.05) 0%, transparent 50%)'
          }} />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Start tracking your AI visibility today</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg p-8 ${plan.popular ? 'ring-2 ring-orange-500 transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-gray-400 line-through text-lg">€{plan.oldPrice}</span>
                    <span className="text-4xl font-bold text-gray-900">€{plan.newPrice}</span>
                  </div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {plan.discount}% off
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handlePlanSelection(plan.name)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                    plan.popular 
                      ? 'bg-orange-600 text-white hover:bg-orange-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with WavyBackground Component */}
      <section className="relative overflow-hidden">
        <WavyBackground
          className="max-w-4xl mx-auto text-center"
          colors={[
            "#ea580c", // orange-600
            "#dc2626", // red-600
            "#f59e0b", // amber-500
            "#fb923c", // orange-400
            "#ef4444", // red-500
            "#fbbf24", // amber-400
            "#fed7aa", // orange-200
            "#fecaca", // red-200
          ]}
          waveWidth={60}
          backgroundFill="#1f2937"
          blur={12}
          speed="fast"
          waveOpacity={0.6}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Lead the AI Search Revolution?
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="text-white font-bold text-xl">
              <span className="rocket-shake">🚀</span> Launching August 2025, get 30% off now
            </div>
          </div>

          <button 
            onClick={handleGetStarted}
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Join Waitlist
          </button>
        </WavyBackground>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/logo (1).png" 
                  alt="Promptaize Logo" 
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold text-white">Promptaize</span>
              </div>
              <p className="text-gray-400 mb-6">
                Track your brand's AI visibility across ChatGPT, Claude & Perplexity. 
                Built for the future of fashion discovery.
              </p>
              <div className="text-gray-400">
                <p className="mb-2">Contact us:</p>
                <a href="mailto:info@promptaize.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                  info@promptaize.com
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Promptaize. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <WaitlistModal 
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
        email={email}
        selectedPlan={selectedPlan}
      />
    </div>
  )
}

export default LandingPage