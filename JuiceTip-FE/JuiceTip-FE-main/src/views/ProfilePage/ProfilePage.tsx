import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProfileInfoGroup from "../../components/ProfileInfoGroup/ProfileInfoGroup";
import Button from "../../components/Button/Button";
import { LOGOUT } from "../../redux/slices/authSlice";
import { RootState, store } from "../../redux/store";
import { useSelector } from "react-redux";
import RatingCard from "../../components/RatingCard/RatingCard";
import { IReview, getAllRating } from "../../Services/ratingService";

const ProfilePage = () => {
  const [ratings, setRatings] = useState<IReview[]>([])
  const { user } = useSelector((state: RootState) => state.auth);

  const dateString = new Date(user.created).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const date = `${dateString}`;

  const dateStr = user.created;
  const dateCreated = new Date(dateStr);
  const formattedDate = dateCreated.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function calculateAge(dobString: Date) {
    const dobYear = new Date(dobString).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - dobYear;
  }

  const logout = () => {
    store.dispatch(LOGOUT());
    window.location.href = "/";
  };

  useEffect(() => {
    getAllRating(user.userId, (res: any) => {
      setRatings(res)
    })
  }, [])
  return (
    <div className="min-h-screen relative z-0">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-[70%] bg-white py-5 rounded-3xl -z-30 relative flex justify-center items-center max-xl:w-7/12">
          <img
            src={require("../../assets/images/banner.png")}
            alt="banner"
            className="absolute top-5 w-[96%] h-[40%]"
          />
          <div className="flex flex-col items-center justify-center mt-16 z-10">
            <img
              src={user.profileImage}
              alt="profile"
              className="w-36 h-36 object-cover object-top rounded-full"
            />
            <p className="text-5d5d5d text-xl font-bold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-10b981 text-xl font-bold mb-5">Join on {date}</p>
          </div>
        </div>
        <div className="flex w-[70%] mt-8 gap-8 max-xl:flex-col max-xl:items-center">
          <div className="w-7/12 rounded-3xl bg-white px-8 py-10 max-xl:w-10/12">
            <h1 className="text-5d5d5d text-5xl font-bold mb-10">
              Information
            </h1>
            <ProfileInfoGroup
              title="Full Name"
              text={`${user.firstName} ${user.lastName}`}
            />
            <ProfileInfoGroup
              title="Gender"
              text={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
            />
            <ProfileInfoGroup
              title="Age"
              text={`${calculateAge(user.dob)} years old`}
            />
            <ProfileInfoGroup title="Email" text={user.email} />
            <ProfileInfoGroup title="Phone Number" text={user.telephone} />
            <ProfileInfoGroup title="Join" text={formattedDate} />
            <Button
              href="/ChangePassword"
              children="Change Password"
              className="w-full bg-10b981 my-0 text-white font-bold mx-0 rounded-lg"
            />
            <Button
              onClick={logout}
              children="Logout"
              className="w-full bg-e5e5e5 my-0 mx-0 text-5d5d5d rounded-lg"
            />
          </div>
          <div className="w-5/12 rounded-3xl bg-white flex flex-col items-center justify-center gap-2 max-xl:py-20 max-xl:w-10/12 relative">
            <h1 className="text-5d5d5d text-4xl font-bold mb-10 absolute top-10 left-10">
              Rating & Comment
            </h1>
            <div className="mt-20 px-10 overflow-auto scrollbar-hidden h-96">
              {ratings.map((rating) => (
                <RatingCard rating={rating} />
              ))}
            </div>
          </div>
        </div>
        <div className="circle">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
