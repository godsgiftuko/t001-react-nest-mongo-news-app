import axios from 'axios';
import { mockNews } from './mockData';
import { Config } from '../configs';
import { News } from '../types';

axios.defaults.baseURL = Config.API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const api = {
  createNews: async ({ title, content, image_url, tagIds }: Pick<News, 'title' | 'image_url' | 'content'> & { tagIds: string[]; }): Promise<News> => {
      const { data: news }: {  data: News } = await axios.post('/api/news', {
        title,
        image_url,
        content,
        tagIds,
      });
     return news;
  },

  getNews: async (start: number, end: number): Promise<News[]> => {
      const { data }: {  data: News[] } = await axios.get('/api/news');
      const sortedNews = [...data].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      });
      
      return sortedNews.slice(start, end + 1);
  },

  getNewsById: async (id: string) => {
    const { data: news }: {  data: News } = await axios.get('/api/news/' + id, { params: { countView: true }});
    if (!news) {
      throw new Error('News not found');
    }
    return news;
  },

  incrementLikes: async (newsId: string) => {
    const { data: news }: {  data: News } = await axios.patch('/api/news/likes/' + newsId);
    return news;
  },

  incrementDislikes: async (newsId: string) => {
    const { data: news }: {  data: News } = await axios.patch('/api/news/dislike/' + newsId);
    return news;
  },

  getAllTags: async () => {
    const { data }: {  data: News[] } = await axios.get('/api/news');
    return Array.from(new Set(data.flatMap(article => article.tags)));;
  },

  getNewsStats: async () => {
    const { data: news }: {  data: News[] } =  await axios.get('/api/news');
    return news;
  },

  deleteNews: async (id: string) => {
    await axios.delete('/api/news/'+id);
  }
};