/* eslint-disable react/prop-types */
import { countries } from "@/constant";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useMainContext from "@/hooks/useMainContext";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState } from "react";


const EditModal = ( { isOpen = false, onOpenChange = () => { }, closeToggle =()=>{} } ) =>
{
  const { user,setUser } = useMainContext();
  const [ formData, setFormData ] = useState( user );
  const [ address, setAddress ] = useState( user.address || {
    country: "",
    state:"",city:"",location:""
  } )
  const { fetchData,loading } = useAxiosFetch();
  const handleChange = ( e ) =>
  {
    const { name, value } = e.target
    setFormData( prev => ( { ...prev, [ name ]: value } ) );
  }

  const handleAddressChange = ( e ) =>
  {
    const { name, value } = e.target
    setAddress(prev => ({...prev,[name]:value}))
  }

  const submit = async (onClose) =>
  {
    try {
      const data = { ...formData, address: { ...address } }
      const res = await fetchData( true, `/profile/${ user.id }`, "put", data )
      const result = res.data.user;
      setUser( prev => ( { ...prev, ...result } ) );
      onClose()
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={closeToggle}>
      <ModalContent>
        { onClose => (
          <>
            <ModalHeader>
              Edit Profile
            </ModalHeader>
            <ModalBody>
              <hr />
              <p className="font-bold">Personal Infromation</p>
              <Input label="Name" labelPlacement="outside" placeholder="Enter preferred name" value={ formData.name } onChange={ handleChange } name="name" />
              <Input label="Phone Number" labelPlacement="outside" placeholder="Enter preferred phone number" value={ formData.phone_number } onChange={ handleChange } name="phone_number"/>
              <p className="font-bold">Address Infromation</p>
              <hr />
              <Select name="country" selectedKeys={[address.country]} onChange={handleAddressChange} label="Country" labelPlacement="outside" placeholder="Select a country">
                { countries.map( country => (
                  <SelectItem key={ country.name }>{ country.name }</SelectItem>
                ))}
              </Select>
              <Input
                name="state"
                onChange={ handleAddressChange }
                value={address.state}
                type="text"
                placeholder="Enter your state or Pronvince"
                label="State/Province"
                labelPlacement="outside"
              />
              <Input 
                name="city" 
                onChange={handleAddressChange} 
                value={address.city}
                type="text" 
                placeholder="Enter your City" 
                label="City" 
                labelPlacement="outside" 
              />
              <Textarea 
                name="location" 
                onChange={handleAddressChange} 
                value={address.location}
                type="text" 
                placeholder="Enter delivery address" 
                label="Address" 
                labelPlacement="outside"
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" color="danger" onClick={ onClose }>Cancel</Button>
              <Button color="default" onClick={()=>submit(onClose)} isLoading={loading} isDisabled={loading}>Save</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditModal