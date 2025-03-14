import useMainContext from "@/hooks/useMainContext";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import EditModal from "./EditModal";
import { useState } from "react";
import DeleteModal from "./DeleteModal";


const Desktop = () =>
{
  const { user } = useMainContext();
  const { isOpen, onOpenChange, onOpen,onClose } = useDisclosure();
  const [ isDelete, setIsDelete ] = useState( false );
  const [ isEdit, setIsEdit ] = useState( false );
  const toggleEdit = () =>
  {
    if ( !isEdit ) {
      setIsEdit( !isEdit );
      onOpen();
    } else {
      setIsEdit( !isEdit );
      onClose();
    }
  }
  const toggleDelete = () =>
  {
    if ( !isDelete ) {
      setIsDelete( !isDelete );
      onOpen();
    } else {
      setIsDelete( !isDelete );
      onClose();
    }
  }
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg md:text-xl text-primary py-2 font-extrabold">Account Overview</p>
        <div className="flex space-x-4 items-center">
          <Button color="default" className="flex" onClick={toggleEdit}><FaPencil/> <span className="hidden lg:block">Edit profile</span></Button>
          <Button color="danger" className="flex" onClick={toggleDelete}><FaTrashCan/> <span className="hidden lg:block">Delete profile</span></Button>
        </div>
        </div>
      

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-full md:col-span-2 border-2 rounded-md p-4">
          <p className="text-lg text-neutral-800">Account Details</p>
          <hr />
          <p className="text-lg font-bold">{ user.name }</p>
          <p className="text-tiny lg:text-small ">{ user.email }</p>
        </div>
        <div className="col-span-full md:col-span-2 border-2 rounded-md p-4">
          <p className="text-lg text-neutral-800">Address</p>
          <hr />
          { !user.address && ( <p>Add an address</p> ) }
          { user.address && (
            <>
              <p className="flex font-bold space-x-2">
                <span>
                  Address:
                </span> 
                <span className="font-normal">
                  
                  { user.address.location }
                </span>
                </p>
              <p className="flex font-bold space-x-2">
                <span>
                  City:
                </span> 
                <span className="font-normal">
                  
                  { user.address.city }
                </span>
                </p>
              <p className="flex font-bold space-x-2">
                <span>
                  State:
                </span> 
                <span className="font-normal">
                  
                  { user.address.state }
                </span>
                </p>
              <p className="flex font-bold space-x-2">
                <span>
                  Country:
                </span> 
                <span className="font-normal">
                  
                  { user.address.country }
                </span>
                </p>
            </>
          )}
        </div>
        <div className="col-span-full md:col-span-2 border-2 rounded-md p-4">
          <p className="text-lg text-neutral-800">Account Balance</p>
          <hr />
          <p className="text-lg font-bold">Wallet: ₦ { user.balance.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) || 0 }</p>
        </div>
      </div>
      { isEdit && <EditModal isOpen={ isOpen } onOpenChange={ onOpenChange } closeToggle={toggleEdit}/> }
      { isDelete && <DeleteModal isOpen={ isOpen } onOpenChange={ onOpenChange } closeToggle={ toggleDelete } />}
    </div>
  )
}

export default Desktop