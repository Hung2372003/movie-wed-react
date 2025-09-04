import React from "react";

interface UserInformationProps {
  avatarUrl: string;
  onChangeAvatar?: () => void;
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
  return (
    <div className="user-information">
      <div className="user-img">
        <a href="#">
          <img src={avatarUrl} alt="User Avatar" />
          <br />
        </a>
        <a
          href="#"
          className="redbtn"
          onClick={(e) => {
            e.preventDefault();
            onChangeAvatar?.();
          }}
        >
          Change avatar
        </a>
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
