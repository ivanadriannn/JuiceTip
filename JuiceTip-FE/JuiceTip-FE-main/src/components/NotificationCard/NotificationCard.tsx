import React from "react";
import { INotificationCard } from "./NotificationCard.interfaces";
import { useNavigate } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, FieldValue, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Services/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { INotification } from "../../interfaces/Notification.interfaces";

const NotificationCard = (props: INotificationCard) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { notification } = props;
  const { seconds, nanoseconds } = notification.date;
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);

  const formatDate = (date: any) => {
    const options = { month: 'long', year: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date: any) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
  };

  const handleClick = async () => {
    const notificationDoc = doc(db, "notifications", user.userId);

    const newNotification: INotification = ({
      ...notification,
      isRead: true,
    });

    try {
      navigate("/confirmation-payment", {
        state: {
          productId: notification.productId,
          price: notification.price,
          productName: notification.productName,
          image: notification.image,
          justiperName: notification.justiperName,
          justiperId: notification.justiperId,
        }
      });
      await updateDoc(notificationDoc, {
        notification: arrayRemove(notification)
      });

      await updateDoc(notificationDoc, {
        notification: arrayUnion(newNotification)
      });
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  }


  return (
    <div
      className={`relative z-50 px-7 py-5 border-b-2 border-[#e5e5e5] text-lg cursor-pointer ${!notification.isRead ? "bg-[#F2F2F2]" : "bg-[#FAFAFA]"}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 relative">
          <div className="w-12 h-12 relative">
            <img src={notification.userProfile} alt="profile" className="absolute rounded-full inset-0 w-full h-full object-cover" />
          </div>
        </div>
        <p className="text-5d5d5d">
          <span className="text-[#232323] font-medium">{notification.justiperName}</span> has accept your
          product offer. Please finished your payment to complete the
          transaction
        </p>
      </div>
      <div className="ml-[4.2rem] mt-1">
        <p className="text-[#232323] font-medium text-[0.95rem]">JuiceTip • {notification.productName}</p>
        <p className="text-[#8a8a8a]">{formatDate(date)} • {formatTime(date)}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
