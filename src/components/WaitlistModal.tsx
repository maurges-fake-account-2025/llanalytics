import React, { useState } from 'react'
import { X, Check, Sparkles, Zap } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  selectedPlan?: string
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, email, selectedPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    companyWebsite: '',
    businessEmail: email,
    companySize: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const interests = [
    'Analytics of my brand in LLMs responses',
    'Competitors analytics in LLM responses',
    'To get audit of the LLM friendliness of my brand website',
    'Get optimizations suggestions for my AI SEO strategy',
    'All above'
  ]

  const companySizes = [
    '1-50',
    '50-200',
    '200-500',
    '500-2000',
    '2000-5000',
    '5000+'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestChange = (interest: string) => {
    if (interest === 'All above') {
      // If "All above" is selected, toggle all options
      if (selectedInterests.includes('All above')) {
        setSelectedInterests([])
      } else {
        setSelectedInterests([...interests])
      }
    } else {
      // If any individual option is selected/deselected
      setSelectedInterests(prev => {
        let newSelection
        if (prev.includes(interest)) {
          newSelection = prev.filter(item => item !== interest)
        } else {
          newSelection = [...prev, interest]
        }
        
        // Remove "All above" if not all individual options are selected
        const individualInterests = interests.filter(i => i !== 'All above')
        const hasAllIndividual = individualInterests.every(i => newSelection.includes(i))
        
        if (hasAllIndividual && !newSelection.includes('All above')) {
          newSelection.push('All above')
        } else if (!hasAllIndividual && newSelection.includes('All above')) {
          newSelection = newSelection.filter(i => i !== 'All above')
        }
        
        return newSelection
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Check if the email already exists in the waitlist
      const { data: existingEntries, error: checkError } = await supabase
        .from('waitlist_entries')
        .select('email')
        .eq('email', formData.businessEmail)
        .limit(1)

      if (checkError) {
        throw checkError
      }

      if (existingEntries && existingEntries.length > 0) {
        setError('This email is already on our waitlist!')
        setIsSubmitting(false)
        return
      }

      // Prepare the complete data object to store in the database
      const waitlistData = {
        email: formData.businessEmail,
        name: formData.name,
        company_website: formData.companyWebsite,
        business_email: formData.businessEmail,
        company_size: formData.companySize,
        message: formData.message,
        selected_plan: selectedPlan || null,
        interests: JSON.stringify({
          selected_interests: selectedInterests,
          form_data: {
            name: formData.name,
            companyWebsite: formData.companyWebsite,
            companySize: formData.companySize,
            message: formData.message
          }
        }),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      console.log('Submitting waitlist data:', waitlistData)

      const { error } = await supabase
        .from('waitlist_entries')
        .insert([waitlistData])

      if (error) {
        console.error('Supabase error:', error)
        throw error
      } else {
        console.log('Successfully added to waitlist')
        setIsSuccess(true)
      }
    } catch (error) {
      console.error('Error adding to waitlist:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
    setError('')
    setSelectedInterests([])
    setFormData({
      name: '',
      companyWebsite: '',
      businessEmail: email,
      companySize: '',
      message: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-2">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />
        
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] border border-gray-100 overflow-hidden">
          {isSuccess ? (
            <div className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to the Future!</h3>
              <p className="text-gray-600 mb-4">We'll be in touch with you soon about early access to Promptaize.</p>
              {selectedPlan && (
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 p-3 rounded-2xl mb-4">
                  <p className="text-orange-800 font-semibold">Selected Plan: {selectedPlan}</p>
                </div>
              )}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-2xl">
                <p className="font-bold">🚀 Launching August 2025</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
              {/* Left Side - Header/Branding - Smaller */}
              <div className="lg:col-span-2 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 p-4 text-white relative overflow-hidden rounded-l-3xl lg:rounded-r-none rounded-r-3xl lg:rounded-bl-3xl">
                {/* Background decorative elements - smaller */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-sm font-semibold opacity-90">Early Access</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 leading-tight">Unlock AI Visibility</h2>
                  <p className="text-white/90 text-sm mb-3">Join the future of brand discovery</p>
                  
                  {selectedPlan && (
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-2 rounded-xl mb-3">
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4" />
                        <span className="font-semibold text-sm">Selected: {selectedPlan}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-xl">
                    <p className="font-bold text-sm">🚀 Launching August 2025</p>
                    <p className="text-white/80 text-xs">Get 30% off early access</p>
                  </div>
                </div>

                {/* Close button for left side on mobile */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 lg:hidden text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Right Side - Form - Larger */}
              <div className="lg:col-span-3 p-4 flex flex-col justify-center relative overflow-y-auto max-h-[95vh]">
                {/* Close button for right side on desktop */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 hidden lg:block text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Personal Info Section - Compact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-900">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder-gray-500 text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="companyWebsite" className="block text-xs font-semibold text-gray-900">
                        Company Website
                      </label>
                      <input
                        type="text"
                        id="companyWebsite"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleInputChange}
                        placeholder="company.com"
                        className="w-full px-3 py-2 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder-gray-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="businessEmail" className="block text-xs font-semibold text-gray-900">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="businessEmail"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleInputChange}
                        placeholder="your@company.com"
                        className="w-full px-3 py-2 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder-gray-500 text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="companySize" className="block text-xs font-semibold text-gray-900">
                        Company Size
                      </label>
                      <select
                        id="companySize"
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 appearance-none cursor-pointer text-sm"
                      >
                        <option value="">Select company size</option>
                        {companySizes.map((size) => (
                          <option key={size} value={size}>{size} employees</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Interests Section - Ultra Compact */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-900">
                      What interests you most? *
                    </label>
                    <div className="grid grid-cols-1 gap-1">
                      {interests.map((interest, index) => (
                        <label 
                          key={index} 
                          className={`group relative flex items-center space-x-2 cursor-pointer p-2 rounded-xl border transition-all hover:shadow-sm ${
                            selectedInterests.includes(interest)
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          } ${interest === 'All above' ? 'border-t-2 border-t-orange-500 mt-1' : ''}`}
                        >
                          <input
                            type="checkbox"
                            value={interest}
                            checked={selectedInterests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                            className="h-3 w-3 text-orange-600 focus:ring-orange-500 border-gray-300 rounded transition-colors flex-shrink-0"
                          />
                          <span className={`text-xs leading-tight transition-colors ${
                            selectedInterests.includes(interest) 
                              ? 'text-orange-900 font-medium' 
                              : 'text-gray-700 group-hover:text-gray-900'
                          } ${interest === 'All above' ? 'font-bold text-orange-700' : ''}`}>
                            {interest}
                          </span>
                          {selectedInterests.includes(interest) && (
                            <div className="absolute top-2 right-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                    {selectedInterests.length === 0 && (
                      <p className="text-red-500 text-xs font-medium">Please select at least one interest</p>
                    )}
                  </div>

                  {/* Error Display - Compact */}
                  {error && (
                    <div className="p-2 bg-red-50 border-l-4 border-red-500 rounded-xl">
                      <p className="text-red-800 font-medium text-xs">{error}</p>
                    </div>
                  )}

                  {/* Submit Button - Compact */}
                  <button
                    type="submit"
                    disabled={isSubmitting || selectedInterests.length === 0}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Joining...</span>
                      </div>
                    ) : (
                      <span className="text-sm">Join the AI Revolution</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WaitlistModal