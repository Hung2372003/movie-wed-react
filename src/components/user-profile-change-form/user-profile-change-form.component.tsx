import React, { useState } from "react";

interface ProfileFormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
}

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserProfileProps {
  initialProfile?: ProfileFormData;
  countries?: string[];
  states?: string[];
  onSaveProfile?: (data: ProfileFormData) => void;
  onChangePassword?: (data: PasswordFormData) => void;
}

const UserProfileChangeFormComponent: React.FC<UserProfileProps> = ({
  initialProfile = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
  },
  countries = ["United States", "Others"],
  states = ["New York", "Others"],
  onSaveProfile,
  onChangePassword,
}) => {
  const [profile, setProfile] = useState<ProfileFormData>(initialProfile);
  const [passwords, setPasswords] = useState<PasswordFormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const submitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile?.(profile);
  };

  const submitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    onChangePassword?.(passwords);
  };

  return (
    <div className="form-style-1 user-pro">
      {/* Profile form */}
      <form className="user" onSubmit={submitProfile}>
        <h4>01. Profile details</h4>

        <div className="row">
          <div className="col-md-6 form-it">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={profile.username}
              onChange={handleProfileChange}
            />
          </div>
          <div className="col-md-6 form-it">
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-it">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={profile.firstName}
              onChange={handleProfileChange}
            />
          </div>
          <div className="col-md-6 form-it">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={profile.lastName}
              onChange={handleProfileChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-it">
            <label>Country</label>
            <select
              name="country"
              value={profile.country}
              onChange={handleProfileChange}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 form-it">
            <label>State</label>
            <select
              name="state"
              value={profile.state}
              onChange={handleProfileChange}
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <input className="submit" type="submit" value="save" />
          </div>
        </div>
      </form>

      {/* Password form */}
      <form className="password" onSubmit={submitPassword}>
        <h4>02. Change password</h4>

        <div className="row">
          <div className="col-md-6 form-it">
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="**********"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-it">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="***************"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-it">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="***************"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <input className="submit" type="submit" value="change" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfileChangeFormComponent;
