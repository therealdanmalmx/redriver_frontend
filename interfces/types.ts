export interface Book {
  data: {
    id: string;
    title: string;
    author: string;
    genre: string;
    publisher: string;
    publishDate: string;
    description: string;
    isbn: string;
    language: string;
    pages: number;
  };
  status: number;
  message: string;
}

export interface BookList {
  data: Book[];
}

export interface BookWithoutId {
  data: Omit<Book[], 'id'>;
}
export interface User {
  username: string;
  password: string;
}
