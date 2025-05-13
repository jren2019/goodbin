export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  categories: string[];
  excerpt: string;
  content: string;
  featuredImage: string;
  isPopular?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
}
