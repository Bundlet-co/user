import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Toast from "@/components/Toast";
import useMainContext from "@/hooks/useMainContext";


const Layout = () =>
{
  const {show,status,toastMsg,closeToast}=useMainContext()
  return (
    <div className="w-screen h-[100dvh] relative max-w-[100vw] flex flex-col">
      <Header />
      <div className="grid grid-cols-6 flex-grow overflow-y-auto border">
        <div className="hidden md:block md:col-span-2 max-h-full overflow-y-auto p-4 border-r">
          <Sidebar/>
        </div>
        <div className="col-span-full md:col-span-4 max-h-full overflow-y-auto p-4">
          <Outlet/>
        </div>
      </div>
      <div className="absolute bottom-5 w-full sm:w-3/4 md:w-1/2 lg:w-1/4 2xl:w-1/5 left-2">
        <Toast status={ status } message={ toastMsg } show={show} onClose={closeToast} duration={3000}/>
      </div>
    </div>
  )
}

export default Layout