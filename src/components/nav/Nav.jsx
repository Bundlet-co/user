import { Button, Image, Input,Navbar, NavbarBrand, NavbarContent,  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarItem, useDisclosure } from "@nextui-org/react";
import logo from "@/assets/logo.png"
import { BsCart2, BsHeart, BsPersonCircle, BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import useMainContext from "@/hooks/useMainContext";
import useLogout from "@/hooks/useLogout";
import { useState } from "react";
import { Deposit } from "./MobileNav";


const Nav = () =>
{
  const { user } = useMainContext();
  const [search,setSearch] = useState("")
  const logout = useLogout();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
const getInitials = (str) =>{
  	if(typeof str !== "string" || str.trim().length===0) return "";
  	return str.trim().split(/\s+/).map(word=>word.charAt(0)).join("").toUpperCase()
}
  const navigate = useNavigate()
  const searchItem = () =>
  {
    navigate( `/product?search=${ search }` );
    setSearch("")
  }
  return (
    <nav className="hidden md:block">
      <Navbar isBlurred isBordered maxWidth="full" className="lg:container w-full mx-auto">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Link to="/"><Image src={logo} alt="Logo" className="w-40"/></Link>
          </NavbarBrand>
        </NavbarContent>
        
        <NavbarContent justify="center" as="div">
          <Input
            classNames={{
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 py-1",
            }}
            placeholder="Type to search..."
            size="sm"
            variant="bordered"
            color="primary"
            endContent={ <Button size="sm" color="primary" onClick={searchItem}>
              <BsSearch/>
            </Button>}
            type="search"
            value={ search }
            onChange={(e)=>setSearch(e.target.value)}
          />
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <NavbarItem>
            <Link className="flex space-x-1 items-center" to="/cart">
              <BsCart2 size={24}/>
              <p className="font-bold">Cart</p>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="flex space-x-1 items-center" to="/wishlist">
              <BsHeart size={24}/>
              <p className="font-bold">Wishlist</p>
            </Link>
          </NavbarItem>
          { user.name ? (
            <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                name={getInitials(user.name)}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{ user.name }</p>
              </DropdownItem>
              <DropdownItem key="profile-setting">
                  <Link to="profile">Profile</Link>
                </DropdownItem>
                <DropdownItem key="deposit" onClick={onOpen}>Deposit</DropdownItem>
                <DropdownItem key="order">
                  <Link to="order">Orders</Link>
                </DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" onClick={logout} color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          ):(
              <Link to="/login">
                <BsPersonCircle size={26} />
            </Link>)}
        </NavbarContent>
      </Navbar>
      <Deposit isOpen={isOpen} onOpenChange={onOpenChange}/>
    </nav>
  )
}

export default Nav