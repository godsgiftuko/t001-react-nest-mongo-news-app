export class Config {
    static appName = 'News App';
    static API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    static FE_GITHUB_URL = 'https://github.com/godsgiftuko/t001-react-nest-mongo-news-app';
    static BE_GITHUB_URL = 'https://github.com/godsgiftuko/t001-react-nest-mongo-news-api';
}