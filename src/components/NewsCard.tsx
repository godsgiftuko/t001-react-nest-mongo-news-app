import React from "react";
import { Heart, ThumbsDown, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { News } from "../types";

interface NewsCardProps {
  news: News;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
}

export function NewsCard({ news, onLike, onDislike }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {news.image_url && (
        <Link to={`/news/${news.id}`}>
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-48 object-cover transition-transform hover:scale-105"
          />
        </Link>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-6">
          {news.tags.map((tag) => (
            <button
              key={tag}
              className="
                flex items-center gap-1 px-3 py-1 rounded-full text-sm  bg-blue-500 text-white"
            >
              {tag}
            </button>
          ))}
        </div>
        <Link to={`/news/${news.id}`} className="flex-1">
          <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
            {news.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{news.content}</p>
        </Link>
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                onLike(news.id);
              }}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            >
              <Heart size={18} />
              <span>{news.likes}</span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onDislike(news.id);
              }}
              className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
            >
              <ThumbsDown size={18} />
              <span>{news.dislikes}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <Eye size={18} />
            <span>{news.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
