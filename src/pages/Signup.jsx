import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { BsEnvelope, BsEyeFill, BsEyeSlashFill, BsLock, BsPerson, BsPhone } from "react-icons/bs";
import useMainContext from "@/hooks/useMainContext";
import { Link } from "react-router-dom";

const Signup = () =>
{
  const [ isVisible, setIsVisible ] = useState( false );
  const [ isVisible2, setIsVisible2 ] = useState( false );
  const {formData,handleChange,isLoading,registerSubmit} = useMainContext()

  const toggleVisibility = () =>
  {
    setIsVisible(!isVisible)
  }

  const toggleVisibility2 = () =>
  {
    setIsVisible2(!isVisible2)
  }


  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="w-full md:w-3/4 lg:w-1/2:2xl:w-1/4 shadow-md border rounded-md py-4 px-8">
        <p className="text-primary text-2xl font-bold text-center my-2">Weclome To Bundlet</p>
        <p className="text-lg font-thin">Signup</p>
        <hr className="mb-4"/>
        <div className="my-2 grid grid-cols-4 gap-4">
          <Input
            className="z-0 col-span-full"
            type="text"
            name="name"
            value={ formData?.name }
            onChange={handleChange}
            label="Name"
            labelPlacement="outside"
            startContent={ <BsPerson size={ 18 } /> }
            placeholder="Enter your fullname"
            variant="underlined"
            color="primary"
          />
          <Input
            className="z-0 col-span-full md:col-span-2"
            type="email"
            name="email"
            value={ formData?.email }
            onChange={handleChange}
            label="Email"
            labelPlacement="outside"
            startContent={ <BsEnvelope size={ 18 } /> }
            placeholder="Enter your email address"
            variant="underlined"
            color="primary"
          />
          <Input
            className="z-0 col-span-full md:col-span-2"
            type="tel"
            name="phone_number"
            value={ formData?.phone_number }
            onChange={handleChange}
            label="Telephone"
            labelPlacement="outside"
            startContent={ <BsPhone size={ 18 } /> }
            placeholder="Enter your phone number"
            variant="underlined"
            color="primary"
          />
          <Input
            className="z-0 col-span-full md:col-span-2"
            type={ isVisible ? "text" : "password" }
            name="password"
            value={ formData?.password }
            onChange={handleChange}
            label="Password"
            labelPlacement="outside"
            startContent={ <BsLock size={ 18 } /> }
            placeholder="Enter your password"
            variant="underlined"
            color="primary"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                  <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                  <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
              )}
              </button>
            }
          />

          <Input
            className="z-0 col-span-full md:col-span-2"
            type={ isVisible2 ? "text" : "password" }
            name="confirm_password"
            value={ formData?.confirm_password }
            onChange={handleChange}
            label="Confirm Password"
            labelPlacement="outside"
            startContent={ <BsLock size={ 18 } /> }
            placeholder="Enter your password"
            variant="underlined"
            color="primary"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
              {isVisible2 ? (
                  <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                  <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
              )}
              </button>
            }
          />
        </div>
        
        <div className="my-2 flex justify-end items-center">
            
          <Button isLoading={isLoading} isDisabled={isLoading} onClick={registerSubmit} color="primary" size="sm">Register</Button>
        </div>
        <hr />
        <div className="text-center">
          <p>Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup