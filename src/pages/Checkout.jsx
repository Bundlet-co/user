import EditModal from "@/components/profile/EditModal";
import { CARTITEM, PRODUCT } from "@/constant";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useCartContext from "@/hooks/useCartContext";
import useMainContext from "@/hooks/useMainContext";
import { Button, Image, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaCartShopping, FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Checkout = () =>
{
  const { carts, cartTax, cartSubTotal, cartTotal,deleteAll } = useCartContext()
  const [ cartItems, setCartItems ] = useState( [ { ...CARTITEM, product: { ...PRODUCT } } ] );
  const { user,openToast } = useMainContext();
  const { fetchData, loading } = useAxiosFetch();
  const [isDisabled,setisDisabled] = useState((user.address && user.address.location) ? false : true)

  const navigate = useNavigate();

  const [ isEdit, setIsEdit ] = useState( false );
  const { isOpen, onOpenChange, onOpen,onClose } = useDisclosure();
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

  useEffect( () =>
  {
    ( async () =>
    {
      try {
        const newItem = carts.map( async ( item ) =>
        {
          const res = await fetchData( false, `/product/${ item.productId }` );
          const result = await res.data.product;
          return { ...item, product: result };
        } );
        const data = await Promise.all( newItem );
        setCartItems( data );
      } catch ( error ) {
        console.error( error );
      }
    } )();
  }, [ carts, fetchData ] );

  const checkOut =async () =>
  {
    const data = {
      userId: user.id,
      netAmount: cartTotal,
      address: `${ user.address.location }, ${ user.address.city }, ${ user.address.state }, ${ user.address.country }`,
      orderProduct: cartItems.map(item=>({productId: item.productId,price:item.price,quantity:item.quantity,variation:item.variation}))
    }
    try {
      const res = await fetchData( true, `/order`, "post", data );
      const result = await res.data.order;
      console.log( result );
      openToast(res.message,"success")
      navigate( '/order' )
      deleteAll()
    } catch ( error ) {
      openToast(error.message, "error")
      console.error(error);
    }
  }

  useEffect( () =>
  {
    if(user.address && user.address.location) return setisDisabled(false)
  },[user.address])


  return (
    <div className="h-full">
      <p className="text-lg md:text-xl text-primary py-2 font-extrabold col-span-full h-fit">Review Order</p>
      <section className="h-full flex flex-col lg:grid lg:grid-cols-5 lg:gap-4">
        <div className="col-span-3 p-4 lg:max-h-full overflow-y-auto border rounded-md  lg:h-fit">
          { !user.address && ( <p>Add an address</p> ) }
          {user.address && (
            <div className="lg:hidden w-full mb-4 border-b-1">
              <p className="text-medium font-bold">Address Information</p>
              <p className="text-small">{ user.address.location }, { user.address.city }, { user.address.state }, { user.address.country }</p>
            </div>
          )}
          { cartItems.map( cart => (
            <div className="flex space-x-2 items-center flex-grow" key={ cart.id ? cart.id : cartItems.indexOf( cart ) + 1 } >
              <p className="text-lg font-bold">{ cartItems.indexOf( cart ) + 1 }.</p>
              <div className="flex gap-2 border rounded-lg p-2 items-center mb-2 shadow flex-grow">
                <div className="">
                  <Image src={ cart.product.dp} className="w-20 h-20 object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-between mb-4">
                    <div className="flex-1">
                      <p className="font-bold md:text-medium lg:text-lg">{ cart.product.name }</p>
                      { cart.variation && (
                        <div className="flex items-center space-x-2">
                        <p className="text-small font-semibold capitalize">{ cart.variation.type }:</p>
                        <div className="h-6 w-6 rounded-md" style={cart.variation.type  === "color" ? { backgroundColor: cart.variation.variant } : {}}>
                          {cart.variation.type  !== "color" ? cart.variation.variant : null}
                        </div>
                      </div>
                      )}
                      <div className="flex space-x-2">
                        <p className='text-primary  text-tiny'>
                          <span className="text-black font-bold">Price:</span>
                          <span className={"inline-block"}>&#8358;{ cart.price }</span>
                        </p>
                        <p className='text-tiny'>
                          <span className="text-black font-bold">Quantity:</span>
                          <span className={ "inline-block" }>{ cart.quantity } { cart.product.unit }</span>
                        </p>
                      </div>
                      <p className='text-normal font-bold'>
                        <span className=" ">Total:</span>{" "}
                        <span className={"inline-block"}>&#8358;{ cart.total }</span>
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) ) }
        </div>
        
        <div className="sticky mx-auto w-full flex justify-between items-center border-t-1 p-2 lg:flex-col border lg:col-span-2 h-fit lg:h-64 lg:items-start mt-2 lg:mt-0 rounded-s-md">
          { !user.address && ( 
            <div>
              <p>Add an address</p>
              <Button color="default" className="flex" onClick={toggleEdit}><FaPencil/> <span className="hidden lg:block">Edit profile</span></Button>
            </div>
          ) }
          {user.address && (
            <div className="hidden lg:block w-full">
              
              <p className="text-lg font-bold">Address Information</p>
              <hr />
              <p>{ user.address.location }, { user.address.city }, { user.address.state }, { user.address.country }</p>
            </div>
          )}
          <hr className="hidden lg:block w-full"/>
          <div className="lg:w-full">
            <div>
              <p className="text-tiny md:text-small text-end lg:text-lg font-bold">Subtotal: <span className="font-normal">₦{ cartSubTotal }</span></p>
            </div>
            <div>
              <p className="text-tiny md:text-small text-end lg:text-lg font-bold">VAT: <span className="font-normal">₦{ cartTax }</span></p>
            </div>
            <div>
              <p className="text-tiny md:text-small text-end lg:text-lg font-bold">Total: <span className="font-normal">₦{ cartTotal }</span></p>
            </div>
          </div>
          <Button radius="full" color="primary" className="flex space-x-2 w-1/2 lg:w-full" onClick={checkOut} isLoading={loading} isDisabled={isDisabled}>
            <FaCartShopping />
            <p>Checkout</p>
          </Button>
        </div>
        <EditModal isOpen={ isOpen } onOpenChange={ onOpenChange } closeToggle={toggleEdit}/>
      </section>
    </div>
  )
}

export default Checkout