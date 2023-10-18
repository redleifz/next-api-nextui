'use client'
import React, { useEffect, useState } from "react";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "./Icons/Icons.jsx";
import { AcmeLogo } from "./Icons/AcmeLogo.jsx";
import { ThemeSwitcher } from "./ThemeSwitcher.jsx";
import ModalLogin from "./ModalLogin.jsx";
import { getUserInfo } from "@/utils/service.js";
import { useRouter } from "next/navigation.js";



export default function App() {

  
  //set empty object state
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter()

  useEffect(() => {
    // Check if localStorage is available on the client side
    if (typeof localStorage !== "undefined") {
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        setUserInfo(JSON.parse(userInfoString));
      } else {
      //set empty object state
      setUserInfo(null);
      }
    }
  }, []); // Empty dependency array to ensure it runs on

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    router.push("/")
  }

  // console.log(userInfo)

  return (
    <>
      <Navbar className="border-b-2">
        <NavbarBrand className="cursor-pointer">
          <AcmeLogo />
          <p className="font-bold text-inherit">YOUR LOGO</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <ThemeSwitcher />
          </NavbarItem>
          {userInfo !== null ?
            <>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://storage.googleapis.com/pai-images/5cf3e3253b8a4d46b90677973512a5d2.jpeg"
                  />
                </DropdownTrigger>

                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    {/* <p className="font-semibold text-lg">Signed in as</p> */}
                    <p className="text-lg">{userInfo?.userLogin}</p>
                    <hr />
                  </DropdownItem>
                  {/* <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
                  <DropdownItem key="logout" color="danger" onClick={
                    handleLogout
                  }>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
            :
            <>
              <NavbarItem className="hidden lg:flex">
                <ModalLogin setUserInfo={setUserInfo} />
              </NavbarItem>
            </>
          }
        </NavbarContent>
      </Navbar>
    </>
  );
}
