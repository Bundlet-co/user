/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import EmptyItem from "../EmptyItem";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import SkeletonLoad from "../SkeletonLoader";
import ProductCard from "../product/ProductCard";


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
    <div className={loading && products.length === 0 ? "my-4": !loading && products.length === 0 ? "hidden": "my-4"}>
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
        <div className="scroll-container relative flex items-center overflow-x-auto p-4 gap-4" ref={ scrollRef }>
          {
          products.map( product => (
            <ProductCard key={product.id} product={product} />
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