"use client";
import ChatContainer from "@/components/chatComponents/ChatContainer";
import Users from "@/components/chatComponents/UsersBar";
import Sidebar from "@/components/Sidebar";
import { User } from "next-auth";
import { useState } from "react";

const ChatLayout = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-hidden">
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
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Users</h2>
            </div>
            <Users onSelectUser={setSelectedUser} />
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
              onBack={handleBack}
            />
          </div>

          <div className="hidden lg:flex lg:flex-col w-64 border-l border-gray-200 bg-white">
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Active Users
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Users onSelectUser={setSelectedUser} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;
