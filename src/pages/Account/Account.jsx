import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Demo user data - in a real app this would come from your auth context/API
  const [userData, setUserData] = useState({
    username: 'user_wishverse',
    email: 'user@wishverse.com',
    fullName: 'John Doe',
    profileImage: null, // URL would be here
    joinDate: 'May 2023',
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  });

  // Form states
  const [profileForm, setProfileForm] = useState({
    username: userData.username,
    email: userData.email,
    fullName: userData.fullName
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [deleteAccountConfirm, setDeleteAccountConfirm] = useState('');

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password form change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification toggle
  const handleNotificationToggle = (type) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  // Update profile submit handler
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      setUserData(prev => ({
        ...prev,
        username: profileForm.username,
        email: profileForm.email,
        fullName: profileForm.fullName
      }));
      
      setIsLoading(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };

  // Change password submit handler
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    // Form validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setIsLoading(false);
      setErrorMessage('Passwords do not match');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setIsLoading(false);
      setSuccessMessage('Password changed successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };

  // Delete account handler
  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (deleteAccountConfirm !== userData.username) {
      setIsLoading(false);
      setErrorMessage('Please enter your username correctly to confirm deletion');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would call your logout function and redirect
      navigate('/auth/login');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Profile Summary */}
            <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[var(--color-accent-2)] to-[var(--color-accent-1)] flex items-center justify-center text-white text-2xl font-bold mb-3 mx-auto border-4 border-white shadow-md">
                  {userData.profileImage ? (
                    <img 
                      src={userData.profileImage} 
                      alt={userData.fullName} 
                      className="w-full h-full object-cover rounded-full" 
                    />
                  ) : (
                    userData.fullName.charAt(0)
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-[var(--color-primary)] rounded-full w-8 h-8 flex items-center justify-center shadow-md border-2 border-white text-white hover:bg-opacity-90 transition-colors">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[var(--color-text-main)]">{userData.fullName}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">@{userData.username}</p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Member since {userData.joinDate}</p>
            </div>

            {/* Navigation Tabs */}
            <div className="p-4">
              <nav className="space-y-1">
                <button
                  className={`w-full py-3 px-4 rounded-lg flex items-center text-left transition-colors ${activeTab === 'profile' ? 'bg-[var(--color-accent-2)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 text-[var(--color-text-secondary)]'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile Information
                </button>

                <button
                  className={`w-full py-3 px-4 rounded-lg flex items-center text-left transition-colors ${activeTab === 'security' ? 'bg-[var(--color-accent-2)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 text-[var(--color-text-secondary)]'}`}
                  onClick={() => setActiveTab('security')}
                >
                  <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password & Security
                </button>

                <button
                  className={`w-full py-3 px-4 rounded-lg flex items-center text-left transition-colors ${activeTab === 'notifications' ? 'bg-[var(--color-accent-2)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 text-[var(--color-text-secondary)]'}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notifications
                </button>

                <button
                  className={`w-full py-3 px-4 rounded-lg flex items-center text-left transition-colors ${activeTab === 'danger' ? 'bg-red-50 text-red-600 font-medium' : 'hover:bg-gray-50 text-[var(--color-text-secondary)]'}`}
                  onClick={() => setActiveTab('danger')}
                >
                  <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Account
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="w-full md:w-3/4">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{successMessage}</span>
              </div>
              <button onClick={() => setSuccessMessage('')} className="text-green-700">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errorMessage}</span>
              </div>
              <button onClick={() => setErrorMessage('')} className="text-red-700">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-[var(--color-text-main)]">Profile Information</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">Update your personal details</p>
              </div>
              
              <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
                {/* Profile Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                      value={profileForm.fullName}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-[var(--color-text-secondary)]">@</span>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="block w-full px-4 py-3 pl-8 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                        value={profileForm.username}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[var(--color-primary)] hover:bg-opacity-90 text-white rounded-lg shadow-sm flex items-center justify-center transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-[var(--color-text-main)]">Password & Security</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">Update your password</p>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button 
                        type="button" 
                        className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => {
                          const input = document.getElementById('currentPassword');
                          input.type = input.type === 'password' ? 'text' : 'password';
                        }}
                      >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button 
                        type="button" 
                        className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => {
                          const input = document.getElementById('newPassword');
                          input.type = input.type === 'password' ? 'text' : 'password';
                        }}
                      >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button 
                        type="button" 
                        className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => {
                          const input = document.getElementById('confirmPassword');
                          input.type = input.type === 'password' ? 'text' : 'password';
                        }}
                      >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[var(--color-primary)] hover:bg-opacity-90 text-white rounded-lg shadow-sm flex items-center justify-center transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-[var(--color-text-main)]">Notification Settings</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">Control how we contact you</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-[var(--color-text-main)]">Email Notifications</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={userData.notifications.email}
                      onChange={() => handleNotificationToggle('email')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[var(--color-primary)] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                  </label>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-[var(--color-text-main)]">Push Notifications</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Receive notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={userData.notifications.push}
                      onChange={() => handleNotificationToggle('push')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[var(--color-primary)] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                  </label>
                </div>

                {/* Marketing Emails */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="font-medium text-[var(--color-text-main)]">Marketing Emails</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Receive promotional content</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={userData.notifications.marketing}
                      onChange={() => handleNotificationToggle('marketing')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[var(--color-primary)] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Delete Account Tab */}
          {activeTab === 'danger' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-red-50">
                <h2 className="text-xl font-semibold text-red-700">Delete Account</h2>
                <p className="text-sm text-red-600">This action is permanent and cannot be undone</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Warning</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>
                          Deleting your account will permanently remove all your data, including your profile, wishes, virtual cake designs, and scheduled wishes. This action cannot be reversed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleDeleteAccount} className="space-y-4">
                  <div>
                    <label htmlFor="confirmDelete" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      To confirm deletion, type your username: <span className="font-bold">{userData.username}</span>
                    </label>
                    <input
                      type="text"
                      id="confirmDelete"
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500 shadow-sm transition-colors"
                      value={deleteAccountConfirm}
                      onChange={(e) => setDeleteAccountConfirm(e.target.value)}
                      required
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm flex items-center justify-center transition-colors"
                      disabled={isLoading || deleteAccountConfirm !== userData.username}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Delete My Account'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;