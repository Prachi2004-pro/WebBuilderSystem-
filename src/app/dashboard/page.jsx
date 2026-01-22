"use client";
import Button from "@/components/ui/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import React from "react";
import { RiAddLine } from "react-icons/ri";
import { Trash2 } from "lucide-react";

export default function Dashboard() {
  const [templateList, setTemplateList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = Cookies.get("auth_token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get("http://localhost:5000/template/list", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTemplateList(res.data);
      } catch (error) {
        console.log("Error fetching templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  //Delete Template Functionality can be added here
  const handleDelete = async (templateId) => {
    try {
      const token = Cookies.get("auth_token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(`http://localhost:5000/template/delete/${templateId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTemplateList((prev) => prev.filter((template) => template._id !== templateId));
      alert("Template deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete project");
    }
  };

  if (isLoading) {
    return <div className="text-xl text-white">Loading Templates...</div>;
  }

  return (
    <div className="bg-[#242424] min-h-screen w-full">
      <div className=" flex flex-row items-start justify-between p-6">
        <h1 className=" text-white text-3xl font-bold">My Projects</h1>
        <a href="/template">
          <Button className="flex items-center gap-2 hover:shadow-xl focus:ring-blue-300 focus:ring-offset-1">
            <RiAddLine size={20} className="text-white" />
            Create New Project
          </Button>
        </a>
      </div>

      <div>
        {templateList.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center text-white text-2xl p-4 border border-gray-700 rounded-2xl w-fit hover:bg-gray-800 hover:border-blue-500">
            No templates Created yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {templateList.map((template) => (
              <div
                key={template._id}
                className="border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 h-fit"
              >
                {/* Image */}
                <div className="aspect-square h-3/4 bg-gray-800 text-white flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <img src={template?.heroSection?.heroImage} alt={template?.heroSection?.title} />
                  </div>
                </div>

                {/* Text */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-xl mb-2">
                    {template?.heroSection?.title || "Untitled Project"}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {template?.heroSection?.description || "No description available."}
                  </p>
                  <div className="flex flex-row gap-2">
                    <Button className="w-full m-2"
                      onClick={() => (window.location.href = `/editor/${template._id}`)}
                    >
                      Edit Project
                    </Button>
                    <Button className="w-full m-2 bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete(template._id)}
                    >
                      <Trash2 size={16} className="inline mr-2" />Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
