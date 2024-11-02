import React, { useState, useEffect } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import './ProfilePage.css';

const ProfilePage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (session?.user) {
      getProfile();
    }
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setUsername(data.username || '');
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error('Error loading user data!');
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${session.user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          avatar_url: publicUrl,
          updated_at: new Date(),
        });

      setAvatarUrl(publicUrl);
    } catch (error) {
      console.error('Error uploading avatar!');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          username,
          updated_at: new Date(),
        });
    } catch (error) {
      console.error('Error updating profile!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        <div className="avatar-section">
          <div className="avatar-wrapper">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">Upload Photo</div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            className="avatar-input"
            id="avatar-upload"
          />
          <label htmlFor="avatar-upload" className="upload-button">
            Choose Photo
          </label>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              value={session?.user?.email}
              disabled
              className="profile-input"
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="profile-input"
            />
          </div>
          <button 
            onClick={updateProfile} 
            className="update-button"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Update Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
