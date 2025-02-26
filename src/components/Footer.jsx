import { Image } from "@nextui-org/react";
import logo from "../assets/img2.png"
import img from "../assets/img3.png"
import { BsEnvelope, BsFacebook, BsGithub, BsTwitterX } from "react-icons/bs";

const Footer = () =>
{
  const company = [
    "About", "Features", "Works", "Career"
  ]

  const help = [
    "customer support", "delivery details", "Terms & conditions", "Privacy policy"
  ]

  const faq = [
    "account", "manage deliveries", "orders", "payments"
  ]

  const year = new Date().getFullYear()
  return (
    <div className="bg-neutral-200 p-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="col-span-full lg:col-span-1">
          <Image src={ logo } className="w-32 h-8" />
          <p className="my-4 text-small ">No. 1 group buying platform for bulk and discounted purchases, with fast local & international delivery.</p>
          <div className="flex items-center space-x-4">
            <BsTwitterX className="rounded-full p-1 text-black" size={26} />
            <BsFacebook className="rounded-full p-1 text-black" size={26} />
            <BsEnvelope className="rounded-full p-1 text-black" size={26} />
            <BsGithub className="rounded-full p-1 text-black" size={26}/>
          </div>
        </div>
        <div className="col-span-1">
          <p className="text-lg font-bold uppercase">Company</p>
          <div>
            { company.map( (item,index) => (
              <p className="capitalize my-2 text-neutral-700" key={ index }>{ item }</p>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <p className="text-lg font-bold uppercase">HELP</p>
          <div>
            { help.map( (item,index) => (
              <p className="capitalize my-2 text-neutral-700" key={ index }>{ item }</p>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <p className="text-lg font-bold uppercase">FAQ</p>
          <div>
            { faq.map( (item,index) => (
              <p className="capitalize my-2 text-neutral-700" key={ index }>{ item }</p>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-4 border border-neutral-400" />
      
      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <p className="text-center text-neutral-800">Pepsa Foods &copy; { year }. All rights Reserved</p>
        <div>
          <Image src={ img } className="object-contain"/>
        </div>
      </div>
    </div>
  )
}

export default Footer