import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft, Building2, MapPin, Phone, Home, Calendar, 
  DollarSign, Sparkles, Trees, ParkingSquare, CloudSun, 
  Shield, Ruler, Bath, Bed, Users, Wifi, Lock, 
  Zap, MapPinned, Clock, Award
} from 'lucide-react';

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f4f7fa'
  },
  sidebar: {
    width: '300px',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    height: '100%',
    overflowY: 'auto',
    borderRight: '1px solid #e2e8f0'
  },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#2c3e50',
    borderBottom: '2px solid #3182ce',
    paddingBottom: '10px'
  },
  sidebarNav: {
    listStyle: 'none',
    padding: 0
  },
  sidebarNavItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    cursor: 'pointer',
    borderRadius: '8px',
    marginBottom: '10px',
    transition: 'all 0.3s ease',
    color: '#4a5568'
  },
  sidebarNavItemActive: {
    backgroundColor: '#e6f2ff',
    color: '#2c5282',
    fontWeight: 'bold'
  },
  mainContent: {
    marginLeft: '300px',
    width: 'calc(100% - 300px)',
    padding: '20px',
    overflowY: 'auto',
    maxHeight: '100vh'
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    padding: '25px',
    marginBottom: '25px'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#2c3e50',
    borderBottom: '2px solid #3182ce',
    paddingBottom: '10px'
  }
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [societyRes, flatRes] = await Promise.all([
          axios.get(`http://localhost:3000/society/singlesociety/${id}`),
          axios.get(`http://localhost:3000/flat/singleflat/${id}`)
        ]);
        setProperty({
          society: societyRes.data,
          flat: flatRes.data.data
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const sidebarNavItems = [
    { id: 'overview', label: 'Property Overview', icon: MapPin },
    { id: 'features', label: 'Property Features', icon: Building2 },
    { id: 'amenities', label: 'Amenities', icon: CloudSun },
    { id: 'construction', label: 'Construction Details', icon: Shield },
    { id: 'dimensions', label: 'Dimensions & Layout', icon: Ruler },
    { id: 'neighborhood', label: 'Neighborhood', icon: Home },
    { id: 'pricing', label: 'Pricing & Terms', icon: DollarSign },
    { id: 'security', label: 'Security Features', icon: Lock },
    { id: 'contact', label: 'Contact Information', icon: Phone }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{
          width: '64px', 
          height: '64px', 
          border: '4px solid transparent',
          borderTopColor: '#2c5282',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Enhanced Sidebar Navigation */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Property Navigation</h2>
        <ul style={styles.sidebarNav}>
          {sidebarNavItems.map(section => {
            const Icon = section.icon;
            return (
              <li
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  ...styles.sidebarNavItem,
                  ...(activeSection === section.id ? styles.sidebarNavItemActive : {})
                }}
              >
                <Icon style={{ marginRight: '10px', width: '20px', height: '20px' }} />
                {section.label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <Link to="/properties" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          color: '#4a5568', 
          marginBottom: '20px',
          textDecoration: 'none'
        }}>
          <ArrowLeft style={{ marginRight: '8px' }} /> Back to Properties
        </Link>

        {/* Overview Section */}
        <section id="overview" style={styles.section}>
          <h2 style={styles.sectionTitle}>Property Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <img 
              src={property?.flat?.imageUrl || "/api/placeholder/800/600"} 
              alt={property?.flat?.society?.name}
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover', 
                borderRadius: '12px' 
              }}
            />
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>
                {property?.flat?.society?.name}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <MapPinned style={{ color: '#2c5282', marginBottom: '10px' }} />
                  <p>Location</p>
                  <strong>{property?.flat?.location}</strong>
                </div>
                <div>
                  <Clock style={{ color: '#2c5282', marginBottom: '10px' }} />
                  <p>Property Age</p>
                  <strong>{property?.society?.yearsOld} years</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Features Section */}
        <section id="features" style={styles.section}>
          <h2 style={styles.sectionTitle}>Property Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            <div>
              <Bed style={{ color: '#2c5282', marginBottom: '10px' }} />
              <p>Bedrooms</p>
              <strong>{property?.flat?.bedrooms}</strong>
            </div>
            <div>
              <Bath style={{ color: '#2c5282', marginBottom: '10px' }} />
              <p>Bathrooms</p>
              <strong>{property?.flat?.bathrooms}</strong>
            </div>
            <div>
              <Users style={{ color: '#2c5282', marginBottom: '10px' }} />
              <p>Occupancy</p>
              <strong>{property?.flat?.maxOccupancy} persons</strong>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section id="amenities" style={styles.section}>
          <h2 style={styles.sectionTitle}>Amenities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
            <div>
              <Wifi style={{ color: '#2c5282', marginBottom: '10px' }} />
              <p>Internet</p>
              <strong>High-speed Available</strong>
            </div>
            <div>
              <Trees style={{ color: '#2c5282', marginBottom: '10px' }} />
              <p>Garden Area</p>
              <strong>{property?.flat?.society?.gardenArea} sqft</strong>
            </div>
            <div>
              <ParkingSquare style={{ color: '#2c5282', marginBottom: '10px' }} />
              <p>Parking</p>
              <strong>{property?.flat?.society?.parkingArea} sqft</strong>
            </div>
            <div>
              <Zap style={{ color: '#2c5282', marginBottom: '10px' }} />
              <p>Power Backup</p>
              <strong>24/7 Available</strong>
            </div>
          </div>
        </section>

        {/* Construction Details */}
        <section id="construction" style={styles.section}>
          <h2 style={styles.sectionTitle}>Construction Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <Award style={{ color: '#2c5282', marginBottom: '10px' }} />
              <p>Construction Status</p>
              <strong>{property?.flat?.society?.constructionStatus}</strong>
            </div>
            <div>
              <Building2 style={{ color: '#2c5282', marginBottom: '10px' }} />
              <p>Total Units</p>
              <strong>{property?.society?.units}</strong>
            </div>
          </div>
        </section>

        {/* Additional Sections (Dimensions, Neighborhood, Pricing, Security, Contact) can be added similarly */}
        
        {/* Contact Section */}
        
      </div>
    </div>
  );
};

export default PropertyDetail;