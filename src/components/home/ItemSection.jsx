/* eslint-disable react/prop-types */
import { dev_url } from "@/utils/axios";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import {FaCartShopping} from "react-icons/fa6"
import EmptyItem from "../EmptyItem";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import SkeletonLoad from "../SkeletonLoader";


const ItemSection = ({name,category}) =>
{
  const [ products, setProducts ] = useState( [] )
  const [ loading, setLoading ] = useState( true );
  const {fetchData} = useAxiosFetch()
  
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

  useEffect( () =>
  {
    ( async () =>
    {
      try {
        const res = await fetchData( false, `/product/category?category=${ category }` );
        setProducts( res.data.products );
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    })()
  },[category,fetchData])
  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold text-primary capitalize">{ name }</p>
        <Link to={`/product?category=${category}`} className="text-tiny md:text-small underline underline-offset-2 capitalize">see more</Link>
      </div>
      { loading && products.length === 0 && (
          <div className="flex gap-4 relative">
            <SkeletonLoad />
            <SkeletonLoad />
            <SkeletonLoad />
            <SkeletonLoad />
            <SkeletonLoad />
            <SkeletonLoad />
            <SkeletonLoad />
            <SkeletonLoad />
            <SkeletonLoad />
            <SkeletonLoad />
          </div>
      ) }
      {!loading && products.length === 0 && (
          <div className="h-20 border rounded-md">
            <EmptyItem message="No product at this time"/>
          </div>
      )}
      { products.length > 0 && !loading && (
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
                      <span className={!product.discount_amount ? "hidden" : "inline-block"}>{ product.discount_type.toLowerCase() === "flat" ? `₦${product.price - product.discount_amount}`: `₦${product.price - ((product.discount_amount*product.price)/100)}` }</span>
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
      ) }
    </div>
  )
}

export default ItemSection