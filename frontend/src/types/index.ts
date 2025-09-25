export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  major: string;
  year: string;
  bio: string;
  joinedGroups: string[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  subject: string;
  memberCount: number;
  members: User[];
  createdBy: string;
  createdAt: string;
  image: string;
  maxMembers: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}