export interface User {
  name: string;
  email: string;
  phone: string;
  prefs?: {
    role?: string;
  };
}

export interface Post {
  title: string;
  content: string;
  bannerId: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}
