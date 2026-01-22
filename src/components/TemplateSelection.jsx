"use client";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function TemplateSelection() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heroImageFile, setHeroImageFile] = useState(null);

  const templates = [
    {
      id: 1,
      title: "Business Template",
      description: "A professional template for business websites.",
      type: "business",
      heroImage: "https://example.com/hero-business.jpg",
    },
    {
      id: 2,
      title: "Portfolio Template",
      description: "A professional template for portfolios.",
      type: "portfolio",
      heroImage: "https://example.com/hero-business.jpg",
    },
  ];

  // TODO: Submit selected template to backend or state management
  const handleSubmit = async () => {
    if (!selectedTemplate) {
      alert("Please select a template before continuing.");
      return;
    }

    // API Call /template/create
    try {
      const token = Cookies.get("auth_token");
      if (!token) {
        console.error("No token found");
        return;
      }
      setLoading(true);

      // ✅ FormData
    const formData = new FormData();
    formData.append("templateType", selectedTemplate.type);
    formData.append("templateName", selectedTemplate.title);

    if (heroImageFile) {
      formData.append("heroImage", heroImageFile);
    }

    const res = await axios.post(
      "http://localhost:5000/template/create",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

      console.log("Template created:", res.data);
      const templateId = res.data.template._id;
      router.push(`/editor/${templateId}`);
    } catch (error) {
      console.log("Error creating template:", error);
      alert("Failed to create template. Please try again.");
    } finally {
      setLoading(false);
    }
    // console.log("Template selected");
  };

  return (
    <div className="min-h-screen bg-[#242424] text-white">
      <Header title="Choose a Template" showBack backHref="/" />

      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Select Your Template</h2>
          <p className="text-gray-400">
            Choose from our collection of professionally designed templates
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates?.map((template) => (
            <label
              key={template.id}
              className={`cursor-pointer border rounded-lg overflow-hidden transition-colors
                ${
                  selectedTemplate?.id === template.id
                    ? "border-blue-500"
                    : "border-gray-700 hover:border-blue-400"
                }`}
            >
              {/* RADIO BUTTON (hidden but functional)  */}
              <input
                type="radio"
                name="template"
                value={template.id}
                className="hidden"
                onChange={() => setSelectedTemplate(template)}
              />

              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <img src={template?.heroImage} alt={template?.title} />
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {template?.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {template?.description}
                </p>
              </div>
            </label>
          ))}
        </div>

        <div className="fixed bottom-10 left-0 right-0 flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-4"
          >
            {loading ? "Creating..." : "Continue"}
          </Button>
        </div>
      </main>
    </div>
  );
}
