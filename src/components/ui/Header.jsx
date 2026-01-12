'use client'
import Link from 'next/link'
import { ArrowLeft, Code } from 'lucide-react'

export default function Header({ title, showBack = false, backHref = '/', rightContent }) {
  return (
    <header className="border-b border-[#505050] p-6 bg-[#242424]">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBack && (
            <Link 
              href={backHref}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
            >
              <ArrowLeft size={20} />
            </Link>
          )}
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        </div>
        {rightContent && (
          <div className="flex items-center space-x-4">
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
}