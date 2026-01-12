"use client";
import React from 'react'
import { useState } from 'react'
import FAQ from './FAQ';

export default function Editor1() {

    const [websiteData, setWebsiteData] = useState({
  templateName: '',
  templateType: 'Business', // Default type
  headerSection: {
    logo: '',
    businessName: '',
    navigationLinks: [] // Array of {name, url}
  },
  heroSection: {
    title: '',
    tagline: '',
    description: '',
    heroImage: '',
    button: ''
  },
  features: [], // Array of {title, description}
  contactUs: {
    email: '',
    phoneNo: '',
    address: ''
  },
  FAQ: [], // Array of {question, answer}
  footer: {
    brandName: '',
    branLogo: '',
    SocialLinks: 'Instagram',
    copywrite: ''
  }
});

const handleNestedChange = (section, field, value) => {
  setWebsiteData(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [field]: value
    }
  }));
};

const addFeature = () => {
  setWebsiteData(prev => ({
    ...prev,
    features: [...prev.features, { title: '', description: '' }]
  }));
};

const updateFeature = (index, field, value) => {
  const newFeatures = [...websiteData.features];
  newFeatures[index][field] = value;
  setWebsiteData(prev => ({ ...prev, features: newFeatures }));
};

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
    </div>
  )
};