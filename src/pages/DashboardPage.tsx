import React, { useEffect, useState } from "react";
import { News, Tag } from "../types";
import { api } from "../lib/api";
import CreateNewsForm from "../components/CreateNewsForm";
import Spinner from "../components/Spinner";

export default function DashboardPage() {
  const [news, setNews] = useState<News[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await api.getNewsStats();
      const _tags = await api.getAllTags();
      setTags(_tags);
      setNews(data);
    } catch (e) {
      console.error("Error loading stats:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      loadStats();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="mb-10">
      <div className="font-bold text-xl py-2">Create News</div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col p-8 transition-transform hover:translate-y-1 ease-in">
          <div className="grid grid-cols-1 mt-5 text-gray-400 hover:text-blue-500">
            <CreateNewsForm tags={tags} />
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div className="font-bold text-xl py-2">Statistics</div>
        <div className="space-y-6">
            {news.map((each) => (
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col p-8 transition-transform hover:translate-y-1 ease-in"
                key={each._id}
            >
                <span className="font-medium ">News: {each.title}</span>
                <div className="grid grid-cols-1 md:grid-cols-3 mt-5 text-gray-400 text-sm hover:text-blue-500">
                    <span>Views: {each.views}</span>
                    <span>Likes: {each.likes}</span>
                    <span>Dislikes: {each.dislikes}</span>
                </div>
            </div>
            ))}
        </div>
        {loading && <Spinner />}
      </div>
    </div>
  );
}
