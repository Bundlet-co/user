import { useState } from "react";
import { dev_url } from "@/utils/axios";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import {FaCartShopping} from "react-icons/fa6"
import EmptyItem from "@/components/EmptyItem";

const Wishlist = () =>
{
  const [ wishlists, setWishlist ] = useState( [
    {
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
  }
  ])
  return (
    wishlists.length <= 0 ? (
      <EmptyItem message="Your wishlist is empty"/>
    ) : (
        <section className="h-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            { wishlists.map( item => (
              <div key={item.id} className="col-span-1">
                <Card  shadow='sm' className='relative w-full flex-none'>
              <Link to={`/product/${item.product.id}`}>
                <CardBody>
                  <Image
                      radius='lg'
                      alt={item.product.name}
                      src={`${dev_url}/${item.product.dp.replace('public/','')}`}
                      className='object-cover relative z-0 h-[8rem] w-[12rem] sm:h-[12rem] sm:w-[19rem] md:h-[8rem]'
                  />
                </CardBody>
              </Link>
              <CardFooter className='text-small justify-start flex-col mt-0 pt-0'>
                <div className='w-full'>
                  <Link to={`/product/${item.product.id}`}>
                    <p className="capitalize text-medium font-semibold">{ item.product.name }</p>
                    
                    <p className='text-primary font-bold text-sall'>
                      <span className={ item.product.discount_amount ? "line-through text-italic me-1 text-tiny font-thin text-danger" : "" }>&#8358;{ item.product.price }</span>
                      <span className={!item.product.discount_amount ? "hidden" : "inline-block"}>{ item.product.discount_type.toLowerCase() === "flat" ? `₦${item.product.price - item.product.discount_amount}`: `₦${(item.product.discount_amount*item.product.price)/100}` }</span>
                    </p>
                  </Link>
                </div>
                <div className="w-full flex justify-center my-2 item-center">
                  <Button size="sm" color='primary'>
                    <FaCartShopping />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </CardFooter>
                
              <div role='button' className="absolute z-10 flex justify-center items-center bg-white right-5 top-5 rounded-full p-2 w-12 h-12 md:p-2">
                <BsHeart size={24}/>
              </div>
              { item.product.discount_amount ? (
                <div className="absolute z-10 flex justify-center items-center left-2 bg-danger-400 text-neutral-100 top-2 rounded-lg p-2 md:p-2">
                  <p className="text-[10px]">- {item.product.discount_type.toLowerCase() === "flat" ? `₦${item.product.discount_amount}` : `${item.product.discount_amount}%`}</p>
                </div>
              ): null}
            </Card>
              </div>
            ))}
          </div>
        </section>
    )
  )
}

export default Wishlist