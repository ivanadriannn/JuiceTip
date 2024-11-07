import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Anchor from "../Anchor/Anchor";
import { useNavigate } from "react-router-dom";
import NotificationCard from "../NotificationCard/NotificationCard";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../../Services/firebase";
import { INotification } from "../../interfaces/Notification.interfaces";
import { INavbar } from "./INavbar";

const Navbar = (props: INavbar) => {
  const { handleRelative } = props;
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [totalNotif, setTotalNotif] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotifications = async () => {
      const unsub = await onSnapshot(
        doc(db, "notifications", user.userId),
        (doc: DocumentData) => {
          const data = doc.data();
          if (data) {
            const notif = data.notification;
            const sortedNotif = notif.sort(
              (a: INotification, b: INotification) =>
                b.date.seconds - a.date.seconds
            );
            setNotifications([...sortedNotif]);

            const lengthIsNotRead = sortedNotif.filter(
              (notif: INotification) => !notif.isRead
            ).length;
            setTotalNotif(lengthIsNotRead);
          }
        }
      );

      return () => {
        unsub();
      };
    };

    user.userId && getNotifications();
  }, [user.userId]);

  const handleHome = () => {
    navigate("/");
  };

  const handleTopup = () => {
    navigate("/top-up");
  };

  const handleClick = () => {
    setShowNotification(false);
    handleRelative && handleRelative();
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
    handleRelative && handleRelative();
  }
  return (
    <>
      <nav className="bg-fafafa flex items-center justify-between py-6 px-20 drop-shadow-2xl shadow-2xl">
        <div className="w-1/5">
          <img
            src={require("../../assets/images/logo.png")}
            alt="logo"
            className="max-w-full max-h-full cursor-pointer"
            onClick={handleHome}
          />
        </div>
        {isLoggedIn && user ? (
          <div className="flex items-center">
            <div className="flex items-center">
              <Button className="px-0">
                <img
                  src={require("../../assets/images/shoppingCart.png")}
                  alt="shoppingCart"
                  className="max-lg:w-12 max-md:w-10"
                />
              </Button>
              <div className="relative z-50">
                <Button
                  className="px-0"
                  onClick={handleNotificationClick}
                >
                  <img
                    src={require("../../assets/images/notification.png")}
                    alt="notification"
                    className="max-lg:w-12 max-md:w-10"
                  />
                  {totalNotif > 0 &&
                    <div className="w-6 h-6 absolute bottom-10 left-10 bg-emerald-500 rounded-full">
                      <p className="text-white text-center">{totalNotif}</p>
                    </div>
                  }
                </Button>
                {showNotification && (
                  <div
                    className="z-50 fixed top-30 left-0 w-[99.3vw] h-screen flex"
                    onClick={handleClick}
                  >
                    <div
                      className="fixed right-56 w-[35rem] h-[35rem] bg-fafafa shadow rounded-xl overflow-auto scrollbar-hidden z-50"
                      onClick={handleStopPropagation}
                    >
                      <div className="px-7 py-5 border-[#e5e5e5] border-b-2 sticky top-0 bg-fafafa z-50">
                        <h1 className="text-3xl font-bold text-[#232323]">
                          Notification
                        </h1>
                      </div>
                      <div>
                        {notifications.map((notification) => (
                          <NotificationCard
                            notification={notification}
                            key={notification.id}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer mr-4 ml-2"
              onClick={handleTopup}
            >
              <p className="font-extrabold text-2xl">{user.juiceCoin}</p>
              <img
                src={require("../../assets/images/juiceCoin.png")}
                alt="juiceCoin"
                className="max-lg:w-12 max-md:w-10"
              />
            </div>
            <div>
              <Anchor href="/profile" variant="flex items-center gap-4">
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover object-top max-lg:w-12 max-lg:h-12 max-md:w-10 max-md:h-10"
                />
                <p className="font-semibold text-3xl hover:underline">
                  {user.firstName}
                </p>
              </Anchor>
            </div>
          </div>
        ) : (
          <Button
            children="Login"
            href="/login"
            className="rounded-full w-32 text-2xl font-medium bg-10b981 text-white"
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
