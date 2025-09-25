import React, { useState } from 'react';
import { CreditCard as Edit2, Mail, GraduationCap, Calendar, BookOpen, Users } from 'lucide-react';
import { User, Group } from '../types';

interface ProfileProps {
  user: User;
  groups: Group[];
  onUpdateProfile: (userData: Partial<User>) => void;
}

export function Profile({ user, groups, onUpdateProfile }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const userGroups = groups.filter(group => user.joinedGroups.includes(group.id));

  const handleSave = () => {
    onUpdateProfile(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-purple-200 shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    className="text-3xl font-bold bg-transparent border-b-2 border-purple-300 focus:border-purple-600 outline-none"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={editedUser.major}
                      onChange={(e) => setEditedUser({...editedUser, major: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Biology">Biology</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                    <select
                      value={editedUser.year}
                      onChange={(e) => setEditedUser({...editedUser, year: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                  <textarea
                    value={editedUser.bio}
                    onChange={(e) => setEditedUser({...editedUser, bio: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleSave}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                      <Mail className="h-5 w-5" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                      <GraduationCap className="h-5 w-5" />
                      <span>{user.major}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                      <Calendar className="h-5 w-5" />
                      <span>{user.year}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon={<Users className="h-8 w-8 text-purple-600" />}
            title="Groups Joined"
            value={userGroups.length}
            color="purple"
          />
          <StatCard 
            icon={<BookOpen className="h-8 w-8 text-blue-600" />}
            title="Study Sessions"
            value="47"
            color="blue"
          />
          <StatCard 
            icon={<Calendar className="h-8 w-8 text-green-600" />}
            title="Days Active"
            value="128"
            color="green"
          />
        </div>

        {/* My Groups */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Study Groups</h2>
          {userGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userGroups.map(group => (
                <div key={group.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={group.image} 
                      alt={group.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{group.name}</h3>
                      <p className="text-sm text-gray-600">{group.subject}</p>
                      <p className="text-sm text-purple-600">{group.memberCount} members</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">You haven't joined any groups yet</p>
              <p className="text-gray-500 mb-6">Discover and join study groups to get started!</p>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Browse Groups
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}) {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}