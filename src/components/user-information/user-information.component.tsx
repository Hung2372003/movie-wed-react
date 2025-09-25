// src/components/UserInformationComponent.tsx
import React, { useState } from "react";

interface UserInformationProps {
  avatarUrl: string;
  onChangeAvatar?: (file: File) => void; // 👈 trả file về cha
  profileLink: string;
  favoriteLink: string;
  activePage?: "profile" | "favorite" | "rated";
  onChangePassword?: () => void;
  onLogout?: () => void;
}

const UserInformationComponent: React.FC<UserInformationProps> = ({
  avatarUrl,
  onChangeAvatar,
  profileLink,
  favoriteLink,
  activePage = "favorite",
  onChangePassword,
  onLogout,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Tạo URL preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Gửi file về cha
      onChangeAvatar?.(file);
    }
  };

  return (
    <div className="user-information">
      <div className="user-img">
        <a href="#">
          <img src={preview || avatarUrl} alt="User Avatar" />
          <br />
        </a>

        <label style={{ cursor: "pointer" }} htmlFor="avatar-upload" className="redbtn">
          Change avatar
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="user-fav">
        <p>Account Details</p>
        <ul>
          <li className={activePage === "profile" ? "active" : ""}>
            <a href={profileLink}>Profile</a>
          </li>
          <li className={activePage === "favorite" ? "active" : ""}>
            <a href={favoriteLink}>Favorite movies</a>
          </li>
        </ul>
      </div>
      <div className="user-fav">
        <p>Others</p>
        <ul>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onChangePassword?.();
              }}
            >
              Change password
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onLogout?.();
              }}
            >
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInformationComponent;
