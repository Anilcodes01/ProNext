"use client";
import ChatContainer from "@/components/chatComponents/ChatContainer";
import Users from "@/components/chatComponents/UsersBar";
import Sidebar from "@/components/Sidebar";
import { User } from "next-auth";
import { useState } from "react";

const ChatLayout = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    setSelectedUser(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-screen bg-gray-50 fixed flex w-full flex-hidden">
      <div className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1">
            <Sidebar />
          </div>
        </div>
      </div>

      <div className="flex-1 flex mt-16 flex-col min-h-screen overflow-hidden">
        <main className="flex-1 flex h-screen">
          <div
            className={`md:hidden w-full ${selectedUser ? "hidden" : "block"}`}
          >
            <div className="bg-white">
              <div className="h-16 px-3 flex items-center ">
                <input
                  type="text"
                  className="rounded-full w-full outline-none p-4 bg-gray-100 h-10"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <Users
              onSelectUser={setSelectedUser}
              selectedUserId={selectedUser?.id}
              searchQuery={searchQuery}
            />
          </div>

          <div
            className={`flex-1 flex flex-col bg-white ${
              !selectedUser && "hidden md:flex"
            }`}
          >
            <ChatContainer
              selectedUserAvatarUrl={selectedUser?.avatarUrl || ""}
              selectedUserId={selectedUser?.id || ""}
              selectedUserName={selectedUser?.name || ""}
              selectedUserEmail={selectedUser?.email || ""}
              onBack={handleBack}
            />
          </div>

          <div className="hidden lg:flex lg:flex-col w-64 border-l border-gray-200 bg-white">
            <div className="flex-1 flex flex-col min-h-0">
              <div className="h-16 px-4 flex items-center border-b border-gray-200">
                <input
                  type="text"
                  className="rounded-full w-full outline-none p-4 bg-gray-100 h-10"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                <Users
                  onSelectUser={setSelectedUser}
                  selectedUserId={selectedUser?.id}
                  searchQuery={searchQuery}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;
