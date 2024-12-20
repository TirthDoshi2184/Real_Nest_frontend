import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { 
  Target, Shield, Zap, Building, Users, 
  Globe, TrendingUp, Lock, Clock, Headphones, Infinity
} from 'lucide-react';

// Theme Configuration
const theme = {
  colors: {
    primary: '#4A6CF7',
    secondary: '#3A4FE0',
    white: '#FFFFFF',
    text: '#2c3e50',
    background: '#f5f7fa',
    lightBackground: '#f4f6f9'
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
  }
};

// Styled Components
const PageContainer = styled.div`
  background: linear-gradient(135deg, ${theme.colors.background} 0%, #e9ecef 100%);
  font-family: ${theme.typography.fontFamily};
  color: ${theme.colors.text};
  line-height: 1.6;
`;

const SectionContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 900;
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: 60px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 5px;
    background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: ${theme.colors.white};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
`;

const CardBase = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 45px rgba(0,0,0,0.15);
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding: 20px;
  margin-bottom: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);

  &::before {
    content: '';
    position: absolute;
    width: 3px;
    height: 100%;
    background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
    left: -30px;
    top: 0;
  }
`;

const TestimonialCard = styled(CardBase)`
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 5rem;
    color: ${theme.colors.primary};
    opacity: 0.2;
  }
`;

const TechInnovationSection = styled(motion.div)`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
`;

