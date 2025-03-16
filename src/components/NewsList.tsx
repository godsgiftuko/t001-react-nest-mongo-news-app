import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { News } from '../types';
import { NewsCard } from './NewsCard';
import { api } from '../lib/api';
import { Filter, X } from 'lucide-react';

const ITEMS_PER_PAGE = 4;

export function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const data = await api.getNews(
        page * ITEMS_PER_PAGE,
        (page + 1) * ITEMS_PER_PAGE - 1
      );

      const tags = await api.getAllTags();

      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      setTags(tags.sort());
      setNews(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const updatedNews = await api.incrementLikes(id);
      setNews(prev => prev.map(item => 
        item.id === id ? { ...item, likes: updatedNews.likes } : item
      ));
    } catch (error) {
      console.error('Error liking news:', error);
    }
  };

  const handleDislike = async (id: string) => {
    try {
      const updatedNews = await api.incrementDislikes(id);
      setNews(prev => prev.map(item => 
        item.id === id ? { ...item, dislikes: updatedNews.dislikes } : item
      ));
    } catch (error) {
      console.error('Error disliking news:', error);
    }
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
    const filteredNews = selectedTags.length === 0 
      ? news 
      : news.filter(article => article.tags.some(tag => selectedTags.includes(tag)));
  
    const handleTagToggle = (tag: string) => {
      setSelectedTags(prev =>
        prev.includes(tag)
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      );
    };

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-2 mb-4">
          <Filter className="text-blue-500" />
          <h1 className="text-2xl font-bold">News Filter</h1>
        </div>
  
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`
                flex items-center gap-1 px-3 py-1 rounded-full text-sm
                ${selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {tag}
              {selectedTags.includes(tag) && (
                <X className="w-3 h-3 text-white" />
              )}
            </button>
          ))}
  
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="px-3 py-1 rounded-full text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map(article => (
          <NewsCard
            key={article.id}
            news={article}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ))}
      </div>
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div ref={ref} className="h-10" />
    </div>
  );
}