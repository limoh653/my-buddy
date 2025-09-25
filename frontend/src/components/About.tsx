import React from 'react';
import { BookOpen, Users, Target, Heart, Star, Award } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-8">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About StudyBuddy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering students worldwide to achieve academic excellence through collaborative learning and meaningful connections.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At StudyBuddy, we believe that learning is most effective when it's collaborative. Our platform connects students with similar academic interests, creating a supportive ecosystem where knowledge flows freely and everyone succeeds together.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We're passionate about breaking down the barriers to academic success and making high-quality education accessible through peer-to-peer learning networks.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Students collaborating"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Users className="h-12 w-12 text-purple-600" />}
            title="Connect & Collaborate"
            description="Find study partners who share your academic passion and learning style."
          />
          <FeatureCard
            icon={<Target className="h-12 w-12 text-blue-600" />}
            title="Goal-Oriented Learning"
            description="Set clear objectives and track your progress with structured study groups."
          />
          <FeatureCard
            icon={<Heart className="h-12 w-12 text-pink-600" />}
            title="Supportive Community"
            description="Build lasting friendships while achieving your academic dreams together."
          />
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">StudyBuddy by the Numbers</h2>
            <p className="text-purple-100 text-lg">Join thousands of students who are already succeeding together</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="10,000+" label="Active Students" />
            <StatCard number="2,500+" label="Study Groups" />
            <StatCard number="50+" label="Subjects Covered" />
            <StatCard number="95%" label="Success Rate" />
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How StudyBuddy Works</h2>
            <p className="text-gray-600 text-lg">Getting started is simple and intuitive</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              step="1"
              title="Create Your Profile"
              description="Tell us about your academic interests, goals, and preferred learning style."
            />
            <StepCard
              step="2"
              title="Find Your Groups"
              description="Browse and join study groups that match your subjects and schedule."
            />
            <StepCard
              step="3"
              title="Start Learning Together"
              description="Collaborate, share knowledge, and achieve your academic goals as a team."
            />
          </div>
        </div>

        {/* Values */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Star className="h-8 w-8 text-yellow-500" />}
              title="Excellence"
              description="We strive for the highest quality in everything we build and deliver."
            />
            <ValueCard
              icon={<Users className="h-8 w-8 text-blue-500" />}
              title="Community"
              description="We believe in the power of collective learning and mutual support."
            />
            <ValueCard
              icon={<Heart className="h-8 w-8 text-pink-500" />}
              title="Inclusivity"
              description="Everyone deserves access to quality education and learning opportunities."
            />
            <ValueCard
              icon={<Award className="h-8 w-8 text-green-500" />}
              title="Growth"
              description="We're committed to continuous improvement and lifelong learning."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300">
      <div className="flex justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-white">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-purple-100">{label}</div>
    </div>
  );
}

function StepCard({ step, title, description }: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
        {step}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function ValueCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}