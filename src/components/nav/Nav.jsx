import { Button, Image, Input, Select,Navbar, NavbarBrand, NavbarContent,  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, SelectItem, NavbarItem, SelectSection } from "@nextui-org/react";
import logo from "@/assets/logo.png"
import { BsCart2, BsHeart, BsPersonCircle, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import useMainContext from "@/hooks/useMainContext";
import useLogout from "@/hooks/useLogout";


export const SearchContent = () =>
{
  const { categories } = useMainContext()

  return (
    <div className="flex items-center px-0 mx-0 space-x-1">
      <Select className="w-24 hidden md:block" placeholder="Select a category" size="sm">
        { categories.map( category => (
          <SelectSection showDivider title={ category.name } key={ category.id }>
            { category.subCategory.map( item => (
              <SelectItem key={item.name}>{item.name}</SelectItem>
            ))}
          </SelectSection>
        ))}
      </Select>
      <Button color="primary" size="sm">
        <BsSearch/>
      </Button>
    </div>
  )
}

const Nav = () =>
{
  const { user } = useMainContext();
  const logout = useLogout();
const getInitials = (str) =>{
  	if(typeof str !== "string" || str.trim().length===0) return "";
  	return str.trim().split(/\s+/).map(word=>word.charAt(0)).join("").toUpperCase()
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
            endContent={<SearchContent />}
            type="search"
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
    </nav>
  )
}

export default Nav