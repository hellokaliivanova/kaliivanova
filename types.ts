export interface Project {
  id: string;
  name: string;
  category: string;
  client?: string;
  year: string;
  description: string;
  descriptionIndex?: number;
  images?: string[];
  extraCards?: { afterMediaSubstring: string; text: string }[];
}
