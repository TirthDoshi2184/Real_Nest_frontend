import React from 'react';
import { 
  Home, 
  Building, 
  Store, 
  PlusCircle, 
  List, 
  MessageSquare,
  User,
  LogOut,
  X
} from 'lucide-react';

const SellerSidebar = ({ sidebarOpen, setSidebarOpen, activeTab }) => {
  const handleLogout = () => {
    sessionStorage.removeItem('id');
    window.location.href = '/';
  };

  const sidebarItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <Home size={20} />, 
      path: '/sellerdashboard' 
    },
    { 
      id: 'properties', 
      label: 'My Properties', 
      icon: <List size={20} />, 
      path: '/MyProperties' 
    },
    { 
      id: 'add-property', 
      label: 'Add Property', 
      icon: <PlusCircle size={20} />, 
      path: '/addproperty' 
    },
    { 
      id: 'inquiries', 
      label: 'Inquiries', 
      icon: <MessageSquare size={20} />, 
      path: '/inquiries' 
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: <User size={20} />, 
      path: '/profile' 
    },
  ];

  // Prevent rendering if required props are missing
  if (sidebarOpen === undefined || !setSidebarOpen) {
    console.error('SellerSidebar: Missing required props');
    return null;
  }

  return (
    <aside 
      className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}
      style={{ backgroundColor: '#3a6ea5' }}
    >
      <div className="h-full flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">RealNest</h2>
              <p className="text-blue-200 text-sm mt-1">Seller Dashboard</p>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:bg-blue-600 p-2 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => window.location.href = item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-white text-gray-800 shadow-lg'
                  : 'text-white hover:bg-blue-600'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-blue-600">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-600 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;