const AboutUs = () => {
  // Section References
  const sectionRefs = {
    mission: useRef(null),
    timeline: useRef(null),
    stats: useRef(null),
    features: useRef(null),
    testimonials: useRef(null),
    innovation: useRef(null)
  };

  // In-View Tracking
  const isInView = Object.fromEntries(
    Object.keys(sectionRefs).map(key => [key, useInView(sectionRefs[key], { once: true })])
  );

  // Configuration Data
  const companyStats = [
    { icon: <Building color={theme.colors.primary} size={50} />, number: "500+", label: "Properties Listed" },
    { icon: <Users color="#2ECC71" size={50} />, number: "10K+", label: "Happy Customers" },
    { icon: <Globe color="#E74C3C" size={50} />, number: "25", label: "Cities Covered" },
    { icon: <TrendingUp color="#F39C12" size={50} />, number: "98%", label: "Customer Satisfaction" }
  ];

  const companyTimeline = [
    {
      year: "2018",
      title: "Company Inception",
      description: "Founded with a vision to revolutionize real estate technology."
    },
    {
      year: "2020",
      title: "First Major Platform Launch",
      description: "Introduced our AI-powered property matching algorithm."
    },
    {
      year: "2022",
      title: "National Expansion",
      description: "Expanded operations across 25+ major cities in India."
    }
  ];

  const missionValues = [
    {
      icon: <Target color={theme.colors.primary} size={60} />,
      title: "Precision Matching",
      description: "Advanced algorithms connecting perfect properties with ideal customers."
    },
    {
      icon: <Shield color="#2ECC71" size={60} />,
      title: "Transparent Transactions",
      description: "Ensuring trust, security, and clarity in every real estate interaction."
    },
    {
      icon: <Zap color="#E74C3C" size={60} />,
      title: "Innovative Solutions",
      description: "Continuously evolving technology to simplify property discovery."
    }
  ];


  const features = [
    {
      icon: <Shield color={theme.colors.primary} size={60} />,
      title: "Secure Transactions",
      description: "End-to-end encryption and verified property listings ensure complete transaction security."
    },
    {
      icon: <Infinity color="#2ECC71" size={60} />,
      title: "Comprehensive Listings",
      description: "Extensive database covering plots, shops, flats, and bungalows across multiple cities."
    },
    {
      icon: <Headphones color="#E74C3C" size={60} />,
      title: "24/7 Support",
      description: "Dedicated customer support team available round the clock to assist you."
    },
    {
      icon: <Clock color="#F39C12" size={60} />,
      title: "Quick Matching",
      description: "AI-powered property matching algorithm connects you with ideal properties instantly."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "First-Time Homebuyer",
      text: "RealNest made my property buying journey incredibly smooth. Their platform is intuitive and the support team was fantastic!",
      location: "Mumbai"
    },
    {
      name: "Raj Patel",
      role: "Real Estate Investor",
      text: "The comprehensive property insights and secure transaction process set RealNest apart from other platforms.",
      location: "Ahmedabad"
    },
    {
      name: "Emily Wong",
      role: "Commercial Property Seeker",
      text: "Finding the perfect shop for my business was effortless with RealNest's advanced search capabilities.",
      location: "Bangalore"
    }
  ];

  const techInnovations = [
    {
      icon: <TrendingUp color="white" size={50} />,
      title: "AI Matching",
      description: "Advanced algorithms that predict and match your ideal property"
    },
    {
      icon: <Globe color="white" size={50} />,
      title: "Nationwide Coverage",
      description: "Extensive property database across multiple cities and regions"
    },
    {
      icon: <Lock color="white" size={50} />,
      title: "Secure Platform",
      description: "End-to-end encryption and verified property listings"
    }
  ];
  const missionHighlights = [
    {
      icon: <Target color="white" size={40} />,
      title: "Precision",
      description: "AI-driven property matching",
    },
    {
      icon: <Globe color="white" size={40} />,
      title: "Reach",
      description: "Nationwide property coverage",
    },
    {
      icon: <Users color="white" size={40} />,
      title: "Trust",
      description: "Transparent transactions",
    },
  ];
  

  return (
    <PageContainer>
         <div
      style={{
        position: 'relative',
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
        color: 'white',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Abstract Shapes */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          zIndex: 1,
        }}
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'loop' }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1, paddingRight: '40px' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: '4rem',
              fontWeight: 900,
              marginBottom: '25px',
              lineHeight: 1.2,
            }}
          >
            Transforming Real Estate
            <br />
            <span style={{ color: '#FFD700' }}>Beyond Boundaries</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: '1.4rem',
              marginBottom: '30px',
              fontWeight: 300,
              opacity: 0.9,
            }}
          >
            Empowering dreams through innovative technology, comprehensive insights, and a
            customer-centric approach to real estate discovery and transactions.
          </motion.p>

          {/* Mission Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ display: 'flex', gap: '30px', marginTop: '40px' }}
          >
            {missionHighlights.map((item, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  flex: 1,
                }}
              >
                <div style={{ marginBottom: '15px' }}>{item.icon}</div>
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Interactive 3D Model */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1, position: 'relative', height: '500px' }}
        >
          <Canvas style={{ borderRadius: '30px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <RotatingCube />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </motion.div>
      </div>
    </div>
      {/* Company Mission & Values */}
      <SectionContainer 
        ref={sectionRefs.mission}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView.mission ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>Our Mission & Vision</SectionTitle>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {missionValues.map((item, index) => (
            <CardBase
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView.mission ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div style={{ marginBottom: '20px' }}>{item.icon}</div>
              <h3 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '15px', 
                fontWeight: 'bold' 
              }}>
                {item.title}
              </h3>
              <p>{item.description}</p>
            </CardBase>
          ))}
        </div>
      </SectionContainer>

      {/* Company Values and Culture Section */}
      <SectionContainer
        ref={sectionRefs.timeline}
        style={{ background: theme.colors.lightBackground }}
      >
        <SectionTitle>Our Core Values</SectionTitle>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {[
            {
              icon: <Users color={theme.colors.primary} size={60} />,
              title: "Customer-First Approach",
              description: "We prioritize our customers' needs, ensuring personalized solutions and exceptional support at every step of their real estate journey.",
              color: theme.colors.primary
            },
            {
              icon: <Lock color="#2ECC71" size={60} />,
              title: "Integrity & Trust",
              description: "Transparency and honesty are the cornerstones of our business. We build lasting relationships through ethical practices and genuine commitment.",
              color: "#2ECC71"
            },
            {
              icon: <Globe color="#E74C3C" size={60} />,
              title: "Continuous Innovation",
              description: "We constantly evolve our technology and approaches, staying ahead of market trends to deliver cutting-edge real estate solutions.",
              color: "#E74C3C"
            }
          ].map((value, index) => (
            <CardBase
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView.timeline ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.3, duration: 0.6 }}
            >
              <div style={{ 
                marginBottom: '20px', 
                color: value.color 
              }}>
                {value.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '15px', 
                fontWeight: 'bold',
                color: theme.colors.text
              }}>
                {value.title}
              </h3>
              <p style={{ 
                color: theme.colors.text,
                lineHeight: 1.6 
              }}>
                {value.description}
              </p>
            </CardBase>
          ))}
        </div>

        {/* Culture Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView.timeline ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ 
            marginTop: '60px', 
            textAlign: 'center', 
            maxWidth: '800px', 
            margin: '60px auto 0' 
          }}
        >
          <h3 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '20px',
            color: theme.colors.text
          }}>
            Our Cultural Commitment
          </h3>
          <p style={{ 
            fontSize: '1.2rem', 
            color: theme.colors.text,
            lineHeight: 1.8 
          }}>
            At RealNest, we believe in creating an ecosystem that goes beyond transactions. 
            We foster a culture of collaboration, continuous learning, and social responsibility. 
            Our team is committed to not just transforming real estate technology, but also 
            making a positive impact on the communities we serve.
          </p>
        </motion.div>
      </SectionContainer>
      {/* Company Stats */}
      <SectionContainer 
        ref={sectionRefs.stats}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView.stats ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>Our Achievement Highlights</SectionTitle>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '30px' 
        }}>
          {companyStats.map((stat, index) => (
            <CardBase
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView.stats ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div style={{ marginBottom: '20px' }}>{stat.icon}</div>
              <h3 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                color: theme.colors.primary, 
                marginBottom: '10px' 
              }}>
                {stat.number}
              </h3>
              <p style={{ fontSize: '1.1rem' }}>{stat.label}</p>
            </CardBase>
          ))}
        </div>
      </SectionContainer>

      {/* Features Section */}
      <SectionContainer 
        ref={sectionRefs.features}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView.features ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>Why Choose RealNest?</SectionTitle>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {features.map((feature, index) => (
            <CardBase
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView.features ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div style={{ marginBottom: '20px' }}>{feature.icon}</div>
              <h3 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '15px', 
                fontWeight: 'bold'
              }}>
              {feature.title}
            </h3>
            <p>{feature.description}</p>
          </CardBase>
        ))}
      </div>
    </SectionContainer>

    {/* Testimonials Section */}
    <SectionContainer 
      ref={sectionRefs.testimonials}
      style={{ background: theme.colors.lightBackground }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView.testimonials ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle>What Our Customers Say</SectionTitle>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '30px' 
      }}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView.testimonials ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <p style={{ 
              fontSize: '1.2rem', 
              marginBottom: '20px',
              fontStyle: 'italic'
            }}>
              {testimonial.text}
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginTop: '20px'
            }}>
              <div>
                <h4 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: theme.colors.primary 
                }}>
                  {testimonial.name}
                </h4>
                <p style={{ 
                  fontSize: '1rem', 
                  color: theme.colors.text 
                }}>
                  {testimonial.role}, {testimonial.location}
                </p>
              </div>
            </div>
          </TestimonialCard>
        ))}
      </div>
    </SectionContainer>

    {/* Tech Innovation Section */}
    <TechInnovationSection
      ref={sectionRefs.innovation}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView.innovation ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle style={{ color: 'white' }}>Our Technological Edge</SectionTitle>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px' 
      }}>
        {techInnovations.map((innovation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView.innovation ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            style={{ 
              textAlign: 'center', 
              color: 'white' 
            }}
          >
            <div style={{ marginBottom: '20px' }}>{innovation.icon}</div>
            <h3 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '15px', 
              fontWeight: 'bold' 
            }}>
              {innovation.title}
            </h3>
            <p>{innovation.description}</p>
          </motion.div>
        ))}
      </div>
    </TechInnovationSection>
  </PageContainer>
);
};

export default AboutUs;