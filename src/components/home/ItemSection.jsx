/* eslint-disable react/prop-types */
import { dev_url } from "@/utils/axios";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRef, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import {FaCartShopping} from "react-icons/fa6"
import EmptyItem from "../EmptyItem";


const ItemSection = ({name,endpoint,category}) =>
{
  const [products,setProducts] = useState([
    {
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
    {
      "id": "8c240a09-a216-4315-bb90-17774bc8307f",
      "name": "test",
      "category": "sofa",
      "slug": [
        "food"
      ],
      "description": "Sample",
      "price": 4000,
      "dp": "public/images/products/dp-1725394358800-372757769Php.JPG",
      "images": [
        "public/images/products/images-1725394359121-877278832MuskTrump.png",
        "public/images/products/images-1725394359130-286681171riley.jpg",
        "public/images/products/images-1725394359131-151370950lynn].jpg"
      ],
      "color": [],
      "size": [],
      "merchant_id": "662dbfd1-b64d-454a-91d3-33e0ab2f104f",
      "quantity": 6,
      "discount_type": "percentage",
      "discount_amount": 34,
      "opening_date": "2024-09-03",
      "available_till": 6,
      "delivery_duration": 5,
      "dispatch_location": "lagos",
      "tags": [],
      "inStock": true,
      "createdAt": "2024-09-03T20:12:39.330Z",
      "updatedAt": "2024-09-03T20:12:39.330Z"
    },
    {
      "id": "ec75a796-3a8b-4466-a220-809dbfb22f95",
      "name": "Test",
      "category": "Food",
      "slug": [
        "Pfp",
        "profile"
      ],
      "description": "This is a sample description",
      "price": 80000,
      "dp": "public/images/products/dp-1725876553145-869857570Php.JPG",
      "images": [
        "public/images/products/images-1725876553162-384979184team.avif",
        "public/images/products/images-1725876553166-52160226IMG_5730.JPG",
        "public/images/products/images-1725876553232-883865065lynn].jpg"
      ],
      "color": [
        "#e01b24",
        "#f8e45c",
        "#1a5fb4"
      ],
      "size": [
        "s",
        "m",
        "xl"
      ],
      "merchant_id": "662dbfd1-b64d-454a-91d3-33e0ab2f104f",
      "quantity": 200,
      "discount_type": "flat",
      "discount_amount": 0 ,
      "opening_date": "2024-10-15",
      "available_till": 20,
      "delivery_duration": 5,
      "dispatch_location": "Lagos Nigeria",
      "tags": [],
      "inStock": true,
      "createdAt": "2024-09-09T10:09:13.430Z",
      "updatedAt": "2024-09-09T10:09:13.430Z"
    }
  ] )
  
  const scrollRef = useRef()
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth"
      })
    }
  }
  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold text-primary capitalize">{name}</p>
        <Link to={`/product?category=${category}`} className="text-tiny md:text-small underline underline-offset-2 capitalize">see more</Link>
      </div>
      { products.length > 0 ? (
        <div className="flex gap-4 relative">
        <button onClick={() => scroll("left")} className={products.length > 2 ? 'absolute top-1/2 z-10 left-0  hover:text-white rounded-full  me-2 bg-white text-primary hover:bg-primary' : "hidden"} >
          <BsArrowLeftCircle size={36}/>
        </button>
        <div className="scroll-container relative flex items-center overflow-x-auto p-4" ref={ scrollRef }>
          {
          products.map( product => (
            <Card key={product.id} shadow='sm' className='relative me-4 flex-none'>
              <Link to={`/product/${product.id}`}>
                <CardBody >
                  <Image
                      radius='lg'
                      alt={product.name}
                      src={`${dev_url}/${product.dp.replace('public/','')}`}
                      className='object-cover relative z-0 h-[8rem] w-[12rem]'
                  />
                </CardBody>
              </Link>
              <CardFooter className='text-small justify-start flex-col mt-0 pt-0'>
                <div className='w-full'>
                  <Link to={`/product/${product.id}`}>
                    <p className="capitalize text-medium font-semibold">{ product.name }</p>
                    
                    <p className='text-primary font-bold text-sall'>
                      <span className={ product.discount_amount ? "line-through text-italic me-1 text-tiny font-thin text-danger" : "" }>&#8358;{ product.price }</span>
                      <span className={!product.discount_amount ? "hidden" : "inline-block"}>{ product.discount_type.toLowerCase() === "flat" ? `₦${product.price - product.discount_amount}`: `₦${(product.discount_amount*product.price)/100}` }</span>
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
              { product.discount_amount ? (
                <div className="absolute z-10 flex justify-center items-center left-2 bg-danger-400 text-neutral-100 top-2 rounded-lg p-2 md:p-2">
                  <p className="text-[10px]">- {product.discount_type.toLowerCase() === "flat" ? `₦${product.discount_amount}` : `${product.discount_amount}%`}</p>
                </div>
              ): null}
            </Card>
          ))
          }
        </div>
        
        <button className={products.length > 2 ? "hover:bg-primary hover:text-white rounded-full bg-white text-primary absolute top-1/2 z-10 right-0" : "hidden"} onClick={() => scroll("right")}>
          <BsArrowRightCircle size={36}/>
        </button>
      </div>
      ) : (
          <div className="h-20">
            <EmptyItem name="product"/>
          </div>
      )}
    </div>
  )
}

export default ItemSection