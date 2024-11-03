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
  
      if (error) throw error;
  
      if (data) {
        setUsername(data.username || '');
        if (data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setLoading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
  
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      // First, delete the old avatar if it exists
      if (avatarUrl) {
        const oldFileName = avatarUrl.split('/').pop();
        await supabase.storage
          .from('avatars')
          .remove([oldFileName]);
      }
  
      // Uploading the new file
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
  
      if (uploadError) throw uploadError;
  
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
  
      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);
  
      if (updateError) throw updateError;
  
      setAvatarUrl(publicUrl);
      alert('Avatar uploaded successfully!');
      
    } catch (error) {
      console.error('Detailed upload error:', error);
      alert(error.message);
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

  //function to download and display avatar
useEffect(() => {
  if (avatarUrl) {
    const fetchImage = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(avatarUrl.split('/').pop());
          
        if (error) throw error;
        
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.error('Error downloading image: ', error.message);
      }
    };

    fetchImage();
  }
}, [avatarUrl, supabase]);



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