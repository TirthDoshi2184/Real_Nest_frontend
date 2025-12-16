import React, { useState } from 'react';
import {
  Home, Building, Users, Trophy, Shield, Star,
  ArrowRight, Banknote, Key, Search, PieChart,
  ArrowDown, CheckCircle, Globe, Target, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
const navigate = useNavigate();

  const checkAuth = (path) => {
  const userId = sessionStorage.getItem('id');
  if (!userId) {
    navigate('/login', { state: { from: path } });
    return; // Exit function, don't continue
  }
  navigate(path); // This only runs if userId exists
};
  // ... (keep all the existing constants: stats, services, values, testimonials)

  const handleExplore = () => {
  checkAuth('/home');
};

  const stats = [
    { icon: <Home size={24} />, value: "10K+", label: "Properties Sold" },
    { icon: <Users size={24} />, value: "50K+", label: "Happy Clients" },
    { icon: <Building size={24} />, value: "15+", label: "Cities Covered" },
    { icon: <Trophy size={24} />, value: "12+", label: "Years Experience", highlight: true }
  ];

  const services = [
    {
      icon: <Key className="text-blue-500" size={32} />,
      title: "Buy Property",
      description: "Find your dream home from our extensive collection of properties"
    },
    {
      icon: <Banknote className="text-green-500" size={32} />,
      title: "Sell Property",
      description: "Get the best value for your property with our expert guidance"
    },
    {
      icon: <Home className="text-purple-500" size={32} />,
      title: "Rent Property",
      description: "Discover rental properties that match your lifestyle"
    }
  ];

  const values = [
    {
      icon: <Heart className="text-red-500" size={32} />,
      title: "Client-Centric Approach",
      description: "Your dreams and needs are at the heart of everything we do"
    },
    {
      icon: <Target className="text-blue-500" size={32} />,
      title: "Excellence in Service",
      description: "Committed to delivering exceptional real estate experiences"
    },
    {
      icon: <Globe className="text-green-500" size={32} />,
      title: "Global Standards",
      description: "Following international best practices in real estate"
    },
    {
      icon: <CheckCircle className="text-purple-500" size={32} />,
      title: "Integrity & Trust",
      description: "Building relationships based on transparency and honesty"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "/api/placeholder/80/80",
      quote: "RealNest helped me find my dream home within my budget. Their team was incredibly supportive throughout the process."
    },
    {
      name: "Michael Chen",
      role: "Property Investor",
      image: "/api/placeholder/80/80",
      quote: "The market insights and investment opportunities provided by RealNest have been invaluable for my portfolio growth."
    },
    {
      name: "Priya Patel",
      role: "Business Owner",
      image: "/api/placeholder/80/80",
      quote: "Found the perfect commercial space for my restaurant. The team understood exactly what I was looking for."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Hero Section */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Elements - Animated */}
        <motion.div 
          className="absolute right-10 top-40 w-32 h-32 bg-white/10 backdrop-blur-lg rounded-2xl"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="p-4 text-white text-center">
            <Home size={32} className="mx-auto mb-2" />
            <div className="text-sm font-semibold">10K+</div>
            <div className="text-xs">Properties</div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute left-20 bottom-40 w-32 h-32 bg-white/10 backdrop-blur-lg rounded-2xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <div className="p-4 text-white text-center">
            <Users size={32} className="mx-auto mb-2" />
            <div className="text-sm font-semibold">50K+</div>
            <div className="text-xs">Happy Clients</div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 flex-grow flex items-center">
          <div className="max-w-7xl mx-auto px-4 py-20">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-white text-center max-w-4xl mx-auto"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full"
              >
                <span className="text-sm font-semibold">Trusted by 50,000+ Happy Clients</span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Building Dreams,<br />
                <span className="text-blue-400">Creating Homes</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl mb-8 text-gray-200"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Since 2024, RealNest has been revolutionizing the real estate experience. 
                We don't just sell properties; we help you discover the perfect place to 
                create lasting memories.
              </motion.p>
              
              <motion.div 
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button 
                  onClick={handleExplore}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full 
                           font-semibold transition-all flex items-center gap-2 group"
                >
                  Explore Properties
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
              {/* Trust Indicators */}
              <motion.div 
                className="mt-12 flex justify-center gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { icon: <Star size={20} />, text: "5-Star Rated" },
                  { icon: <Shield size={20} />, text: "Fully Verified" },
                  { icon: <CheckCircle size={20} />, text: "24/7 Support" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                    {item.icon}
                    {item.text}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-sm mb-2">Scroll to explore</div>
          <ArrowDown size={20} className="mx-auto" />
        </motion.div>
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-8 rounded-xl ${
                  stat.highlight ? 'bg-blue-600 text-white' : 'bg-gray-50'
                }`}
              >
                <div className={`mb-4 ${stat.highlight ? 'text-white' : 'text-blue-600'}`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className={stat.highlight ? 'text-blue-100' : 'text-gray-600'}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section (New) */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-blue-200">The principles that guide us in creating exceptional real estate experiences</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-white/10 backdrop-blur-lg"
                whileHover={{ y: -10 }}
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-blue-200">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-gray-50 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Client Success Stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-white/10 backdrop-blur-lg"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-blue-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >            Ready to Find Your Perfect Property?
          </motion.h2>
          <motion.p 
            className="text-xl mb-12 text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Join thousands of satisfied clients who have found their dream properties with RealNest
          </motion.p>
          <motion.div 
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button 
                  onClick={handleExplore}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full 
                           font-semibold transition-all flex items-center gap-2 group"
                >
                  Explore Properties
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;