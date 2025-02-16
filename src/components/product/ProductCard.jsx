/* eslint-disable react/prop-types */
import { Button, Card, CardBody, CardFooter, Image, useDisclosure } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { BsHeart } from 'react-icons/bs';
import AddToCartModal from "@/components/product/AddToCartModal";
import useMainContext from '@/hooks/useMainContext';
import useCartContext from '@/hooks/useCartContext';
import { daysLeftToExpire } from '@/utils/functions';

const ProductCard = ( { product } ) =>
{
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addToWishlist, removeFromWishlist, wishlists } = useMainContext();
  const { addToCart } = useCartContext();
  const wishlist = wishlists.find( wishlist => wishlist.product_id === product.id )||{product_id:product.id,inWishlist:false};

  const daysLeft = daysLeftToExpire(product.opening_date,product.available_till)


  const addItemToCart = () =>
  {
    if ( product.variation.length > 0 ) {
      onOpen();
      return
    } else {
      addToCart(product,null,null)
    }
  }
  
  return (
    <Card shadow='sm' className='relative me-4 flex-none'>
      <Link to={`/product/${product.id}`}>
        <CardBody>
          <Image
              radius='lg'
              alt={product.name}
              src={product.dp}
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
            { product.opening_date && daysLeft !== 0 && ( <p className='my-2 text-small'>Sales closes in: <span className="font-semibold">{ daysLeft }days</span></p> ) }
            { product.opening_date && daysLeft === 0 && ( <p className='my-2 text-danger text-small font-semibold'>Sales closesd</p>)}
          </Link>
        </div>
        <div className="w-full flex justify-center my-2 item-center">
          <Button size="sm" color='primary' onClick={addItemToCart} isDisabled={daysLeft ===0}>
            <FaCartShopping />
            <span>Add to Cart</span>
          </Button>
        </div>
      </CardFooter>
        
      <div role='button' className={wishlist.inWishlist?"absolute z-10 flex justify-center items-center bg-primary text-white right-5 top-5 rounded-full p-2 w-12 h-12 md:p-2":"absolute z-10 flex justify-center items-center bg-white text-primary right-5 top-5 rounded-full p-2 w-12 h-12 md:p-2"} onClick={wishlist.inWishlist?()=>removeFromWishlist(product.id):()=>addToWishlist(product.id)}>
        <BsHeart size={24}/>
      </div>
      { product.discount_amount ? (
        <div className="absolute z-10 flex justify-center items-center left-2 bg-danger-400 text-neutral-100 top-2 rounded-lg p-2 md:p-2">
          <p className="text-[10px]">- {product.discount_type.toLowerCase() === "flat" ? `₦${product.discount_amount}` : `${product.discount_amount}%`}</p>
        </div>
      ) : null }
      <AddToCartModal isOpen={ isOpen } onOpenChange={onOpenChange} product={product}/>
    </Card>
  )
}

export default ProductCard