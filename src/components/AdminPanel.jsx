import { useState } from 'react';

// Temporary simplified AdminPanel - will be enhanced later
function AdminPanel({ profileUrl, projects, services, links }) {
  const [error, setError] = useState('');
  
  const handleLogin = () => {
    // Placeholder login functionality
    setError('Admin login temporarily disabled during refactoring');
  };

  return (
    <div className="admin-login-form">
      <h2>Admin Panel</h2>
      <p>Admin panel is being enhanced with extraordinary features!</p>
      <p>Current props received:</p>
      <ul>
        <li>Profile URL: {profileUrl ? 'Set' : 'Not set'}</li>
        <li>Projects: {projects.length}</li>
        <li>Services: {services.length}</li>
        <li>Links: {links.length}</li>
      </ul>
      {error && <div className="admin-error">{error}</div>}
    </div>
  );
}

export default AdminPanel;