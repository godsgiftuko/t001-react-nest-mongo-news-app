export interface News {
  _id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  views: number;
  likes: number;
  dislikes: number;
  author_id: string;
  tags: Tag[];
}

export interface Tag {
  _id: string;
  name: string;
}

export interface NewsTag {
  news_id: string;
  tag_id: string;
}

export interface INewsPayload {
  title: string;
  content: string;
  image_url: string;
  tags: Tag[];
}