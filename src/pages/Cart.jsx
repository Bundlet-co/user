import EmptyItem from "@/components/EmptyItem";
import { dev_url } from "@/utils/axios";
import { Button, Image } from "@nextui-org/react";
import { useState } from "react";
import { BsDash, BsHeart, BsPlus } from "react-icons/bs";
import { FaCartShopping, FaTrashCan } from "react-icons/fa6";


const Cart = () =>
{
  const [ carts, setCarts ] = useState( [ {
    id: 1,
    product_id: "b1db35dc-120f-4e1c-ab2d-7086350b84be",
    product: {
      "id": "b1db35dc-120f-4e1c-ab2d-7086350b84be",
      "name": "sample",
      "category": "shoe",
      "slug": [
        "test",
        "food"
      ],
      "description": "Sample description",
      "price": 5000,
      "dp": "public/images/products/dp-1725311134207-500149979IMG_5700.JPG",
      "images": [
        "public/images/products/images-1725311134244-297302577riley2.jpg",
        "public/images/products/images-1725311134246-403570970Php.JPG",
        "public/images/products/images-1725311134256-854890221Php.JPG",
        "public/images/products/images-1725311134260-248726309riley.jpg"
      ],
      "color": [],
      "size": [],
      "merchant_id": "662dbfd1-b64d-454a-91d3-33e0ab2f104f",
      "quantity": 5,
      "discount_type": "flat",
      "discount_amount": 3000,
      "opening_date": "2024-09-08",
      "available_till": 8,
      "delivery_duration": 3,
      "dispatch_location": "Lagos sample",
      "tags": [],
      "inStock": true,
      "createdAt": "2024-09-02T21:05:34.376Z",
      "updatedAt": "2024-09-02T21:05:34.376Z"
    },
    "quantity": 2,
  }])
  return (
    carts.length <= 0 ? (
      <EmptyItem message="Your cart is empty!!!"/>
    ) : (
        <section className="h-full flex flex-col">
          <p className="text-lg md:text-xl text-primary py-2 font-extrabold">My Cart</p>
          <div className="flex-1">
            {carts.map(cart=>(
              <div key={cart.id} className="flex gap-2 border rounded-lg p-2 items-center">
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
                          <span className={ cart.product.discount_amount ? "line-through text-italic me-1 text-tiny font-thin text-danger" : "" }>&#8358;{ cart.product.price }</span>
                          <span className={!cart.product.discount_amount ? "hidden" : "inline-block"}>{ cart.product.discount_type.toLowerCase() === "flat" ? `₦${cart.product.price - cart.product.discount_amount}`: `₦${(cart.product.discount_amount*cart.product.price)/100}` }</span>
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
                      <Button size="sm" color="danger" variant="flat"><BsDash size={20}/></Button>
                      <p>{ cart.quantity }</p>
                      <Button size="sm" color="primary" variant="flat"><BsPlus size={20}/></Button>
                    </div>
                    <Button className="flex space-x-4 lg:w-1/4" size="sm" color="danger" variant="flat"><FaTrashCan size={16}/>
                    <p className="hidden md:block">Remove</p></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sticky mx-auto w-full flex justify-between items-center border-t-1 p-2">
            <div>
              <div>
                <p className="text-tiny md:text-small lg:text-medium font-bold">Subtotal: ₦4000</p>
              </div>
              <div>
                <p className="text-tiny md:text-small lg:text-medium font-bold">VAT: ₦40</p>
              </div>
              <div>
                <p className="text-tiny md:text-small lg:text-medium font-bold">Total: ₦4040</p>
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

