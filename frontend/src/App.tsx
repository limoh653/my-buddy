import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AuthPages } from './components/AuthPages';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Groups } from './components/Groups';
import { MyGroups } from './components/MyGroups';
import { About } from './components/About';
import { AuthState, User } from './types';
import { mockUsers, mockGroups } from './data/mockData';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [groups, setGroups] = useState(mockGroups);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in a real app, this would call an API
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      setAuthState({ isAuthenticated: true, user });
      setCurrentPage('dashboard');
    }
  };

  const handleSignup = (userData: any) => {
    // Mock user creation - in a real app, this would call an API
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      ...userData,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      joinedGroups: []
    };
    
    mockUsers.push(newUser);
    setAuthState({ isAuthenticated: true, user: newUser });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    setCurrentPage('home');
  };

  const handleJoinGroup = (groupId: string) => {
    if (!authState.user) return;
    
    // Update user's joined groups
    const updatedUser = {
      ...authState.user,
      joinedGroups: [...authState.user.joinedGroups, groupId]
    };
    setAuthState({ ...authState, user: updatedUser });

    // Update group's member count and add user to members
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { 
            ...group, 
            memberCount: group.memberCount + 1,
            members: [...group.members, authState.user!]
          }
        : group
    ));
  };

  const handleLeaveGroup = (groupId: string) => {
    if (!authState.user) return;
    
    // Update user's joined groups
    const updatedUser = {
      ...authState.user,
      joinedGroups: authState.user.joinedGroups.filter(id => id !== groupId)
    };
    setAuthState({ ...authState, user: updatedUser });

    // Update group's member count and remove user from members
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { 
            ...group, 
            memberCount: Math.max(0, group.memberCount - 1),
            members: group.members.filter(member => member.id !== authState.user!.id)
          }
        : group
    ));
  };

  const handleCreateGroup = (groupData: Partial<any>) => {
    if (!authState.user) return;

    const newGroup = {
      id: (groups.length + 1).toString(),
      name: groupData.name,
      description: groupData.description,
      subject: groupData.subject,
      memberCount: 1,
      members: [authState.user],
      createdBy: authState.user.id,
      createdAt: new Date().toISOString().split('T')[0],
      image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      maxMembers: groupData.maxMembers
    };

    setGroups([...groups, newGroup]);

    // Add the new group to user's joined groups
    const updatedUser = {
      ...authState.user,
      joinedGroups: [...authState.user.joinedGroups, newGroup.id]
    };
    setAuthState({ ...authState, user: updatedUser });
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
    
    // Remove group from user's joined groups if they were a member
    if (authState.user && authState.user.joinedGroups.includes(groupId)) {
      const updatedUser = {
        ...authState.user,
        joinedGroups: authState.user.joinedGroups.filter(id => id !== groupId)
      };
      setAuthState({ ...authState, user: updatedUser });
    }
  };

  const handleUpdateProfile = (userData: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = { ...authState.user, ...userData };
    setAuthState({ ...authState, user: updatedUser });
  };

  const renderCurrentPage = () => {
    if (!authState.isAuthenticated) {
      return <AuthPages page={currentPage} onLogin={handleLogin} onSignup={handleSignup} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={authState.user!} groups={groups} />;
      case 'profile':
        return <Profile user={authState.user!} groups={groups} onUpdateProfile={handleUpdateProfile} />;
      case 'groups':
        return <Groups user={authState.user!} groups={groups} onJoinGroup={handleJoinGroup} onLeaveGroup={handleLeaveGroup} />;
      case 'mygroups':
        return <MyGroups user={authState.user!} groups={groups} onCreateGroup={handleCreateGroup} onDeleteGroup={handleDeleteGroup} />;
      case 'about':
        return <About />;
      default:
        return <Dashboard user={authState.user!} groups={groups} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        authState={authState}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;