import CartLoader from "@/components/animations/CartLoader";
import EmptyItem from "@/components/EmptyItem";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useCartContext from "@/hooks/useCartContext";
import useMainContext from "@/hooks/useMainContext";
import { dev_url } from "@/utils/axios";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsDash, BsHeart, BsPlus } from "react-icons/bs";
import { FaCartShopping, FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const Cart = () =>
{
  const { carts, cartSubTotal,deleteItem,handleDecrement,handleIncrement,deleteAll,increaseSup,decreaseSup } = useCartContext()
  const [ cartItems, setCartItems ] = useState( [] );
  const { fetchData } = useAxiosFetch();
  const [isLoading,setIsLoading] = useState(true)
  const {user} = useMainContext()

  const navigate = useNavigate();

  const checkoutBtn = () =>
  {
    navigate('/checkout')
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
      } finally {
        setIsLoading(false)
      }
    } )();
  }, [ carts, fetchData ] );





  return (
    <div className="h-full">
      {cartItems.length <= 0 && isLoading && (
        <div>
          <CartLoader/>
          <CartLoader/>
          <CartLoader/>
          <CartLoader/>
          <CartLoader/>
          <CartLoader/>
          <CartLoader/>
          <CartLoader/>
          <CartLoader/>
          <CartLoader/>
        </div>
      ) }
      {    cartItems.length <= 0 && !isLoading && (
      <EmptyItem message="Your cart is empty!!!"/>
      ) }
      {cartItems.length >0 && !isLoading && (
        <section className="h-full flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-lg md:text-xl text-primary py-2 font-extrabold">My Cart</p>
            <Button color="danger" onClick={deleteAll}><FaTrashCan/> Clear All</Button>
          </div>
          <div className="flex-1">
            { cartItems.map( (cart,index) => (
              <div key={cart.id ? cart.id : cartItems.indexOf(cart)+1} className="grid grid-cols-1 mb-2 border rounded-lg p-2">
                <div className="flex gap-2  items-center">
                  <div className="">
                    <Image src={`${dev_url}/${cart.product.dp.replace("public/","")}`} className="w-20 h-20 object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-between mb-4">
                      <div className="flex-1">
                        <p className="font-bold md:text-medium lg:text-lg">{ cart.product.name }</p>
                        { cart.variation && (
                          <div className="flex items-center space-x-2">
                          <p className="text-small font-semibold capitalize">{ cart.variation.type }:</p>
                          <div className={cart.variation.type === "color" ? "h-6 w-6 rounded-md" :""} style={cart.variation.type  === "color" ? { backgroundColor: cart.variation.variant } : {}}>
                            {cart.variation.type  !== "color" ? <p className="text-tiny">{cart.variation.variant}</p> : null}
                          </div>
                        </div>
                        )}
                        <p className='text-primary font-bold text-sall'>
                          { cart.variation && ( <span className={ cart.price ? "line-through italic me-1 text-tiny font-thin text-danger" : "" }>&#8358;{ cart.product.variation.find( variation => variation.variant === cart.variation.variant )?.price || 0 }</span> ) }
                          
                          { !cart.variation && (
                            <span className={ cart.price ? "line-through italic me-1 text-tiny font-thin text-danger" : "" }>&#8358;{ cart.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</span>
                          )}
                          
                            <span className={!cart.product.discount_amount ? "hidden" : "inline-block"}>&#8358;{ cart.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</span>
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
                        <Button size="sm" color="danger" variant="flat" onClick={()=>handleDecrement({id:cart.id?cart.id:cart.productId,variant:cart.variation ? cart.variation.variant : null})}><BsDash size={20}/></Button>
                        <p>{ cart.quantity }</p>
                        <Button size="sm" color="primary" variant="flat" onClick={()=>handleIncrement({id:cart.id?cart.id:cart.productId, variant:cart.variation ? cart.variation.variant : null})}><BsPlus size={20}/></Button>
                      </div>
                      <Button className="flex space-x-4 lg:w-1/4" size="sm" color="danger" variant="flat" onClick={()=>deleteItem({id:cart.id?cart.id:cart.productId,variant:cart.variation ? cart.variation.variant : null})}><FaTrashCan size={16}/>
                      <p className="hidden md:block">Remove</p></Button>
                    </div>
                  </div>
                </div>
                { cart.suplementryProducts && cart.suplementryProducts.length > 0 && (
                  <div className="mt-1">

                    <p className="font-semibold">Supplimentry projects</p>
                    {cart.suplementryProducts.map( (product,supIndex) => (
                      <div key={ product.id } className={ "px-2 flex items-center space-x-1" } role="button">
                        <p className="font-bold">{ supIndex + 1 }.</p>
                        <p className="text-tiny font-bold ms-2 me-4">{ user.id!== "" && product.name === null ? product.product.name : product.name }</p>
                        <button className="px-4 py-1 rounded-lg border-0 bg-neutral-200 hover:bg-neutral-300"  onClick={()=>decreaseSup(index,supIndex)}> <BsDash/></button>
                        
                        <p className="mx-8 text-tiny">{product.quantity}</p>
                        <button className="px-4 py-1 rounded-lg border-0 bg-neutral-200 hover:bg-neutral-300"  onClick={()=>increaseSup(index,supIndex)}> <BsPlus /></button>
                      </div>
                    ))}
                  </div>
                )}
                </div>
            ))}
          </div>
          <div className="sticky mx-auto w-full flex justify-between items-center border-t-1 p-2">
            <div>
              <div>
                <p className="text-tiny md:text-small lg:text-medium font-bold">Subtotal: ₦{ cartSubTotal.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</p>
              </div>
            </div>
            <Button radius="full" color="primary" className="flex space-x-2 w-1/2" onClick={checkoutBtn}>
              <FaCartShopping />
              <p>Checkout</p>
            </Button>
          </div>
      </section>
    )}
    </div>
  )
}

export default Cart;

