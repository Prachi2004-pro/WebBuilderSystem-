'use client'
import { Globe, Eye } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function PublishedScreen() {

  return (
    <div className="min-h-screen bg-[#242424] text-white flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Globe size={32} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Website Published!</h1>
        <p className="text-gray-400 mb-6">Your website is now live and accessible to everyone.</p>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-400 mb-2">Your website URL:</p>
          <p className="text-blue-400 font-mono text-sm break-all">
            {'https://mysite-demo.volku.com'}
          </p>
        </div>

        <div className="flex space-x-4">
          <Button 
            onClick={() => window.open('https://mysite-demo.volku.com', '_blank')}
            className="flex-1 space-x-2"
          >
            <Eye size={16} />
            <span>View Website</span>
          </Button>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Create New
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}