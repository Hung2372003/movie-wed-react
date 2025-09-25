

import { UserApi } from "../../api/end-point.api";
import UserInformationComponent from "../../components/user-information/user-information.component";
import UserProfileChangeFormComponent, { type ProfileFormData } from "../../components/user-profile-change-form/user-profile-change-form.component";
import React, { useEffect, useState } from "react";

export default function UserProfilePage() {

    const [user, setUser] = React.useState<any>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const handleAvatarChange = (file: File) => {
            setAvatar(file);
        };

    const changeProfile = async (data: ProfileFormData) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as string);
            }
        });
        if (avatar) {
            formData.append("avatar", avatar);
        }
        await UserApi.updateMe(formData);
        data.avatarUrl = avatar ? URL.createObjectURL(avatar) : user.avatarUrl;
        const updatedUser = { ...user, ...data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Profile updated successfully!");
    };
   useEffect(() => {
        const userString = localStorage.getItem("user");
        const userData = userString ? JSON.parse(userString) : null;
        setUser(userData);
   }, []);
    return (
        <>
            <div className="hero user-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hero-ct">
                                <h1>{user ? user.username : "User"}’s profile</h1>
                                <ul className="breadcumb">
                                    <li className="active"><a href="#">Home</a></li>
                                    <li> <span className="ion-ios-arrow-right"></span>Profile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-single">
                <div className="container">
                    <div className="row ipad-width">
                            <div className="col-md-3 col-sm-12 col-xs-12">
                                 <UserInformationComponent
                                    avatarUrl={user ? user.avatarUrl : "images/uploads/user-img.png"}
                                    profileLink="/user-profile"
                                    favoriteLink="/movie-favorites"
                                    activePage="profile"
                                    onChangeAvatar={(file) => handleAvatarChange(file)}
                                    onChangePassword={() => alert("Change password clicked")}
                                    onLogout={() => alert("Logged out")}
                                    />
                            </div>
                            <div className="col-md-9 col-sm-12 col-xs-12">
                                <UserProfileChangeFormComponent
                                    initialProfile={{
                                        username: user ? user.username : "",
                                        email: user ? user.email : "",
                                        fullName: (user && user.fullName) ? user.fullName : "",
                                        country: (user && user.country) ? user.country : "",
                                        state: (user && user.state) ? user.state : "",
                                    }}
                                    onSaveProfile={(data) => changeProfile(data)}
                                    onChangePassword={(data) => changeProfile(data)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}
