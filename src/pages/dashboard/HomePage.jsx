import React from 'react';

const HomePage = () => {
  // Mock data for dashboard
  const stats = [
    { name: 'Total Wishlists', value: '12' },
    { name: 'Active Items', value: '48' },
    { name: 'Completed Items', value: '16' },
    { name: 'Shared Lists', value: '5' }
  ];
  
  const recentActivity = [
    { id: 1, action: 'Added a new item', target: 'Birthday Wishlist', time: '2 hours ago' },
    { id: 2, action: 'Marked as purchased', target: 'Sony Headphones', time: '1 day ago' },
    { id: 3, action: 'Shared wishlist with', target: 'John Doe', time: '3 days ago' },
    { id: 4, action: 'Updated item price', target: 'MacBook Pro', time: '4 days ago' }
  ];
  
  const upcomingEvents = [
    { id: 1, title: 'Sarah\'s Birthday', date: 'May 28, 2025', daysLeft: 6 },
    { id: 2, title: 'Anniversary', date: 'June 15, 2025', daysLeft: 24 },
    { id: 3, title: 'Christmas', date: 'December 25, 2025', daysLeft: 217 }
  ];
  
  const recentWishlists = [
    { id: 1, title: 'Birthday Wishlist', itemCount: 8, progress: 25 },
    { id: 2, title: 'Home Gadgets', itemCount: 12, progress: 50 },
    { id: 3, title: 'Summer Vacation', itemCount: 5, progress: 60 },
    { id: 4, title: 'Tech Goodies', itemCount: 15, progress: 30 }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-main)]">Dashboard</h1>
        <p className="text-[var(--color-text-secondary)]">Welcome back! Here's what's happening with your wishlists.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-sm p-5 border border-gray-100"
          >
            <p className="text-[var(--color-text-secondary)] text-sm">{stat.name}</p>
            <p className="text-2xl font-semibold text-[var(--color-text-main)] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-semibold text-[var(--color-text-main)] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--color-accent-2)] flex items-center justify-center text-[var(--color-primary)]">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-[var(--color-text-main)]">
                    {activity.action} <span className="font-semibold">{activity.target}</span>
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-sm text-[var(--color-primary)] hover:underline">
              View All Activity
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-[var(--color-text-main)] mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <p className="font-medium text-[var(--color-text-main)]">{event.title}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{event.date}</p>
                </div>
                <div className="flex items-center">
                  <span 
                    className={`text-xs px-2 py-1 rounded-full font-medium 
                      ${event.daysLeft <= 7 
                        ? 'bg-red-100 text-red-600' 
                        : event.daysLeft <= 30 
                          ? 'bg-yellow-100 text-yellow-600' 
                          : 'bg-green-100 text-green-600'
                      }`}
                  >
                    {event.daysLeft} days
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-sm text-[var(--color-primary)] hover:underline">
              View Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Recent Wishlists */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-main)]">Recent Wishlists</h2>
          <button className="text-sm text-[var(--color-primary)] hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentWishlists.map((list) => (
            <div key={list.id} className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-[var(--color-text-main)]">{list.title}</h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">{list.itemCount} items</p>
              
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[var(--color-primary)] h-2 rounded-full" 
                    style={{ width: `${list.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mt-1 text-[var(--color-text-secondary)]">{list.progress}% Complete</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-[var(--color-text-main)] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-[var(--color-accent-2)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-main)]">New List</p>
          </button>
          
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-[var(--color-accent-2)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-main)]">Share</p>
          </button>
          
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-[var(--color-accent-2)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-main)]">Export</p>
          </button>
          
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-[var(--color-accent-2)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-main)]">Help</p>
          </button>
          
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-[var(--color-accent-2)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-main)]">Settings</p>
          </button>
          
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 mx-auto bg-[var(--color-accent-2)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-main)]">Profile</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;