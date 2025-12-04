import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 animate-fade-in-down">
            About EventHub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to bringing people together through unforgettable experiences. 
            Our platform simplifies event discovery and booking, making it easier than ever to connect with your passions.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { label: 'Active Users', value: '10K+', icon: '👥' },
            { label: 'Events Hosted', value: '500+', icon: '🎉' },
            { label: 'Cities', value: '20+', icon: '🌍' },
          ].map((stat, index) => (
            <div key={index} className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-indigo-500/20">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-indigo-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 md:p-12 mb-20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                At EventHub, we believe that life is made of moments. Our mission is to empower organizers to create amazing events and help attendees find experiences that matter to them.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Whether it's a tech conference, a music festival, or a local workshop, we provide the tools and platform to make it happen seamlessly.
              </p>
              <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-indigo-500/30">
                Get in Touch
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Event Crowd" 
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-12">Meet The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Alex Johnson', role: 'CEO & Founder', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Sarah Williams', role: 'Head of Design', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Michael Chen', role: 'Lead Developer', img: 'https://randomuser.me/api/portraits/men/22.jpg' },
              { name: 'Emily Davis', role: 'Marketing Director', img: 'https://randomuser.me/api/portraits/women/28.jpg' },
            ].map((member, index) => (
              <div key={index} className="group bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:bg-gray-800/60 transition-all duration-300">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="relative w-full h-full rounded-full object-cover border-2 border-indigo-500/50 group-hover:border-indigo-400 transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-indigo-300 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;