import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNav = ({ isOpen }) => {
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    {
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard',
    },
    {
      name: 'My Wishlists',
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      path: '/wishlists',
    },
    {
      name: 'Favorites',
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      path: '/favorites',
    },
    {
      name: 'Shared With Me',
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      path: '/shared',
    },
    {
      name: 'Reminders',
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/reminders',
    },
    {
      name: 'Activities',
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/activities',
    },
  ];

  // Divider
  const divider = <div className="border-t border-gray-200 my-4"></div>;

  // Settings and support items
  const settingsItems = [
    {
      name: 'Settings',
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/settings',
    },
    {
      name: 'Help & Support',
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/support',
    },
  ];

  // Function to check if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`bg-white fixed top-16 left-0 bottom-0 w-64 border-r border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } z-20`}
    >
      <div className="px-4 py-5">
        {/* Action button */}
        <div className="mb-6">
          <Link 
            to="/create-wishlist"
            className="w-full flex items-center justify-center px-4 py-2 bg-[var(--color-primary)] hover:bg-opacity-90 text-white rounded-md shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Wishlist
          </Link>
        </div>

        {/* Main navigation */}
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive(item.path)
                  ? 'bg-[var(--color-accent-2)] text-[var(--color-primary)]'
                  : 'text-[var(--color-text-main)] hover:bg-gray-50'
              }`}
            >
              <span className={`mr-3 ${isActive(item.path) ? 'text-[var(--color-primary)]' : 'text-gray-500 group-hover:text-[var(--color-primary)]'}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </div>

        {divider}

        {/* Settings navigation */}
        <div className="space-y-1">
          {settingsItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive(item.path)
                  ? 'bg-[var(--color-accent-2)] text-[var(--color-primary)]'
                  : 'text-[var(--color-text-main)] hover:bg-gray-50'
              }`}
            >
              <span className={`mr-3 ${isActive(item.path) ? 'text-[var(--color-primary)]' : 'text-gray-500 group-hover:text-[var(--color-primary)]'}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Upgrade banner */}
      <div className="mx-4 mb-6 p-4 bg-[var(--color-accent-2)] rounded-lg">
        <h3 className="text-sm font-medium text-[var(--color-primary)]">Upgrade to Pro</h3>
        <p className="mt-1 text-xs text-[var(--color-text-main)]">
          Get unlimited wishlists, reminders, and more!
        </p>
        <button
          className="mt-2 w-full flex items-center justify-center px-4 py-2 bg-[var(--color-primary)] hover:bg-opacity-90 text-white rounded-md shadow-sm text-xs font-medium"
        >
          Upgrade Now
        </button>
      </div>
    </nav>
  );
};

export default SideNav;