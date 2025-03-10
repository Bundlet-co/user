import useInfiteScroll from "@/hooks/useInfiteScroll";
import { useSearchParams } from "react-router-dom";
import { dev_url } from "@/utils/axios";
import EmptyItem from "@/components/EmptyItem";
import SkeletonLoad from "@/components/SkeletonLoader";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/Footer";


const Product = () =>
{
  let endpoint;
  const [ searchParams ] = useSearchParams();
  const category = searchParams.get( "category" )
  const search = searchParams.get( "search" )
  if ( category ) {
    endpoint = "/product/category";
  } else if ( search ) { 
    endpoint = `/product/search?search=${search}`
  } else{
    endpoint = "/product"
  }

  const { products, ref, isLoading, hasMore } = useInfiteScroll( { url: endpoint, category,search } )
  

  return (
    <div className="h-full flex flex-col ">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-8 gap-2 flex-1">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} dev_url={dev_url}/>
        ) ) }
      </div>
      { hasMore && <div ref={ ref } className='h-fit grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-8 gap-2'>
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
      </div> }
      { !isLoading && !hasMore && products.length === 0 && (
        <EmptyItem message="Product is empty"/>
      ) }
      <div className="col-span-full mt-8">
          <Footer/>
        </div>
    </div>
  )
}

export default Product