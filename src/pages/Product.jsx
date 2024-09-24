import useInfiteScroll from "@/hooks/useInfiteScroll";
import { useSearchParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, Image, Spinner } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { BsHeart } from 'react-icons/bs';
import { dev_url } from "@/utils/axios";
import EmptyItem from "@/components/EmptyItem";


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

  const { products,hasMore,ref } = useInfiteScroll( {url:endpoint, category } );
  return (
    <div className="h-full">
      { products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          
          <Card key={product.id} shadow='sm' className='relative me-4 flex-none'>
              <Link to={`/product/${product.id}`}>
                <CardBody>
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
          
        ))}
      </div>
      {hasMore ? <div ref={ref} className='h-12 text-center my-3'>
        <Spinner color='primary' className='mx-auto'/>
      </div> : null}
        </>
      ): <EmptyItem message="No product found"/>}
    </div>
  )
}

export default Product