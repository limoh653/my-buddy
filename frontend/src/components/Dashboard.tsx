import React from 'react';
import { Users, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { User, Group } from '../types';

interface DashboardProps {
  user: User;
  groups: Group[];
}

export function Dashboard({ user, groups }: DashboardProps) {
  const userGroups = groups.filter(group => user.joinedGroups.includes(group.id));
  const recentActivity = [
    { action: 'Joined', group: 'Advanced Algorithms Study Group', time: '2 hours ago' },
    { action: 'Left', group: 'Linear Algebra Workshop', time: '1 day ago' },
    { action: 'Created', group: 'React Development Bootcamp', time: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 text-lg">Here's what's happening with your study groups today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<Users className="h-8 w-8 text-purple-600" />}
            title="Groups Joined"
            value={userGroups.length}
            color="purple"
          />
          <StatCard 
            icon={<BookOpen className="h-8 w-8 text-blue-600" />}
            title="Study Sessions"
            value="24"
            color="blue"
          />
          <StatCard 
            icon={<TrendingUp className="h-8 w-8 text-green-600" />}
            title="Progress Score"
            value="85%"
            color="green"
          />
          <StatCard 
            icon={<Calendar className="h-8 w-8 text-orange-600" />}
            title="This Week"
            value="6 sessions"
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Groups */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Study Groups</h2>
              <div className="space-y-4">
                {userGroups.map(group => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.action === 'Joined' ? 'bg-green-500' : 
                      activity.action === 'Left' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {activity.action} <span className="text-purple-600">{activity.group}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
    orange: 'from-orange-500 to-orange-600'
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

function GroupCard({ group }: { group: Group }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
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
      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        View
      </button>
    </div>
  );
}