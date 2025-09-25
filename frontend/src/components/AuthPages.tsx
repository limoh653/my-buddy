import React, { useState } from 'react';
import { BookOpen, Mail, Lock, User, GraduationCap, Calendar } from 'lucide-react';

interface AuthPagesProps {
  page: string;
  onLogin: (email: string, password: string) => void;
  onSignup: (userData: any) => void;
}

export function AuthPages({ page, onLogin, onSignup }: AuthPagesProps) {
  if (page === 'home') {
    return <HomePage />;
  } else if (page === 'login') {
    return <LoginPage onLogin={onLogin} />;
  } else if (page === 'signup') {
    return <SignupPage onSignup={onSignup} />;
  }
  return null;
}

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full mb-6">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Study<span className="text-purple-300">Buddy</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-12 leading-relaxed">
              Connect with fellow students, join study groups, and achieve academic excellence together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <FeatureCard 
              icon={<User className="h-8 w-8" />}
              title="Connect"
              description="Meet like-minded students in your field of study"
            />
            <FeatureCard 
              icon={<BookOpen className="h-8 w-8" />}
              title="Study Together"
              description="Join or create study groups for any subject"
            />
            <FeatureCard 
              icon={<GraduationCap className="h-8 w-8" />}
              title="Excel"
              description="Improve your grades through collaborative learning"
            />
          </div>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-purple-900 font-semibold rounded-full hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Get Started
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-900 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your StudyBuddy account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={<Mail className="h-5 w-5" />}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            icon={<Lock className="h-5 w-5" />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <span className="text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
}

function SignupPage({ onSignup }: { onSignup: (userData: any) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    major: '',
    year: '',
    bio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4 py-8">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Join StudyBuddy</h2>
          <p className="text-gray-600 mt-2">Create your account and start studying together</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={<User className="h-5 w-5" />}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            icon={<Mail className="h-5 w-5" />}
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            icon={<Lock className="h-5 w-5" />}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              icon={<GraduationCap className="h-5 w-5" />}
              name="major"
              value={formData.major}
              onChange={handleChange}
              options={['Computer Science', 'Mathematics', 'Physics', 'Biology', 'Chemistry', 'Engineering', 'Other']}
              placeholder="Major"
              required
            />
            <SelectField
              icon={<Calendar className="h-5 w-5" />}
              name="year"
              value={formData.year}
              onChange={handleChange}
              options={['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']}
              placeholder="Year"
              required
            />
          </div>

          <div className="relative">
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
            Sign in here
          </span>
        </p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-lg mb-4 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-purple-100">{description}</p>
    </div>
  );
}

function InputField({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <input
        {...props}
        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    </div>
  );
}

function SelectField({ icon, options, placeholder, ...props }: { 
  icon: React.ReactNode; 
  options: string[]; 
  placeholder: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    </div>
  );
}