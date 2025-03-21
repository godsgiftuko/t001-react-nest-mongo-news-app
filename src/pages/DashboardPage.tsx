import React, { useEffect, useState } from "react";
import { News, Tag } from "../types";
import { api } from "../lib/api";
import CreateNewsForm from "../components/CreateNewsForm";
import Spinner from "../components/Spinner";
import { X } from "lucide-react";

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

  const deleteNews = async (id: string) => {
    try {
        const canDel = confirm('Are you sure you want to delete this news?')
        if (!canDel) return;
        setLoading(true);
        await api.deleteNews(id);
        setNews(prev => prev.filter(item => 
            item._id !== id 
          ));
      } catch (e) {
        console.error("Error loading stats:", e);
      } finally {
        setLoading(false);
      }
  } 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="mb-10">
      <div className="font-bold text-xl py-2">Create News</div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col p-8 transition-transform hover:translate-y-1 ease-in">
          <div className="grid grid-cols-1 mt-5 text-gray-400 hover:text-blue-500">
            <CreateNewsForm tags={tags} loadStats={loadStats} />
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div className="font-bold text-xl py-2">Recent News</div>
        <div className="space-y-6">
            {news.map((each) => (
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col p-8 transition-transform hover:translate-y-1 ease-in"
                key={each._id}
            >
               <div className="flex justify-between">
               <span className="font-medium ">{each.title}</span>
                <X size={20} className="text-red-500 cursor-pointer" onClick={() => deleteNews(each._id)} />
               </div>
                <div className="grid grid-cols-1 md:grid-cols-3 mt-5 text-gray-400 text-sm hover:text-blue-500">
                    <span>Views: {each.views}</span>
                    <span>Likes: {each.likes}</span>
                    <span>Dislikes: {each.dislikes}</span>
                </div>
            </div>
            ))}
            {!loading && !news?.length && (
                <div className="text-center py-8">
                 <p className="text-gray-600">No article</p>
               </div>
            )}
        </div>
        {loading && <Spinner />}
      </div>
    </div>
  );
}
