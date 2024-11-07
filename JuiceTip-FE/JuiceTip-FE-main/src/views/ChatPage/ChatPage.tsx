import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ChatCard from "../../components/ChatCard/ChatCard";
import ChatBubble from "../../components/ChatBubble/ChatBubble";
import { useNavigate, useParams } from "react-router-dom";
import {
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Services/firebase";
import { getUserById } from "../../Services/userService";
import { ICustomer } from "../../interfaces/Customer.interfaces";
import { IMessage } from "../../interfaces/Chat.interfaces";
import { v4 as uuid } from "uuid";
import SearchBar from "../../components/SearchBar/SearchBar";
import ChatBubbleSkeleton from "../../components/ChatBubbleSkeleton/ChatBubbleSkeleton";

const ChatPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { customerId } = useParams();
  const justiperId = user.userId;
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (customerId) {
      getUserById(customerId, (status: boolean, res: any) => {
        if (status) {
          setCustomer(res);
          setIsLoading(true);
        }
      });
    }
  }, [getUserById, customerId]);

  useEffect(() => {
    if (customerId) {
      const combinedId =
        customerId > justiperId
          ? customerId + justiperId
          : justiperId + customerId;
      const getChats = async () => {
        const unsub = await onSnapshot(
          doc(db, "chats", combinedId),
          (doc: DocumentData) => {
            const data = doc.data();
            if (data) {
              const chat = data.messages;
              setMessages([...chat]);
              setIsLoading(true);
            }
          }
        );

        return () => {
          unsub();
        };
      };

      customerId && getChats();
    }
  }, [customerId]);

  useEffect(() => {
    handleChat();
  }, [customer, customerId, justiperId, user]);

  const handleBack = () => {
    nav("/");
  };

  const handleChat = async () => {
    if (
      customerId &&
      justiperId &&
      customer &&
      customer.userId &&
      customer.firstName &&
      customer.lastName &&
      user &&
      user.userId &&
      user.firstName &&
      user.lastName
    ) {
      const combinedId =
        customerId > justiperId
          ? customerId + justiperId
          : justiperId + customerId;
      try {
        const chatDoc = doc(db, "chats", combinedId);
        const chatSnap = await getDoc(chatDoc);

        if (!chatSnap.exists()) {
          await setDoc(chatDoc, { messages: [] });
        }

        const justiperDoc = doc(db, "userChats", justiperId);
        const justiperSnap = await getDoc(justiperDoc);
        const justiperData = {
          combinedId: combinedId,
          userId: customerId.toString() || customer.userId.toString() || "",
          firstName: customer.firstName.toString() || "",
          lastName: customer.lastName.toString() || "",
          profileImage: customer.profileImage || null,
          date: Timestamp.now(),
        };

        if (!justiperSnap.exists()) {
          await setDoc(justiperDoc, { userHistory: [justiperData] });
        } else {
          const userHistory = justiperSnap.data().userHistory || [];
          const exists = userHistory.some(
            (item: any) => item.combinedId === combinedId
          );
          if (!exists) {
            await updateDoc(justiperDoc, {
              userHistory: [...userHistory, justiperData],
            });
          }
        }

        const customerDoc = doc(db, "userChats", customerId);
        const customerSnap = await getDoc(customerDoc);
        const customerData = {
          combinedId: combinedId,
          userId: justiperId.toString() || user.userId.toString() || "",
          firstName: user.firstName.toString() || "",
          lastName: user.lastName.toString() || "",
          profileImage: user.profileImage || null,
          date: Timestamp.now(),
        };

        if (!customerSnap.exists()) {
          await setDoc(customerDoc, { userHistory: [customerData] });
        } else {
          const userHistory = customerSnap.data().userHistory || [];
          const exists = userHistory.some(
            (item: any) => item.combinedId === combinedId
          );
          if (!exists) {
            await updateDoc(customerDoc, {
              userHistory: [...userHistory, customerData],
            });
          }
        }
      } catch (err) {
        console.error("Error updating Firestore documents:", err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() !== "" && customerId) {
        const combinedId =
          customerId > justiperId
            ? customerId + justiperId
            : justiperId + customerId;

        const newMessage: IMessage = {
          id: uuid(),
          message: inputValue,
          date: Timestamp.now(),
          senderId: justiperId,
          productName: null,
          productId: null,
          isBargain: false,
          image: null,
          productPrice: null,
          bargainPrice: null,
          isTakeOrder: false,
          notes: null,
        };

        await updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion(newMessage),
        });

        setInputValue("");
      }
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredMessages = messages.filter((message) => { });

  return (
    <div className="flex h-screen">
      <div className="w-1/3">
        <div className="bg-e5e5e5 h-[12%] py-5 px-8 flex items-center justify-between">
          <Button onClick={handleBack}>
            <span id="triangle" className="w-5" />
          </Button>
          <div className="flex items-center gap-5">
            <p className="text-5d5d5d text-3xl font-bold">{user.firstName}</p>
            <img
              src={user.profileImage}
              alt="logo"
              className="w-16 h-16 rounded-full object-cover object-top max-lg:w-12 max-lg:h-12 max-md:w-10 max-md:h-10"
              />
            <span id="three-dot">
              <li></li>
              <li></li>
              <li></li>
            </span>
          </div>
        </div>
        <div className="bg-fafafa h-[88%] overflow-y-auto scrollbar-hidden">
          <SearchBar
            onSearch={handleSearch}
            className="mt-0 p-4 border-b-4 border-b-[#e5e5e5] rounded-b-none"
            placeholder="Cari atau mulai chat baru"
            isChat={true}
          />
          <ChatCard />
        </div>
      </div>
      <span className="bg-d1d1d1 w-2"></span>
      <div className="w-2/3 relative">
        {customerId ? (
          isLoading ? (
            <div className="bg-e5e5e5 h-[12%] px-8 flex items-center gap-5">
              <img
                src={customer.profileImage}
                alt="logo"
                className="w-16 h-16 rounded-full object-cover object-top max-lg:w-12 max-lg:h-12 max-md:w-10 max-md:h-10"
                />
              <p className="text-5d5d5d font-bold text-xl">
                {customer.firstName + " " + customer.lastName}
              </p>
            </div>
          ) : (
            <div className="h-[12%] px-8 flex items-center gap-5">
              <div className="w-[4.5rem] h-[4.5rem] max-md:w-16 max-md:h-16 skeleton rounded-full">
                <img src="" alt="" className="" />
              </div>
              <div className="flex flex-col gap-2 skeleton h-5 rounded">
                <div className="h-5 w-44 skeleton rounded"></div>
              </div>
            </div>
          )
        ) : null}
        <div
          className={`overflow-y-auto scrollbar-hidden ${customerId
            ? isLoading
              ? "bg-wallpaper h-[76%]"
              : "bg-[#bacec7] h-full"
            : "bg-[#bacec7] h-full"
            }`}
        >
          {customerId ? (
            <div className="mt-5">
              {isLoading ? (
                messages.map((message, index) => (
                  <ChatBubble
                    id={message.id}
                    message={message.message}
                    date={message.date}
                    senderId={message.senderId}
                    key={index}
                    productId={message.productId}
                    productName={message.productName}
                    isBargain={message.isBargain}
                    image={message.image}
                    productPrice={message.productPrice}
                    bargainPrice={message.bargainPrice}
                    interlocutors={customerId || ""}
                    isTakeOrder={message.isTakeOrder}
                    notes={message.notes}
                  />
                ))
              ) : (
                <ChatBubbleSkeleton />
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center  gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={require("../../assets/images/logo.png")}
                  alt="logo"
                  className="max-md:w-72"
                />
                <h1 className="text-10b981 text-3xl font-semibold">Chat</h1>
              </div>
              <p className="text-5d5d5d text-center text-lg ">
                Start chat with customers or justipers
              </p>
            </div>
          )}
        </div>
        {customerId && (
          <div className="absolute w-full h-[12%] bg-e5e5e5 bottom-0 flex items-center justify-center">
            <input
              className="w-2/3 mx-auto px-5 py-3 border-transparent focus:border-transparent focus:ring-0 !outline-none rounded-md"
              type="text"
              placeholder="Type a message..."
              onChange={handleChange}
              value={inputValue}
              onKeyPress={handleEnter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
