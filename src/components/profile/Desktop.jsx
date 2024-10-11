import useMainContext from "@/hooks/useMainContext";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import EditModal from "./EditModal";


const Desktop = () =>
{
  const { user } = useMainContext();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg md:text-xl text-primary py-2 font-extrabold">Account Overview</p>
        <div className="flex space-x-4 items-center">
          <Button color="default" className="flex" onClick={onOpen}><FaPencil/> <span className="hidden lg:block">Edit profile</span></Button>
          <Button color="danger" className="flex"><FaTrashCan/> <span className="hidden lg:block">Delete profile</span></Button>
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
          <p>{ user.address? user.address : "Add an address" }</p>
        </div>
        <div className="col-span-full md:col-span-2 border-2 rounded-md p-4">
          <p className="text-lg text-neutral-800">Account Balance</p>
          <hr />
          <p className="text-lg font-bold">Wallet: ₦{ user.balance || 0 }</p>
        </div>
      </div>
      <EditModal isOpen={ isOpen } onOpenChange={onOpenChange}/>
    </div>
  )
}

export default Desktop