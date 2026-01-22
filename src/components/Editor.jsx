"use client";
import { useState, useEffect } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import WebsitePreview from "@/components/WebsitePreview";
// import { useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const defaultWebsiteData = {
  headerSection: {
    logo: "",
    businessName: "",
    navigationLinks: [],
  },

  heroSection: {
    title: "",
    tagline: "",
    description: "",
    heroImage: "",
    button: "",
    heroFile: null, // frontend-only
  },

  features: [],

  aboutUs: {
    aboutTitle: "",
    aboutDescription: "",
    team: [],
  },

  contactUs: {
    email: "",
    phoneNo: "",
    address: "",
  },

  FAQ: [],

  footer: {
    brandName: "",
    branLogo: "",
    SocialLinks: "",
    copywrite: "",
  },
};

export default function Editor({ templateId }) {
  console.log("Editor template Id: ", templateId); // DEBUG
  const router = useRouter();
  // const params = useParams();
  // const templateId = params?.templateId;
  const [websiteData, setWebsiteData] = useState(defaultWebsiteData);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const token = Cookies.get("auth_token");
        if (!token) return;

        const res = await axios.get(
          `http://localhost:5000/template/${templateId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const template = res.data.template || res.data;

        if (template) {
          setWebsiteData({
            headerSection: {
              logo: template.headerSection?.logo || "",
              businessName: template.headerSection?.businessName || "",
              navigationLinks: template.headerSection?.navigationLinks || [],
            },

            heroSection: {
              title: template.heroSection?.title || "",
              tagline: template.heroSection?.tagline || "",
              description: template.heroSection?.description || "",
              heroImage: template.heroSection?.heroImage || "",
              button: template.heroSection?.button || "",
              heroFile: null, // frontend only
            },

            features: template.features || [],

            aboutUs: {
              aboutTitle: template.aboutUs?.aboutTitle || "",
              aboutDescription: template.aboutUs?.aboutDescription || "",
              team: template.aboutUs?.team || [],
            },

            contactUs: {
              email: template.contactUs?.email || "",
              phoneNo: template.contactUs?.phoneNo || "",
              address: template.contactUs?.address || "",
            },

            FAQ: template.FAQ || [],

            footer: {
              brandName: template.footer?.brandName || "",
              branLogo: template.footer?.branLogo || "",
              SocialLinks: template.footer?.SocialLinks || "",
              copywrite: template.footer?.copywrite || "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };

    if (templateId) {
      fetchTemplateData();
    }
  }, [templateId]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (websiteData.heroImage && websiteData.heroImage.startsWith("blob:")) {
        URL.revokeObjectURL(websiteData.heroImage);
      }
    };
  }, [websiteData.heroImage]);

  const handleNestedChange = (section, field, value) => {
    setWebsiteData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setWebsiteData((prev) => ({
      ...prev,
      heroSection: {
        ...prev.heroSection,
        heroImage: preview,
        heroFile: file,
      },
    }));
  };

  const handlePublish = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    const publishedWebsite = {
      id: randomId,
      url: `https://mysite-${randomId}.volku.com`,
      data: websiteData,
      createdAt: new Date(),
    };

    // You can store this in localStorage or pass to a parent component
    localStorage.setItem("publishedWebsite", JSON.stringify(publishedWebsite));
    router.push("/published");
  };
  const handleSave = async () => {
    try {
      const token = Cookies.get("auth_token");
      if (!token) return;

      const formData = new FormData();

      // Header section
      formData.append(
        "headerSection[businessName]",
        websiteData.headerSection.businessName,
      );

      // Hero section
      formData.append("heroSection[title]", websiteData.heroSection.title);
      formData.append("heroSection[tagline]", websiteData.heroSection.tagline);
      formData.append(
        "heroSection[description]",
        websiteData.heroSection.description,
      );
      formData.append("heroSection[button]", websiteData.heroSection.button);

      // Image
      if (websiteData.heroSection.heroFile) {
        formData.append("heroImage", websiteData.heroSection.heroFile);
      } else if (websiteData.heroSection.heroImage) {
        formData.append(
          "heroSection[heroImage]",
          websiteData.heroSection.heroImage,
        );
      }

      // Features
      websiteData.features.forEach((feature, index) => {
        formData.append(`features[${index}][title]`, feature.title);
        formData.append(`features[${index}][description]`, feature.description);
      });

      // About Us
      formData.append("aboutUs[aboutTitle]", websiteData.aboutUs.aboutTitle);
      formData.append(
        "aboutUs[aboutDescription]",
        websiteData.aboutUs.aboutDescription,
      );

      websiteData.aboutUs.team.forEach((member, index) => {
        formData.append(
          `aboutUs[team][${index}][memberName]`,
          member.memberName,
        );
        formData.append(
          `aboutUs[team][${index}][memberRole]`,
          member.memberRole,
        );
        formData.append(
          `aboutUs[team][${index}][memberImage]`,
          member.memberImage,
        );
      });

      // Contact Us
      formData.append("contactUs[email]", websiteData.contactUs.email);
      formData.append("contactUs[phoneNo]", websiteData.contactUs.phoneNo);
      formData.append("contactUs[address]", websiteData.contactUs.address);

      // FAQ
      websiteData.FAQ.forEach((faq, index) => {
        formData.append(`FAQ[${index}][question]`, faq.question);
        formData.append(`FAQ[${index}][answer]`, faq.answer);
      });

      // Footer
      formData.append("footer[brandName]", websiteData.footer.brandName);
      formData.append("footer[branLogo]", websiteData.footer.branLogo);
      formData.append("footer[SocialLinks]", websiteData.footer.SocialLinks);
      formData.append("footer[copywrite]", websiteData.footer.copywrite);

      // API Call to update template
      await axios.put(
        `http://localhost:5000/template/update/${templateId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Template saved successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Save failed ❌");
    }
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
            <Button
              variant="secondary"
              onClick={handleSave}
              className="space-x-2"
            >
              <Save size={16} />
              <span>Save</span>
            </Button>
            <Button onClick={handlePublish}>Publish</Button>
          </>
        }
      />

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Form */}
        <div className="w-1/3 bg-[#242424] p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6">Fill Website Details</h2>

          {/* Header section */}
          <div className="space-y-4">
            <div>
              <label className="block text-base font-medium mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={websiteData.headerSection.businessName}
                onChange={(e) =>
                  handleNestedChange(
                    "headerSection",
                    "businessName",
                    e.target.value,
                  )
                }
                className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            </div>

            {/* Hero section */}
            <div>
              <label className="block text-base font-medium mb-2">
                Hero Title
              </label>
              <input
                type="text"
                value={websiteData.heroSection.title}
                onChange={(e) =>
                  handleNestedChange("heroSection", "title", e.target.value)
                }
                className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-base font-medium mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={websiteData.heroSection.tagline}
                onChange={(e) =>
                  handleNestedChange("heroSection", "tagline", e.target.value)
                }
                className="w-full p-3 border border-[#505050] rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-base font-medium mb-2">
                Description
              </label>
              <textarea
                value={websiteData.heroSection.description}
                onChange={(e) =>
                  handleNestedChange("heroSection", "description", e.target.value)
                }
                rows={3}
                className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-base font-medium mb-2">
                Hero Image
              </label>
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
                  value={
                    websiteData.heroSection.heroImage?.startsWith("blob:")
                      ? ""
                      : websiteData.heroSection.heroImage
                  }
                  onChange={(e) =>
                    handleNestedChange("heroSection", "heroImage", e.target.value)
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-3 border border-[#505050] rounded-lg focus:border-blue-500 focus:outline-none text-white"
                />
                {websiteData.heroSection.heroImage && (
                  <div className="mt-2">
                    <img
                      src={websiteData.heroSection.heroImage}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border border-[#505050]"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={websiteData.heroSection.button}
                onChange={(e) => handleNestedChange("heroSection", "button", e.target.value)}
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
