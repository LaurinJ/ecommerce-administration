export type Message = {
  _id: string;
  email: string;
  read: boolean;
  answer: boolean;
  content: string;
  createdAt: Date;
};

export type MessagesQuery = {
  categories: [Message];
  pages: number;
};

export interface MessageErrors {
  name?: String;
}
