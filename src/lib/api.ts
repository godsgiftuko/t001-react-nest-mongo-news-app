import { mockNews } from './mockData';

export const api = {
  getNews: async (start: number, end: number) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sortedNews = [...mockNews].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
    
    return sortedNews.slice(start, end + 1);
  },

  getNewsById: async (id: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const news = mockNews.find(n => n.id === id);
    if (!news) {
      throw new Error('News not found');
    }
    return news;
  },

  incrementLikes: async (newsId: string) => {
    const newsIndex = mockNews.findIndex(n => n.id === newsId);
    if (newsIndex === -1) {
      throw new Error('News not found');
    }
    mockNews[newsIndex].likes += 1;
    return mockNews[newsIndex];
  },

  incrementDislikes: async (newsId: string) => {
    const newsIndex = mockNews.findIndex(n => n.id === newsId);
    if (newsIndex === -1) {
      throw new Error('News not found');
    }
    mockNews[newsIndex].dislikes += 1;
    return mockNews[newsIndex];
  },

  getAllTags: async () => {
    return Array.from(new Set(mockNews.flatMap(article => article.tags)));;
  }
};