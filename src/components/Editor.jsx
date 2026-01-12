'use client'
import { useState, useEffect } from 'react'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import WebsitePreview from '@/components/WebsitePreview'

const defaultWebsiteData = {
  companyName: '',
  tagline: '',
  description: '',
  heroImage: '',
  ctaText: ''
};

export default function Editor() {
  const router = useRouter();
  const [websiteData, setWebsiteData] = useState(defaultWebsiteData);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (websiteData.heroImage && websiteData.heroImage.startsWith('blob:')) {
        URL.revokeObjectURL(websiteData.heroImage);
      }
    };
  }, [websiteData.heroImage]);

  const handleInputChange = (field, value) => {
    setWebsiteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (optional - limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setWebsiteData(prev => ({
        ...prev,
        heroImage: imageUrl
      }));
    }
  };

  const handlePublish = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    const publishedWebsite = {
      id: randomId,
      url: `https://mysite-${randomId}.volku.com`,
      data: websiteData,
      createdAt: new Date()
    };
    
    // You can store this in localStorage or pass to a parent component
    localStorage.setItem('publishedWebsite', JSON.stringify(publishedWebsite));
    router.push('/published');
  };

  // Cleanup function to revoke object URLs when component unmounts

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        title="Edit Your Website" 
        showBack 
        backHref="/templates"
        rightContent={
          <>
            <Button variant="secondary" className="space-x-2">
              <Save size={16} />
              <span>Save</span>
            </Button>
            <Button onClick={handlePublish}>
              Publish
            </Button>
          </>
        }
      />

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Form */}
        <div className="w-1/3 bg-[#242424] p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6">Fill Website Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-base font-medium mb-2">Company Name</label>
              <input
                type="text"
                value={websiteData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-base font-medium mb-2">Tagline</label>
              <input
                type="text"
                value={websiteData.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-base font-medium mb-2">Description</label>
              <textarea
                value={websiteData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-base font-medium mb-2">Hero Image</label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <p className="text-sm text-gray-400">Or use URL:</p>
                <input
                  type="url"
                  value={websiteData.heroImage.startsWith('blob:') ? '' : websiteData.heroImage}
                  onChange={(e) => handleInputChange('heroImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white"
                />
                {websiteData.heroImage && (
                  <div className="mt-2">
                    <img 
                      src={websiteData.heroImage} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-lg border border-[#505050]"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">Button Text</label>
              <input
                type="text"
                value={websiteData.ctaText}
                onChange={(e) => handleInputChange('ctaText', e.target.value)}
                className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-[#1b1b1b] overflow-y-auto p-14">
          <WebsitePreview websiteData={websiteData} />
        </div>
      </div>
    </div>
  );
}