import {Dot, EllipsisVertical} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SiGooglegemini } from 'react-icons/si'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu";
import React from 'react';
import { CardHeaderProps } from '@/types/types';

  export default function CardHeader({
    user,
    date,
    onGeminiClick,
    dropdownItems,
    showGeminiButton = true,
  }: CardHeaderProps) {
    return (
      <div className="flex items-center justify-between overflow-hidden">
        <div className="flex items-center">
          {user?.avatarUrl ? (
            <Link href={`/user/${user.id}`} passHref>
              <Image
                src={user.avatarUrl}
                alt="User Profile"
                width={250}
                height={250}
                quality={75}
                className="rounded-full overflow-hidden h-8 w-8 object-cover cursor-pointer"
              />
            </Link>
          ) : (
            <Link href={`/user/${user.id}`} passHref>
              <div className="flex items-center justify-center cursor-pointer h-8 w-8 rounded-full border bg-green-600 text-white">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </Link>
          )}
          <Link href={`/user/${user.id}`} passHref>
            <div className="flex items-center ml-2 cursor-pointer">
              <div className="text-[18px]">
                {user?.name || "Unknown User"}
              </div>
              <span className="ml-2 text-gray-600 text-sm">
                <span className="hidden sm:inline">@{user.username}</span>
                <span className="inline sm:hidden">
                  @{user.username?.slice(0, 6)}...
                </span>
              </span>
  
              <Dot className="text-gray-400" />
  
              <div className="text-xs text-gray-600">{date}</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {showGeminiButton && onGeminiClick && (
            <div
              onClick={onGeminiClick}
              className="text-gray-400 hover:text-green-600 hover:bg-gray-200 p-1 rounded-full"
            >
              <SiGooglegemini size={24} />
              <span className="absolute top-full mt-1 hidden w-max text-xs font-semibold text-green-600 bg-white rounded-lg px-2 py-1 shadow-lg group-hover:flex">
                ProBot
              </span>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()}
              className="hover:bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center focus:outline-none"
            >
              <EllipsisVertical
                size={20}
                className="text-gray-400 hover:text-green-600"
              />
            </DropdownMenuTrigger>
  
            <DropdownMenuContent
              align="end"
              sideOffset={5}
              className="w-52 z-50"
            >
              {dropdownItems.map((item, index) => (
                <>
                  <DropdownMenuItem
                    key={index}
                    onClick={item.onClick}
                    className={item.className || "flex items-center cursor-pointer"}
                  >
                    {item.icon}
                    {item.label}
                  </DropdownMenuItem>
                  {index < dropdownItems.length - 1 && <DropdownMenuSeparator />}
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }