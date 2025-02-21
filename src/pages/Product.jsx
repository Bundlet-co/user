import useInfiteScroll from "@/hooks/useInfiteScroll";
import { useSearchParams } from "react-router-dom";
import { dev_url } from "@/utils/axios";
import EmptyItem from "@/components/EmptyItem";
import SkeletonLoad from "@/components/SkeletonLoader";
import ProductCard from "@/components/product/ProductCard";


const Product = () =>
{
  let endpoint;
  const [ searchParams ] = useSearchParams();
  const category = searchParams.get( "category" )
  if ( category ) {
    endpoint = "/product/category";
  } else{
    endpoint = "/product"
  }

  const { products, ref, isLoading, hasMore } = useInfiteScroll( { url: endpoint, category } )
  

  return (
    <div className="h-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} dev_url={dev_url}/>
        ))}
      </div>
      { hasMore && <div ref={ ref } className='h-fit grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
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
      )}
    </div>
  )
}

export default Product