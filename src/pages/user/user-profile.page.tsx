import UserInformationComponent from "../../components/user-information/user-information.component";
import UserProfileChangeFormComponent from "../../components/user-profile-change-form/user-profile-change-form.component";

export default function UserProfilePage() {
    return (
        <>
            <div className="hero user-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hero-ct">
                                <h1>Edward kennedy’s profile</h1>
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
                                    avatarUrl="images/uploads/user-img.png"
                                    profileLink="/user-profile"
                                    favoriteLink="/movie-favorites"
                                    activePage="profile"
                                    onChangeAvatar={() => alert("Change avatar clicked")}
                                    onChangePassword={() => alert("Change password clicked")}
                                    onLogout={() => alert("Logged out")}
                                    />
                            </div>
                            <div className="col-md-9 col-sm-12 col-xs-12">
                                <UserProfileChangeFormComponent
                                    initialProfile={{
                                        username: "edwardkennedy",
                                        email: "edward@kennedy.com",
                                        firstName: "Edward",
                                        lastName: "Kennedy",
                                        country: "United States",
                                        state: "New York",
                                    }}
                                    onSaveProfile={(data) => console.log("Profile saved:", data)}
                                    onChangePassword={(data) => console.log("Password changed:", data)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}
