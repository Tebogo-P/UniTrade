import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserProfile.css';

function readStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getInitials(firstName, lastName) {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '?';
}

export default function UserProfile() {
  const [user, setUser] = useState(readStoredUser);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [profileMessage, setProfileMessage] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [savingPassword, setSavingPassword] = useState(false);

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-guest">
          <div style={{ fontSize: 40 }}>🎓</div>
          <h2>You're not signed in</h2>
          <p>Sign in with your CPUT student email to manage your UniTrade account.</p>
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileMessage(null);
    setSavingProfile(true);

    // NOTE: there is no PUT /api/users/{id} endpoint on the backend yet, so
    // the change is persisted locally only. Swap this for a real API call
    // once account updates are supported server-side.
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedUser = { ...user, firstName, lastName };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSavingProfile(false);
    setProfileMessage({ type: 'success', text: 'Profile updated successfully.' });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }

    setSavingPassword(true);
    // NOTE: no change-password endpoint exists on the backend yet — this is
    // simulated locally for now.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSavingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMessage({ type: 'success', text: 'Password changed successfully.' });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-avatar">{getInitials(user.firstName, user.lastName)}</div>
        <div className="profile-hero-info">
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <div className="profile-hero-email">{user.universityEmail}</div>
          {user.isVerified ? (
            <span className="badge badge-verified">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              Verified CPUT Student
            </span>
          ) : (
            <span className="badge badge-unverified">Verification Pending</span>
          )}
        </div>
        <button type="button" className="btn-secondary" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="profile-tabs">
        <button
          type="button"
          className={`profile-tab${activeTab === 'profile' ? ' active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Info
        </button>
        <button
          type="button"
          className={`profile-tab${activeTab === 'security' ? ' active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button
          type="button"
          className={`profile-tab${activeTab === 'account' ? ' active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="profile-card">
          <h2>Profile Information</h2>
          <p className="section-hint">Update your personal details as they appear to other students.</p>

          {profileMessage && (
            <div className={profileMessage.type === 'success' ? 'success-banner' : 'error-banner'}>
              {profileMessage.text}
            </div>
          )}

          <form className="profile-form" onSubmit={handleSaveProfile}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <label>
                University Email <span className="hint">(cannot be changed)</span>
              </label>
              <input type="email" value={user.universityEmail} disabled />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={savingProfile}>
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="profile-card">
          <h2>Change Password</h2>
          <p className="section-hint">Choose a strong password you don't use anywhere else.</p>

          {passwordMessage && (
            <div className={passwordMessage.type === 'success' ? 'success-banner' : 'error-banner'}>
              {passwordMessage.text}
            </div>
          )}

          <form className="profile-form" onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={savingPassword}>
                {savingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'account' && (
        <div className="profile-card">
          <h2>Account</h2>
          <p className="section-hint">Manage your session and account status.</p>

          <div className="danger-row">
            <div className="danger-row-text">
              <strong>Log out of UniTrade</strong>
              <span>You'll need to sign in again with your university email.</span>
            </div>
            <button type="button" className="btn-secondary" onClick={handleLogout}>
              Log Out
            </button>
          </div>

          <div className="danger-zone">
            <h2>Danger Zone</h2>
            <div className="danger-row">
              <div className="danger-row-text">
                <strong>Deactivate account</strong>
                <span>Temporarily hide your listings and profile from other students.</span>
              </div>
              <button type="button" className="btn-danger" disabled title="Coming soon">
                Deactivate
              </button>
            </div>
            <div className="danger-row">
              <div className="danger-row-text">
                <strong>Delete account</strong>
                <span>Permanently remove your account and all your listings.</span>
              </div>
              <button type="button" className="btn-danger" disabled title="Coming soon">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
