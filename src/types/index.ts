export interface News {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  views: number;
  likes: number;
  dislikes: number;
  author_id: string;
  tags: string[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface NewsTag {
  news_id: string;
  tag_id: string;
}