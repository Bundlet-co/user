/* eslint-disable react/prop-types */
import { Image, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Input, } from "@nextui-org/react";
import logo from "@/assets/logo.png"
import { Link, useSearchParams } from "react-router-dom";
import { BsCart2, BsHeart, BsList, BsPersonCircle, BsXLg } from "react-icons/bs";
import { SearchContent } from "./Nav";
import { useState } from "react";
import useMainContext from "@/hooks/useMainContext";
import useLogout from "@/hooks/useLogout";

const Offcanvas = ({isOpen, toggleIsOpen}) =>
{
  const {categories,user} = useMainContext()
  const [ searchParams ] = useSearchParams()
  
  const cat = searchParams.get('category');
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-20 h-screen md:hidden">
        <div className={ isOpen ? "md:hidden absolute top-0 left-0 z-10 w-3/4 bg-white shadow-md h-full px-3 py-4 flex flex-col animate-slideIn overflow-x-auto" : "md:hidden absolute top-0 left-0 z-10 w-3/4 bg-white shadow-md h-full px-3 py-4 flex flex-col animate-slideOut" }>
          <div className="flex items-center justify-between">
            { user.id ? (
            <Link to="/profile" onClick={toggleIsOpen}  className="flex items-center">
              <Avatar
                as="button"
                className="transition-transform"
                name={user.name.split(' ').map(word=> word[0].toUpperCase()).join('')}
              />
            </Link>
            ): (
              <Link to="/login" onClick={toggleIsOpen}  className="flex items-center">
              <BsPersonCircle size={24} className="me-2 text-primary" />
              <p className="font-bold">Login</p>
            </Link>
            )}
            <BsXLg size={20} className="ms-auto" role="button" onClick={toggleIsOpen}/>
          </div>
          <hr className="mt-2 border" />
          <div className="mt-2 flex-grow overflow-y-auto">
            { categories.map( category => (
              <div className="my-4"key={category.id}>
                <p className="capitalize text-sm font-bold">
                  {category.name}
                </p>
                <div className="flex flex-col gap-2 my-2">
                  { category.subCategory.map( item => (
                    <Link to={`/product?category=${item.name}`} onClick={toggleIsOpen} key={item.id} className={cat && cat.toLowerCase()=== item.name.toLowerCase() ?"text-tiny ms-4 bg-neutral-100 p-2 rounded-md hover:bg-neutral-200 border-l-2 border-r-2 border-primary-300": "text-tiny ms-4 bg-neutral-100 p-2 rounded-md hover:bg-neutral-200"} role="button">
                      {item.name}
                    </Link>
                  ))}
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

const MobileNav = () =>
{
  const [ isOpen, setIsOpen ] = useState( false );

  const toggleIsOpen = () => setIsOpen( !isOpen );
  const { user } = useMainContext()
  const logout = useLogout()
  return (
    <nav className="p-1 px-2 md:hidden">
      <div className="flex items-center justify-center flex-col py-3">
        <Link to="/"><Image src={ logo } alt="Logo" className="w-28" /></Link>
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
      </div>
      <hr />
      <section className="flex justify-between items-center py-2 px-1">
        
        <div className="">
          <BsList size={20} role="button" onClick={toggleIsOpen}/>
        </div>
        <div className="flex space-x-4">
          <Link className="flex space-x-1 items-center" to="/cart">
            <BsCart2 size={20}/>
          </Link>
          <Link className="flex space-x-1 items-center" to="/wishlist">
              <BsHeart size={20}/>
            </Link>
          { user.name ? (
            <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                name={user.name.split(' ').map(word=> word[0].toUpperCase()).join('')}
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
                  <Link to="profile">Orders</Link>
                </DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          ):(<Link to="/login">
                <BsPersonCircle size={26} />
            </Link>)}
        </div>
      </section>
      <Offcanvas isOpen={isOpen} toggleIsOpen={toggleIsOpen}/>
    </nav>
  )
}

export default MobileNav