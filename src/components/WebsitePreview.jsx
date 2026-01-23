"use client";

export default function WebsitePreview({ websiteData }) {
  const { headerSection, heroSection, sections } = websiteData || {};
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
      {sections?.hero && (
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
      )}
      
      {/* Features Section */}
      {sections?.features && websiteData.features?.length > 0 && (
        <section className="p-6 max-w-6xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-center mb-10">Features</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {websiteData.features.map((feature, index) => (
              <div
                key={index}
                className="p-6 border rounded-xl hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title || "Feature title"}
                </h3>
                <p className="text-gray-600">
                  {feature.description || "Feature description"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About Us */}
      {sections?.aboutUs && websiteData.aboutUs && (
        <section className="p-6 max-w-6xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-center mb-2">About Us</h2>
          <div className="bg-gray-100 text-black rounded-xl py-10 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {websiteData.aboutUs.aboutTitle || "About Title"}
            </h2>

            <p className="text-gray-800 max-w-3xl mx-auto">
              {websiteData.aboutUs.aboutDescription ||
                "Write something about your company here."}
            </p>
          </div>
        </section>
      )}

      {/* Contact Us */}
      {sections?.contactUs && websiteData.contactUs && (
        <section className="p-6 max-w-6xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="py-6 border rounded-xl">
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-gray-600 text-center">
                {websiteData.contactUs.email || "example@email.com"}
              </p>
            </div>

            <div className="py-6 border rounded-xl">
              <h4 className="font-semibold mb-2">Phone</h4>
              <p className="text-gray-600">
                {websiteData.contactUs.phoneNo || "+91 00000 00000"}
              </p>
            </div>

            <div className="py-6 border rounded-xl">
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-gray-600">
                {websiteData.contactUs.address || "Your address here"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {sections?.faq && websiteData.FAQ?.length > 0 && (
        <section className="p-6 max-w-4xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {websiteData.FAQ.map((faq, index) => (
              <details
                key={index}
                className="border rounded-lg p-4 cursor-pointer"
              >
                <summary className="font-semibold">
                  {faq.question || "Your question"}
                </summary>
                <p className="mt-2 text-gray-600">
                  {faq.answer || "Your answer goes here"}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      {sections?.footer && (
        <footer className="bg-blue-600 text-white mt-10">
        <div className="max-w-6xl mx-auto p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {websiteData.footer?.brandName || "Your Brand"}
          </h3>

          {websiteData.footer?.brandLogo && (
            <img
              src={websiteData.footer.brandLogo}
              alt="Brand Logo"
              className="mx-auto h-12 mb-4"
            />
          )}

          {websiteData.footer?.SocialLinks && (
            <p className="text-gray-300 mb-4">
              {websiteData.footer.SocialLinks}
            </p>
          )}

          <p className="text-sm text-gray-300">
            {websiteData.footer?.copywrite || "© 2026 All rights reserved."}
          </p>
        </div>
      </footer>
      )}
      
    </div>
  );
}
