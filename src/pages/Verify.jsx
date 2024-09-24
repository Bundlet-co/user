import { Button, Input } from "@nextui-org/react";
import { BsEnvelope, BsShieldCheck } from "react-icons/bs";
import useMainContext from "@/hooks/useMainContext";
import { Link } from "react-router-dom";

const Verify = () =>
{
    const { formData, handleChange, isLoading,timeInSec,resendOtp,verifyCode } = useMainContext()
  
  const formatTime = ( timeInSec ) =>
  {
    const minutes = Math.floor( timeInSec / 60 ).toString().padStart( 2, "0" )
    const seconds = ( timeInSec % 60 ).toString().padStart( 2, "0" );
    return `${minutes}:${seconds}`
  }
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="w-full md:w-3/4 lg:w-1/2:2xl:w-1/4 shadow-md border rounded-md py-4 px-8">
        <p className="text-primary text-2xl font-bold text-center my-4">Weclome To Bundlet</p>
        <p className="text-lg font-thin">Verify</p>
        <hr className="mb-8"/>
        <div className="my-4">
          <Input
            className="my-8"
            type="email"
            name="email"
            value={ formData.email }
            readOnly
            label="Email"
            labelPlacement="outside"
            startContent={ <BsEnvelope size={ 18 } /> }
            placeholder="Enter your email address"
            variant="underlined"
            color="primary"
          />
          <Input
            className="my-8"
            type="text"
            name="code"
            value={ formData.code }
            onChange={handleChange}
            label="Verification code"
            labelPlacement="outside"
            startContent={ <BsShieldCheck size={ 18 } /> }
            placeholder="Enter code sent to your mail"
            variant="underlined"
            color="primary"
            endContent={
              timeInSec === 0 ? (
                <Button size="sm" onClick={resendOtp}>Resend</Button>
              ) : <p>{ formatTime(timeInSec) }</p>
            }
          />
        </div>
        
        <div className="my-2 flex justify-end items-center">
          <Button isLoading={isLoading} isDisabled={isLoading} color="primary" onClick={verifyCode}>Verify</Button>
        </div>
        <hr />
        <div className="text-center">
          <Link to="/forget-password" className='text-primary'>Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}

export default Verify