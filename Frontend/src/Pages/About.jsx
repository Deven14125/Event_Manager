import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Target, 
  Heart, 
  Award,
  Sparkles,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  Users as UsersIcon,
  Building,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle,
  Rocket,
  Handshake,
  Eye
} from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="text-blue-400" size={24} />, value: "50K+", label: "Active Users", color: "from-blue-500/20 to-blue-600/20" },
    { icon: <Calendar className="text-green-400" size={24} />, value: "2K+", label: "Events Hosted", color: "from-green-500/20 to-green-600/20" },
    { icon: <MapPin className="text-yellow-400" size={24} />, value: "100+", label: "Cities Worldwide", color: "from-yellow-500/20 to-yellow-600/20" },
    { icon: <Award className="text-cyan-400" size={24} />, value: "4.9★", label: "User Rating", color: "from-cyan-500/20 to-cyan-600/20" },
  ];

  const values = [
    { 
      icon: <Sparkles className="text-blue-400" size={24} />, 
      title: "Innovation", 
      description: "Constantly evolving to provide cutting-edge event solutions",
      color: "border-l-4 border-blue-500"
    },
    { 
      icon: <Heart className="text-red-400" size={24} />, 
      title: "Community First", 
      description: "Building connections that last beyond the event",
      color: "border-l-4 border-red-500"
    },
    { 
      icon: <Shield className="text-green-400" size={24} />, 
      title: "Trust & Safety", 
      description: "Enterprise-grade security for all transactions",
      color: "border-l-4 border-green-500"
    },
    { 
      icon: <Globe className="text-purple-400" size={24} />, 
      title: "Global Reach", 
      description: "Connecting people across continents and cultures",
      color: "border-l-4 border-purple-500"
    },
  ];

  const team = [
    { 
      name: 'Alex Johnson', 
      role: 'CEO & Founder', 
      bio: 'Former Google PM, passionate about community building',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    { 
      name: 'Sarah Williams', 
      role: 'Head of Design', 
      bio: 'Ex-Apple designer, UX specialist with 10+ years experience',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    { 
      name: 'Michael Chen', 
      role: 'Lead Developer', 
      bio: 'Full-stack wizard, open-source contributor',
      img: 'https://randomuser.me/api/portraits/men/22.jpg',
      color: 'from-yellow-500/20 to-amber-500/20'
    },
    { 
      name: 'Emily Davis', 
      role: 'Marketing Director', 
      bio: 'Growth hacker, community engagement expert',
      img: 'https://randomuser.me/api/portraits/women/28.jpg',
      color: 'from-purple-500/20 to-pink-500/20'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Our Story
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                About EventHub
              </span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              {`We're on a mission to transform how people discover, attend, and create unforgettable events. 
              From intimate workshops to global conferences, we're building the future of experiences.`}
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gray-800/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                  <Target size={24} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                To empower every person and organization to create meaningful connections through extraordinary events. 
                We believe that the best moments in life happen when people come together.
              </p>
              <div className="space-y-3">
                {[
                  "Democratize event creation tools",
                  "Bridge physical and digital experiences",
                  "Foster inclusive communities",
                  "Drive sustainable event practices"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl">
                  <Eye size={24} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                A world where anyone, anywhere can discover and create events that matter. 
                Where technology enhances human connection rather than replacing it.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Rocket size={20} className="text-yellow-400" />
                  <div>
                    <p className="font-semibold text-white">Global Impact</p>
                    <p className="text-sm text-gray-400">Reaching 1M+ users by 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-cyan-400" />
                  <div>
                    <p className="font-semibold text-white">Innovation</p>
                    <p className="text-sm text-gray-400">AR/VR event experiences coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 px-4 py-2 rounded-full mb-4">
                <Heart size={16} className="text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">
                  Our Core Values
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                What Guides Us Every Day
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <div 
                  key={idx} 
                  className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 ${value.color} hover:border-blue-500/50 transition-all duration-300 group`}
                >
                  <div className="mb-4 p-3 bg-gray-800/50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full mb-4">
                <UsersIcon size={16} className="text-purple-400" />
                <span className="text-sm font-medium text-purple-400">
                  Meet The Team
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                The Visionaries Behind EventHub
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A diverse team of passionate innovators building the future of events
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="relative w-24 h-24 rounded-full object-cover border-4 border-gray-800/50 group-hover:border-blue-500/50 transition-colors mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">{member.name}</h3>
                  <p className="text-blue-400 text-sm text-center mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm text-center mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <button className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Mail size={16} />
                    </button>
                    <button className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Phone size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600/20 via-green-600/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-gray-700/50">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-4 py-2 rounded-full mb-6">
                <Handshake size={16} className="text-yellow-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Join Our Journey
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Create Amazing Events?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
               {` Whether you're looking to host your first event or scale your existing ones, 
                we're here to help you succeed.`}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Mail size={20} />
                  <span>Get in Touch</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <Link 
                  to="/careers"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:text-white font-bold rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <UsersIcon size={20} />
                  <span>Join Our Team</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <Building size={32} className="text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Headquarters</h4>
              <p className="text-gray-400">San Francisco, CA</p>
              <p className="text-gray-400 text-sm">With remote teams worldwide</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <Calendar size={32} className="text-green-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Founded</h4>
              <p className="text-gray-400">2022</p>
              <p className="text-gray-400 text-sm">3 years of innovation</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <TrendingUp size={32} className="text-yellow-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Growth</h4>
              <p className="text-gray-400">300% YoY</p>
              <p className="text-gray-400 text-sm">Fastest growing in the space</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;