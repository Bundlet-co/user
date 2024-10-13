/* eslint-disable react/prop-types */
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useMainContext from "@/hooks/useMainContext";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import {  useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const DeleteModal = ( { isOpen=false, onOpenChange=()=>{}, closeToggle=()=>{} } ) =>
{
  const [ confirm, setConfirm ] = useState( "" );
  const navigate = useNavigate()
  const { fetchData } = useAxiosFetch();
  const [ loading, setLoading ] = useState( false )
  const [isDisabled,setIsDisabled] = useState(true)
  const {user,setUser} = useMainContext()
  const submit =async ( onClose ) =>
  {
    if(confirm.toLowerCase() !== "delete my account") return
    try {
      setLoading(true)
      await fetchData( true, `/profile/${ user.id }`, "delete" )
      setUser({
    id:"",
    name: "",
    email: "",
    phone_number: "",
    address: {
    country: "",
    state:"",city:"",location:""
  },
    isVerified: false,
    accessToken:"",
    createdAt:"",
    updatedAt:""
      } )
      onClose()
      navigate('/')
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  const handleChange = ( e ) =>
  {
    const {value } = e.target;
    setConfirm(value)
  }
  useEffect( () =>
  {
    if ( confirm.toLowerCase() === "delete my account" ) {
      setIsDisabled( false )
      
    }
  },[confirm])
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={closeToggle}>
      <ModalContent>
        { onClose => (
          <>
            <ModalHeader>
              Delete account
            </ModalHeader>
            <ModalBody>
              <p className="font-bold">You are about to take a delicate action. This action is not reversible and all funds will be lost.</p>
              <p>If you wish to proceed, enter <strong className="text-danger">Delete my account</strong></p>
              <Input labelPlacement="outside" placeholder="Enter confirmation text" value={ confirm} onChange={ handleChange } label="" />
              
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" color="default" onClick={ onClose }>Cancel</Button>
              <Button color="danger" onClick={()=>submit(onClose)} isLoading={loading} isDisabled={isDisabled}><FaTrashCan/> Delete</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal