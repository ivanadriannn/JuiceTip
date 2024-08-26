import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../../Services/firebase";
import { IUserInfo } from "../../interfaces/Chat.interfaces";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IDate } from "../../interfaces/Date.interfaces";
import ChatCardSkeleton from "../ChatCardSkeleton/ChatCardSkeleton";

const ChatCard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [chats, setChats] = useState<IUserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getChats = async () => {
      const unsub = await onSnapshot(
        doc(db, "userChats", user.userId),
        (doc: DocumentData) => {
          const data = doc.data();
          if (data) {
            const userHistory = data.userHistory;
            const sortedUserHistory = userHistory.sort(
              (a: IUserInfo, b: IUserInfo) => b.date.seconds - a.date.seconds
            );
            setChats([...sortedUserHistory]);
          }
        }
      );

      return () => {
        unsub();
      };
    };

    user.userId && getChats();
  }, [user.userId]);

  const format_date_to_time_only = (date: IDate) => {
    const milliseconds = date.seconds * 1000 + date.nanoseconds / 1000000;
    const currentDate = new Date(milliseconds);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (currentDate.toDateString() === today.toDateString()) {
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    } else if (currentDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      const dd = String(currentDate.getDate()).padStart(2, "0");
      const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
      const yy = String(currentDate.getFullYear()).slice(2);
      return `${dd}/${mm}/${yy}`;
    }
  };

  const handleRoomChat = (userId: string) => navigate(`/chat/${userId}`);

  return (
    <>
      {chats?.length > 0 ? (
        chats.map((chat, idx) => (
          <div
            className="cursor-pointer h-32 w-full border-b-4 border-b-[#e5e5e5] flex justify-between px-8"
            key={idx}
            onClick={() => handleRoomChat(chat.userId)}
          >
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 rounded-full max-md:w-16 max-md:h-16">
                <img
                  src={chat.profileImage ?? ''}
                  alt="logo"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-5d5d5d font-bold text-xl">
                  {chat.firstName}
                </p>
                <p className="text-5d5d5d text-lg font-semibold"></p>
              </div>
            </div>
            <p className="mt-5 text-lg text-10b981 font-semibold">
              {chat.date && format_date_to_time_only(chat.date)}
            </p>
          </div>
        ))
      ) : (
        <ChatCardSkeleton/>
      )}
    </>
  );
};

export default ChatCard;
