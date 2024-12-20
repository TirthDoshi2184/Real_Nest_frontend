import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import {
  LayoutDashboard,
  Building,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

// Styled Components
const DashboardLayout = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f6f9;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #e0e6ed;
  padding: 20px;
`;

const MainContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

// Mock Data
const mockPropertyData = [
  {
    id: 1,
    type: "Flat",
    title: "Luxury 3BHK in Mumbai",
    price: 75000000,
    area: 1800,
    status: "Active",
  },
  {
    id: 2,
    type: "Shop",
    title: "Commercial Space in Delhi",
    price: 50000000,
    area: 1200,
    status: "Pending",
  },
];

const mockUserData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    properties: 3,
    joinedDate: "2023-01-15",
  },
];

// Dashboard Component
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      <CardContainer>
        <Card>
          <h3>Total Properties</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Building size={40} />
            <div style={{ marginLeft: "10px" }}>
              <h2>250</h2>
              <p>Active Listings</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3>Total Users</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Users size={40} />
            <div style={{ marginLeft: "10px" }}>
              <h2>5,420</h2>
              <p>Registered Users</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3>Monthly Analytics</h3>
          <div
            style={{
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Analytics Chart Placeholder
          </div>
        </Card>
      </CardContainer>
    </div>
  );
};

// Property Management Component
const PropertyManagement = () => {
  const [properties, setProperties] = useState(mockPropertyData);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  const AddPropertyForm = () => {
    const [formData, setFormData] = useState({
      type: "",
      title: "",
      price: "",
      area: "",
      description: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      setProperties([
        ...properties,
        { ...formData, id: properties.length + 1, status: "Active" },
      ]);
      setShowAddPropertyModal(false);
    };

    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "500px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Add New Property</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          >
            <option value="">Select Property Type</option>
            <option value="Flat">Flat</option>
            <option value="Shop">Shop</option>
            <option value="Plot">Plot</option>
            <option value="Bungalow">Bungalow</option>
          </select>
          <input
            type="text"
            placeholder="Property Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4A6CF7",
              color: "white",
              border: "none",
            }}
          >
            Add Property
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Property Management</h1>
        <button
          onClick={() => setShowAddPropertyModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#4A6CF7",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          <Plus size={20} style={{ marginRight: "10px" }} />
          Add Property
        </button>
      </div>
      {showAddPropertyModal && <AddPropertyForm />}
    </div>
  );
};

// Admin Dashboard Layout
export const AdminDashboard = () => {
  return (
    <Router>
      <DashboardLayout>
        <Sidebar>
          <h3>RealNest Admin</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/properties">Property Management</Link>
            </li>
          </ul>
        </Sidebar>
        <MainContent>
          <Routes>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/properties" element={<PropertyManagement />} />
          </Routes>
        </MainContent>
      </DashboardLayout>
    </Router>
  );
};

export default AdminDashboard;
