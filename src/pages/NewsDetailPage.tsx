import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ThumbsDown, Eye, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';
import { News } from '../types';

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = React.useState<News | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadNews = async () => {
      if (!id) return;
      try {
        const article = await api.getNewsById(id);
        setNews(article);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [id]);

  const handleLike = async () => {
    if (!news) return;
    try {
      const updatedNews = await api.incrementLikes(news._id);
      setNews(updatedNews);
    } catch (error) {
      console.error('Error liking news:', error);
    }
  };

  const handleDislike = async () => {
    if (!news) return;
    try {
      const updatedNews = await api.incrementDislikes(news._id);
      setNews(updatedNews);
    } catch (error) {
      console.error('Error disliking news:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Article not found</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 p-4 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to News</span>
      </button>
      
      {news.image_url && (
        <img 
          src={news.image_url} 
          alt={news.title}
          className="w-full h-[400px] object-cover"
        />
      )}
      
      <div className="p-6">
      <div className="flex flex-wrap gap-2 mb-6">
          {news.tags.map((tag) => (
            <button
              key={tag.name}
              className='
                flex items-center gap-1 px-3 py-1 rounded-full text-sm  bg-blue-500 text-white'
            >
              {tag.name}
            </button>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>
        
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          {news.content}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-2 hover:text-red-500 transition-colors"
            >
              <Heart size={20} />
              <span>{news.likes}</span>
            </button>
            <button 
              onClick={handleDislike}
              className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
            >
              <ThumbsDown size={20} />
              <span>{news.dislikes}</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Eye size={20} />
            <span>{news.views}</span>
          </div>
        </div>
      </div>
    </article>
  );
}