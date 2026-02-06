
export interface Product {
  id: string;
  name: string;
  description: string;
  tags: string[];
  imageUrl: string;
  price: number;
}

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
}
