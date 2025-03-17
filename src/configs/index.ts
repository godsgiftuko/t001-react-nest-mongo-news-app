export class Config {
    static appName = 'New App';
    static API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
}