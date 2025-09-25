import { User, Group } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@student.edu',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    major: 'Computer Science',
    year: 'Junior',
    bio: 'Passionate about algorithms and machine learning',
    joinedGroups: ['1', '3']
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@student.edu',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    major: 'Mathematics',
    year: 'Senior',
    bio: 'Love solving complex mathematical problems',
    joinedGroups: ['1', '2']
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike@student.edu',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    major: 'Physics',
    year: 'Sophomore',
    bio: 'Exploring quantum mechanics and theoretical physics',
    joinedGroups: ['2', '4']
  },
  {
    id: '4',
    name: 'Emma Thompson',
    email: 'emma@student.edu',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    major: 'Biology',
    year: 'Junior',
    bio: 'Interested in molecular biology and genetics',
    joinedGroups: ['3', '4']
  }
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Advanced Algorithms Study Group',
    description: 'Weekly meetings to discuss complex algorithms, data structures, and competitive programming problems.',
    subject: 'Computer Science',
    memberCount: 8,
    members: [mockUsers[0], mockUsers[1]],
    createdBy: '1',
    createdAt: '2024-01-15',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    maxMembers: 12
  },
  {
    id: '2',
    name: 'Calculus III Mastery',
    description: 'Intensive study sessions for multivariable calculus, focusing on problem-solving techniques.',
    subject: 'Mathematics',
    memberCount: 6,
    members: [mockUsers[1], mockUsers[2]],
    createdBy: '2',
    createdAt: '2024-01-20',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    maxMembers: 10
  },
  {
    id: '3',
    name: 'Quantum Physics Exploration',
    description: 'Dive deep into quantum mechanics principles and solve challenging physics problems together.',
    subject: 'Physics',
    memberCount: 5,
    members: [mockUsers[0], mockUsers[3]],
    createdBy: '3',
    createdAt: '2024-02-01',
    image: 'https://images.pexels.com/photos/207636/pexels-photo-207636.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    maxMembers: 8
  },
  {
    id: '4',
    name: 'Organic Chemistry Lab',
    description: 'Collaborative lab work and exam preparation for organic chemistry students.',
    subject: 'Chemistry',
    memberCount: 7,
    members: [mockUsers[2], mockUsers[3]],
    createdBy: '4',
    createdAt: '2024-02-10',
    image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    maxMembers: 15
  },
  {
    id: '5',
    name: 'Web Development Bootcamp',
    description: 'Learn modern web technologies including React, Node.js, and full-stack development.',
    subject: 'Computer Science',
    memberCount: 12,
    members: [],
    createdBy: '1',
    createdAt: '2024-02-15',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    maxMembers: 20
  }
];