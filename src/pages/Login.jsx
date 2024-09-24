import { Button, Checkbox, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsEnvelope, BsEyeFill, BsEyeSlashFill, BsLock } from "react-icons/bs";
import useMainContext from "@/hooks/useMainContext";
import { Link } from "react-router-dom";

const Login = () =>
{
  const [ isVisible, setIsVisible ] = useState( false );
  const {persist,formData,setPersist,handleChange,isLoading,loginSubmit} = useMainContext()

  const toggleVisibility = () =>
  {
    setIsVisible(!isVisible)
  }


  useEffect(() => {
    localStorage.setItem("persist", persist)
    },[persist])
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="w-full md:w-3/4 lg:w-1/2:2xl:w-1/4 shadow-md border rounded-md py-4 px-8">
        <p className="text-primary text-2xl font-bold text-center my-4">Weclome To Bundlet</p>
        <p className="text-lg font-thin">Login</p>
        <hr className="mb-8"/>
        <div className="my-4">
          <Input
            className="my-8 z-0"
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
            className="my-8 z-0"
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
        </div>
        
        <div className="my-2 flex justify-between items-center">
          <div>
            <Checkbox size="sm" isSelected={persist} onChange={()=>setPersist(!persist)}>
              Remeber me
            </Checkbox>
          </div>
            
          <Button isLoading={isLoading} isDisabled={isLoading} onClick={loginSubmit} color="primary" size="sm">Login</Button>
        </div>
        <hr />
        <div className="text-center">
          <p>Don&apos;t have an account? <Link to="/register" className="text-primary">Register</Link></p>
          <Link to="/forget-password" className='text-primary'>Forgot password?</Link>

        </div>
      </div>
    </div>
  )
}

export default Login