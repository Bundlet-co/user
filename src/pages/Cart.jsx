import EmptyItem from "@/components/EmptyItem";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useCartContext from "@/hooks/useCartContext";
import { dev_url } from "@/utils/axios";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsDash, BsHeart, BsPlus } from "react-icons/bs";
import { FaCartShopping, FaTrashCan } from "react-icons/fa6";


const Cart = () =>
{
  const { carts, cartTax, cartSubTotal, cartTotal,deleteItem,handleDecrement,handleIncrement,deleteAll } = useCartContext()
  const [ cartItems, setCartItems ] = useState( [] );
  const { fetchData } = useAxiosFetch();

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
  console.log(carts);



  return (
    cartItems.length <= 0 ? (
      <EmptyItem message="Your cart is empty!!!"/>
    ) : (
        <section className="h-full flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-lg md:text-xl text-primary py-2 font-extrabold">My Cart</p>
            <Button color="danger" onClick={deleteAll}><FaTrashCan/> Clear All</Button>
          </div>
          <div className="flex-1">
            {cartItems.map(cart=>(
              <div key={cart.id ? cart.id : cartItems.indexOf(cart)+1} className="flex gap-2 border rounded-lg p-2 items-center mb-2">
                <div className="">
                  <Image src={ `${ dev_url }/${ cart.product.dp.replace( "public/", "" ) }` } className="w-20 h-20 object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-between mb-4">
                    <div className="flex-1">
                      <p className="font-bold md:text-medium lg:text-lg">{ cart.product.name }</p>
                      <p className="text-small italic hidden lg:block">{ cart.product.description.length > 200 ? `${ cart.product.description.slice( 0, 200 ) }...` : `${ cart.product.description }` }</p>
                      <p className="text-small italic lg:hidden">{ cart.product.description.length > 50 ? `${ cart.product.description.slice( 0, 50 ) }...` : `${ cart.product.description }` }</p>
                      <p className='text-primary font-bold text-sall'>
                          <span className={ cart.product.discount_amount ? "line-through text-italic me-1 text-tiny font-thin text-danger" : "" }>&#8358;{ cart.price }</span>
                          <span className={!cart.product.discount_amount ? "hidden" : "inline-block"}>{ cart.product.discount_type.toLowerCase() === "flat" ? `₦${cart.price - cart.product.discount_amount}`: `₦${cart.price -((cart.product.discount_amount*cart.price)/100)}` }</span>
                        </p>
                    </div>
                    <div className="">
                      <div role='button' className="flex justify-center items-center border border-primary bg-white rounded-full p-2 w-8 h-8 md:p-2">
                        <BsHeart size={20} className="text-primary"/>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-evenly items-center font-bold">
                    <div className="flex space-x-2 md:space-x-4 items-center lg:w-3/4">
                      <Button size="sm" color="danger" variant="flat" onClick={()=>handleDecrement({id:cart.id?cart.id:cart.productId,variant:cart.variation.variant})}><BsDash size={20}/></Button>
                      <p>{ cart.quantity }</p>
                      <Button size="sm" color="primary" variant="flat" onClick={()=>handleIncrement({id:cart.id?cart.id:cart.productId,variant:cart.variation.variant})}><BsPlus size={20}/></Button>
                    </div>
                    <Button className="flex space-x-4 lg:w-1/4" size="sm" color="danger" variant="flat" onClick={()=>deleteItem({id:cart.id?cart.id:cart.productId,variant:cart.variation.variant})}><FaTrashCan size={16}/>
                    <p className="hidden md:block">Remove</p></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sticky mx-auto w-full flex justify-between items-center border-t-1 p-2">
            <div>
              <div>
                <p className="text-tiny md:text-small lg:text-medium font-bold">Subtotal: ₦{ cartSubTotal }</p>
              </div>
              <div>
                <p className="text-tiny md:text-small lg:text-medium font-bold">VAT: ₦{ cartTax }</p>
              </div>
              <div>
                <p className="text-tiny md:text-small lg:text-medium font-bold">Total: ₦{ cartTotal }</p>
              </div>
            </div>
            <Button radius="full" color="primary" className="flex space-x-2 w-1/2">
              <FaCartShopping />
              <p>Checkout</p>
            </Button>
          </div>
      </section>
    )
  )
}

export default Cart;

