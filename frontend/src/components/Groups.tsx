import React, { useState } from 'react';
import { Users, MapPin, Clock, Search, Filter } from 'lucide-react';
import { Group, User } from '../types';

interface GroupsProps {
  user: User;
  groups: Group[];
  onJoinGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => void;
}

export function Groups({ user, groups, onJoinGroup, onLeaveGroup }: GroupsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const subjects = ['All', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || group.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Discover Study Groups</h1>
          <p className="text-gray-600 text-lg">Find the perfect study group for your academic goals</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              user={user}
              onJoinGroup={onJoinGroup}
              onLeaveGroup={onLeaveGroup}
              onViewDetails={(group) => setSelectedGroup(group)}
            />
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">No groups found</div>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Group Details Modal */}
      {selectedGroup && (
        <GroupModal 
          group={selectedGroup} 
          user={user}
          onClose={() => setSelectedGroup(null)}
          onJoinGroup={onJoinGroup}
          onLeaveGroup={onLeaveGroup}
        />
      )}
    </div>
  );
}

function GroupCard({ group, user, onJoinGroup, onLeaveGroup, onViewDetails }: {
  group: Group;
  user: User;
  onJoinGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => void;
  onViewDetails: (group: Group) => void;
}) {
  const isJoined = user.joinedGroups.includes(group.id);
  const isFull = group.memberCount >= group.maxMembers;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      <div className="relative h-48">
        <img 
          src={group.image} 
          alt={group.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {group.subject}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{group.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{group.memberCount}/{group.maxMembers} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(group)}
            className="flex-1 px-4 py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            View Details
          </button>
          
          {isJoined ? (
            <button
              onClick={() => onLeaveGroup(group.id)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Leave Group
            </button>
          ) : (
            <button
              onClick={() => onJoinGroup(group.id)}
              disabled={isFull}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isFull 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isFull ? 'Group Full' : 'Join Group'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function GroupModal({ group, user, onClose, onJoinGroup, onLeaveGroup }: {
  group: Group;
  user: User;
  onClose: () => void;
  onJoinGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => void;
}) {
  const isJoined = user.joinedGroups.includes(group.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64">
          <img 
            src={group.image} 
            alt={group.name}
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{group.name}</h2>
            <p className="text-purple-600 font-medium">{group.subject}</p>
          </div>

          <p className="text-gray-600 mb-6">{group.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{group.memberCount}</div>
              <div className="text-sm text-gray-600">Current Members</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{group.maxMembers}</div>
              <div className="text-sm text-gray-600">Max Members</div>
            </div>
          </div>

          {/* Members List */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.members.map(member => (
                <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-800">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.major}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            {isJoined ? (
              <button
                onClick={() => {
                  onLeaveGroup(group.id);
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Leave Group
              </button>
            ) : (
              <button
                onClick={() => {
                  onJoinGroup(group.id);
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Join Group
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}