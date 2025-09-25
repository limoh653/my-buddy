import React from 'react';
import { Users, BookOpen, CircleUser as UserCircle, Home, LogIn, UserPlus, Settings, Info } from 'lucide-react';
import { AuthState } from '../types';

interface NavbarProps {
  authState: AuthState;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function Navbar({ authState, currentPage, onPageChange, onLogout }: NavbarProps) {
  const { isAuthenticated, user } = authState;

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              StudyBuddy
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {!isAuthenticated ? (
              <>
                <NavButton 
                  icon={<Home className="h-4 w-4" />} 
                  text="Home" 
                  onClick={() => onPageChange('home')}
                  active={currentPage === 'home'}
                />
                <NavButton 
                  icon={<LogIn className="h-4 w-4" />} 
                  text="Login" 
                  onClick={() => onPageChange('login')}
                  active={currentPage === 'login'}
                />
                <NavButton 
                  icon={<UserPlus className="h-4 w-4" />} 
                  text="Sign Up" 
                  onClick={() => onPageChange('signup')}
                  active={currentPage === 'signup'}
                />
              </>
            ) : (
              <>
                <NavButton 
                  icon={<Home className="h-4 w-4" />} 
                  text="Dashboard" 
                  onClick={() => onPageChange('dashboard')}
                  active={currentPage === 'dashboard'}
                />
                <NavButton 
                  icon={<UserCircle className="h-4 w-4" />} 
                  text="Profile" 
                  onClick={() => onPageChange('profile')}
                  active={currentPage === 'profile'}
                />
                <NavButton 
                  icon={<Users className="h-4 w-4" />} 
                  text="Groups" 
                  onClick={() => onPageChange('groups')}
                  active={currentPage === 'groups'}
                />
                <NavButton 
                  icon={<Settings className="h-4 w-4" />} 
                  text="My Groups" 
                  onClick={() => onPageChange('mygroups')}
                  active={currentPage === 'mygroups'}
                />
                <NavButton 
                  icon={<Info className="h-4 w-4" />} 
                  text="About" 
                  onClick={() => onPageChange('about')}
                  active={currentPage === 'about'}
                />
                
                {/* User Avatar & Logout */}
                <div className="flex items-center ml-4 space-x-3">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={user?.avatar} 
                      alt={user?.name} 
                      className="w-8 h-8 rounded-full border-2 border-purple-200"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden lg:block">{user?.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-sm px-4 py-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavButton({ icon, text, onClick, active }: { 
  icon: React.ReactNode; 
  text: string; 
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-purple-100 text-purple-700 shadow-sm' 
          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </button>
  );
}