import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';
import { getCurrentUser, logout, addLog } from '../../utils/auth';

export default function UserProfile() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [isEditing, setIsEditing] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    email: '',
    phone: ''
  });

  const [tempUserInfo, setTempUserInfo] = React.useState({ ...userInfo });

  React.useEffect(() => {
    if (!currentUser) {
      alert('Please sign in to view your profile.');
      navigate('/customer/login');
      return;
    }
    const names = (currentUser.name || '').split(' ');
    setUserInfo({
      firstName: names[0] || '',
      lastName: names.slice(1).join(' ') || '',
      gender: currentUser.gender || 'Male',
      email: currentUser.email || '',
      phone: currentUser.phone || ''
    });
  }, [currentUser?.id]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes to Database & Current User session
      const updatedInfo = { ...tempUserInfo };
      setUserInfo(updatedInfo);
      
      const allUsers = JSON.parse(localStorage.getItem('mock_users')) || [];
      const userIndex = allUsers.findIndex(u => u.id === currentUser.id);
      if (userIndex > -1) {
        allUsers[userIndex].name = `${updatedInfo.firstName} ${updatedInfo.lastName}`;
        allUsers[userIndex].email = updatedInfo.email;
        allUsers[userIndex].phone = updatedInfo.phone;
        localStorage.setItem('mock_users', JSON.stringify(allUsers));
        
        // Update session
        const updatedUser = {
          ...currentUser,
          name: allUsers[userIndex].name,
          email: allUsers[userIndex].email,
          phone: allUsers[userIndex].phone
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        addLog('Profile Updated', `Customer ${updatedUser.name} updated profile details`);
        alert('Profile details updated and synced with Admin Dashboard in real time.');
      }
      setIsEditing(false);
    } else {
      setTempUserInfo({ ...userInfo });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUserLogout = () => {
    logout();
    navigate('/customer/login');
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="max-w-[1440px] mx-auto px-margin-desktop py-12 flex-grow w-full mt-[80px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest mb-8 text-left">
          <button onClick={() => navigate('/customer/dashboard')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary font-bold">My Profile</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-gutter items-start text-left">
          {/* Sidebar Navigation */}
          <aside className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white border border-outline-variant rounded-lg">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant bg-surface-container flex items-center justify-center font-bold text-primary">
                {userInfo.firstName ? userInfo.firstName.charAt(0) : 'C'}
              </div>
              <div>
                <p className="text-xs text-secondary font-medium">Hello,</p>
                <h2 className="font-bold text-lg text-primary">{userInfo.firstName} {userInfo.lastName}</h2>
              </div>
            </div>

            <nav className="bg-white border border-outline-variant rounded-lg overflow-hidden">
              <div 
                onClick={() => navigate('/customer/orders')}
                className="flex items-center justify-between p-4 border-b border-outline-variant hover:bg-surface-container-low cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary group-hover:text-primary">package</span>
                  <span className="uppercase tracking-wider font-bold text-xs text-secondary group-hover:text-primary">My Orders</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>

              <div className="border-b border-outline-variant">
                <div className="flex items-center gap-3 p-4 bg-surface-container-low/30">
                  <span className="material-symbols-outlined text-secondary">person_outline</span>
                  <span className="uppercase tracking-wider font-bold text-xs text-secondary">Account Settings</span>
                </div>
                <div className="space-y-1 pb-2">
                  <span className="block px-12 py-2 text-sm text-primary font-semibold bg-surface-container-low border-r-4 border-primary cursor-default">
                    Profile Information
                  </span>
                </div>
              </div>

              {/* Logout */}
              <div 
                onClick={handleUserLogout}
                className="flex items-center gap-3 p-4 hover:bg-surface-container-low cursor-pointer transition-colors group"
              >
                <span className="material-symbols-outlined text-secondary group-hover:text-error">logout</span>
                <span className="uppercase tracking-wider font-bold text-xs text-secondary group-hover:text-error">Logout</span>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <section className="bg-white border border-outline-variant rounded-lg p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 border-b border-outline-variant pb-6">
              <h1 className="font-display-lg text-2xl lg:text-[28px] font-bold text-primary">Personal Information</h1>
              <div className="flex items-center gap-3">
                {isEditing && (
                  <button 
                    onClick={handleCancel}
                    className="text-secondary font-semibold text-sm hover:underline cursor-pointer transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  onClick={handleEditToggle}
                  className="text-primary font-semibold text-sm hover:underline flex items-center gap-1 transition-all active:scale-95 cursor-pointer bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant"
                >
                  <span className="material-symbols-outlined text-sm">
                    {isEditing ? 'save' : 'edit'}
                  </span>
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-outline">First Name</label>
                <input 
                  type="text" 
                  value={isEditing ? tempUserInfo.firstName : userInfo.firstName}
                  onChange={(e) => setTempUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-outline-variant rounded-lg focus:border-primary focus:ring-0 text-primary font-medium transition-colors ${!isEditing ? 'bg-surface-container-low cursor-not-allowed' : 'bg-white'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-outline">Last Name</label>
                <input 
                  type="text" 
                  value={isEditing ? tempUserInfo.lastName : userInfo.lastName}
                  onChange={(e) => setTempUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-outline-variant rounded-lg focus:border-primary focus:ring-0 text-primary font-medium transition-colors ${!isEditing ? 'bg-surface-container-low cursor-not-allowed' : 'bg-white'}`}
                />
              </div>
            </div>

            {/* Email & Mobile */}
            <div className="space-y-10 border-t border-outline-variant pt-10">
              <div className="space-y-4">
                <h2 className="font-headline-md text-lg text-primary font-bold">Email Address</h2>
                <input 
                  type="email" 
                  value={isEditing ? tempUserInfo.email : userInfo.email}
                  onChange={(e) => setTempUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full md:w-1/2 px-4 py-3 border border-outline-variant rounded-lg text-primary font-medium transition-colors ${!isEditing ? 'bg-surface-container-low cursor-not-allowed' : 'bg-white'}`}
                />
              </div>
              <div className="space-y-4">
                <h2 className="font-headline-md text-lg text-primary font-bold">Mobile Number</h2>
                <input 
                  type="tel" 
                  value={isEditing ? tempUserInfo.phone : userInfo.phone}
                  onChange={(e) => setTempUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full md:w-1/2 px-4 py-3 border border-outline-variant rounded-lg text-primary font-medium transition-colors ${!isEditing ? 'bg-surface-container-low cursor-not-allowed' : 'bg-white'}`}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
