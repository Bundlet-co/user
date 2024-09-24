/* eslint-disable react/prop-types */
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect } from "react";
import { BsBell, BsCheckCircleFill, BsExclamationCircle, BsExclamationTriangle, BsInfoCircle, BsXLg } from "react-icons/bs";


const Toast = ({message,show,duration,onClose,status}) =>
{

  const className = status.toLowerCase() === "error" ? `bg-danger text-white transition-opacity duration-300 ease-in-out animate-appearance-in w-full z-10` : status.toLowerCase() === "warning" ? `bg-warning text-white transition-opacity duration-300 ease-in-out animate-appearance-in w-full z-10` : status.toLowerCase() === "info" ? `bg-primary text-white transition-opacity duration-300 ease-in-out animate-appearance-in w-full z-10` : status.toLowerCase() === "success" ? `bg-success text-white transition-opacity duration-300 ease-in-out animate-appearance-in w-full z-10` : `bg-primary text-white transition-opacity duration-300 ease-in-out animate-appearance-in w-full z-10`
  
  const bodyClassName = status.toLowerCase() === "error" ? "bg-white text-danger" : status.toLowerCase() === "warning" ? "bg-white text-warning" : status.toLowerCase() === "info" ? "bg-white text-primary-500" : status.toLowerCase() === "success" ? "bg-white text-success" : "bg-white text-primary"
  

  const icons = status.toLowerCase() === "error" ? <BsExclamationTriangle/> : status.toLowerCase() === "warning" ? <BsExclamationCircle/> : status.toLowerCase() === "info" ? <BsInfoCircle/> : status.toLowerCase() === "success" ? <BsCheckCircleFill/> : <BsBell/>

    
  useEffect( () =>
  {
    if ( show ) {
      const timer = setTimeout( () =>
      {
        onClose();
      }, duration );

      return () => clearTimeout( timer );
    }
  }, [ show, duration, onClose ] )
  
  if ( !show ) return null;
  return (
    <Card classNames={ { 
      base: className,
      body: bodyClassName
  } }>
      <CardHeader className="flex items-center justify-between">
        <p>{ status.toUpperCase() }</p>
        <BsXLg role="button" onClick={onClose}/>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="flex items-center space-x-4">
          {icons}
          <p>{message}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default Toast