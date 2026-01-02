
import "../Styles/profile.css";
import { PiUserCircleDashedDuotone } from "react-icons/pi";
import Navbar from "../Components/Navbar";
import { getUserProfile } from "../apiServices/userService";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({});
  // console.log(user);
  


  useEffect(() => {
    const loadProfile = async () => {
      try {
      const data = await getUserProfile();
      setUser(data);
      
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
    };
    loadProfile();
  }, []);

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <div className="profile-card">
          {/* Avatar */}
          <div className="profile-avatar">
            <PiUserCircleDashedDuotone className="profile-icon" />
          </div>

          {/* User Info */}
          <div className="profile-info">
            <label>
              Name:
              <div className="input-wrapper">
                <input value={user.name} disabled />
              </div>
            </label>

            <label>
              Email:
              <div className="input-wrapper">
                <input value={user.email} disabled />
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
