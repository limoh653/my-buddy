import React, { useState } from 'react';
import { Plus, Users, Settings, Trash2, Crown } from 'lucide-react';
import { User, Group } from '../types';

interface MyGroupsProps {
  user: User;
  groups: Group[];
  onCreateGroup: (groupData: Partial<Group>) => void;
  onDeleteGroup: (groupId: string) => void;
}

export function MyGroups({ user, groups, onCreateGroup, onDeleteGroup }: MyGroupsProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
    subject: '',
    maxMembers: 10
  });

  const userGroups = groups.filter(group => user.joinedGroups.includes(group.id));
  const createdGroups = groups.filter(group => group.createdBy === user.id);

  const handleCreateGroup = () => {
    onCreateGroup(newGroupData);
    setNewGroupData({ name: '', description: '', subject: '', maxMembers: 10 });
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Study Groups</h1>
            <p className="text-gray-600 text-lg">Manage your study groups and create new ones</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>Create Group</span>
          </button>
        </div>

        {/* Groups I Created */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <span>Groups I Created</span>
          </h2>
          
          {createdGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdGroups.map(group => (
                <CreatedGroupCard 
                  key={group.id} 
                  group={group} 
                  onDelete={() => onDeleteGroup(group.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center">
              <Crown className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">You haven't created any groups yet</p>
              <p className="text-gray-500 mb-6">Create your first study group and become a leader!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Your First Group
              </button>
            </div>
          )}
        </div>

        {/* Groups I Joined */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-500" />
            <span>Groups I Joined</span>
          </h2>
          
          {userGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userGroups.map(group => (
                <JoinedGroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">You haven't joined any groups yet</p>
              <p className="text-gray-500 mb-6">Browse available groups and start collaborating!</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse Groups
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Study Group</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Group Name"
                value={newGroupData.name}
                onChange={(e) => setNewGroupData({...newGroupData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              
              <select
                value={newGroupData.subject}
                onChange={(e) => setNewGroupData({...newGroupData, subject: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Subject</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
              
              <textarea
                placeholder="Group Description"
                value={newGroupData.description}
                onChange={(e) => setNewGroupData({...newGroupData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Members</label>
                <input
                  type="number"
                  min="2"
                  max="50"
                  value={newGroupData.maxMembers}
                  onChange={(e) => setNewGroupData({...newGroupData, maxMembers: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-8">
              <button
                onClick={handleCreateGroup}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Group
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewGroupData({ name: '', description: '', subject: '', maxMembers: 10 });
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CreatedGroupCard({ group, onDelete }: { group: Group; onDelete: () => void }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
      <img 
        src={group.image} 
        alt={group.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800">{group.name}</h3>
          <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Crown className="h-3 w-3" />
            <span>Owner</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{group.subject}</span>
          <span>{group.memberCount}/{group.maxMembers} members</span>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1">
            <Settings className="h-4 w-4" />
            <span>Manage</span>
          </button>
          <button 
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function JoinedGroupCard({ group }: { group: Group }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
      <img 
        src={group.image} 
        alt={group.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{group.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{group.subject}</span>
          <span>{group.memberCount} members</span>
        </div>

        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View Group
        </button>
      </div>
    </div>
  );
}