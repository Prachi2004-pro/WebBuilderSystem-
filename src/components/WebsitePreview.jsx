"use client";

export default function WebsitePreview({ websiteData }) {
  const { headerSection, heroSection } = websiteData || {};
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b">
        <div className="font-bold text-xl">
          {headerSection?.businessName || "Your Company"}
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            Category
          </a>
          <a href="#" className="hover:text-blue-600">
            Service
          </a>
          <a href="#" className="hover:text-blue-600">
            Jobs
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">Login</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center p-6 max-w-6xl mx-auto">
        <div>
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            ✨ Now trending
          </div>
          <h1 className="text-4xl font-bold mb-6">
            {heroSection?.tagline || "Your tagline"}{" "}
            <span className="text-blue-600 text-5xl">
              {heroSection?.title || "Your title"}.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {heroSection?.description || "Your description goes here."}
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            {heroSection?.button || "Call to Action"}
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-96 h-96 bg-transparent rounded-xl overflow-hidden">
            {heroSection?.heroImage ? (
              <img
                src={heroSection.heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200"
              style={{ display: heroSection?.heroImage ? "none" : "flex" }}
            >
              <div className="text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm">No image selected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-center items-center space-x-12 opacity-50">
          <div className="text-2xl font-bold">slack</div>
          <div className="text-2xl font-bold">zoom</div>
          <div className="text-2xl font-bold">airbnb</div>
          <div className="text-2xl font-bold">Spotify</div>
          <div className="text-2xl font-bold">envato</div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="p-6 max-w-6xl mx-auto mt-12">
        <h2 className="text-3xl font-bold text-center mb-4">
          Explore jobs by category
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Get the most exciting jobs from all around the world and grow your
          career fast with others.
        </p>
      </section>
    </div>
  );
}
