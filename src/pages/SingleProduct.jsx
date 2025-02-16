import { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination,Autoplay } from 'swiper/modules';
import { Button, Image, Spinner, useDisclosure } from "@nextui-org/react";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import { FaCartShopping } from "react-icons/fa6";
import EmptyItem from "@/components/EmptyItem";
import useMainContext from "@/hooks/useMainContext";
import AddToCartModal from "@/components/product/AddToCartModal";
import { PRODUCT } from "@/constant";
import useCartContext from "@/hooks/useCartContext";
import { daysLeftToExpire } from "@/utils/functions";


const SingleProduct = () =>
{
  const { id } = useParams();
  const [ loading, setLoading ] = useState( true );
  const [ product, setProduct ] = useState( PRODUCT );
  const [ carouselImg, setCarouselImg ] = useState( [] );
  const [ color, setColor ] = useState( [ { price: "", quantity: "", type: "", variant: "" } ] );
  const [ size, setSize ] = useState( [ { price: "", quantity: "", type: "", variant: "" } ] );
  const [ others, setOthers ] = useState( [ { price: "", quantity: "", type: "", variant: "" } ] );
  const {fetchData} = useAxiosFetch()
  const { openToast } = useMainContext();
  const {addToCart} = useCartContext()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [daysLeft,setDayLeft] = useState(0)
  
  const getVariation = ( type = "",variation =[{ price: "", quantity: "", type: "", variant: "" }],setState ) =>
  {
    const variant = variation.filter( item => item.type.toLowerCase() === type.toLowerCase() )
    setState(variant)
  }

  const addItemToCart = () =>
  {
    if ( product.variation.length > 0 ) {
      onOpen()
    } else {
      addToCart( product, null, null )
      openToast("Item added to cart","success")
    }
  }

  useState( () =>
  {
    ( async() =>
    {
      try {
        const res = await fetchData( false, `/product/${ id }` );
        const daysLeft = daysLeftToExpire( res.data.product.opening_date, res.data.product.available_till );
        setDayLeft(daysLeft)
        setProduct( res.data.product );
        getVariation( "color", res.data.product.variation,setColor ) ;
        getVariation( "size", res.data.product.variation,setSize ) ;
        getVariation( "others", res.data.product.variation,setOthers ) ;
        setCarouselImg( [ res.data.product.dp, ...res.data.product.images ] );
      } catch (error) {
        if ( error.message === "Product not found" ) {
          setProduct( null )
          setCarouselImg( [] );
          openToast("Product does not exist", "error")
        }
        setProduct( null )
        setCarouselImg( [] )
        openToast("Error fetching product", "error")
      } finally {
        setLoading(false)
      }
    })()
  }, [] )
  return (
    <section className="h-full overflow-y-auto">
      {loading && !product && (<div className="h-full flex justify-center items-center">
        <Spinner/>
      </div> ) }
      { !loading && !product && (
        <EmptyItem message="Product not found !!"/>
      )}
      { !loading && product && (
        <div className="relative">
      <Swiper
        effect="coverflow"
        grabCursor={ true }
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        } }
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper border rounded-lg shadow-md scroll-container1 swiper1"
        autoplay={ { delay: 2500, disableOnInteraction: false } }
      >
        { carouselImg.map( img => (
          <SwiperSlide key={ carouselImg.indexOf( img ) + 1 } className="h-36 swiper-slide1">
            <Image src={img} className="mx-auto object-cover  w-full"/>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pt-4">
        <hr />
            <div className="flex">
              <p className="text-2xl font-bold capitalize">{ product.name } <span className="text-tiny text-primary lowercase">{ product.quantity } {product.unit} available</span></p>
        </div>
            <div className="my-2">
              <div className="flex items-center justify-between">
                <p className='text-primary font-bold text-medium'>Price:
          <span className={ product.discount_amount ? "line-through text-italic me-1 text-tiny font-thin text-danger" : "" }>&#8358;{ product.price }</span>
          <span className={!product.discount_amount ? "hidden" : "inline-block"}>{ product.discount_type.toLowerCase() === "flat" ? `₦${product.price - product.discount_amount}`: `₦${product.price - ((product.discount_amount*product.price)/100)}` }</span>
                </p>
                { product.opening_date && daysLeft !== 0 && ( <p className='my-2 text-small'>Sales closes in: <span className="font-semibold">{ daysLeft }days</span></p> ) }
            { product.opening_date && daysLeft === 0 && ( <p className='my-2 text-danger text-small font-semibold'>Sales closesd</p>)}
              </div>
            <p className="text-lg font-bold uppercase underline underline-offset-2 my-4">Description</p>
            <p>{ product.description }</p>
            { product.slug.map( item => (
              <span className="text-thin text-tiny border p-1 rounded-lg bg-primary-600 text-white italic me-1" key={ product.slug.indexOf( item ) }>#{ item }</span>
            ))}
            { color.length > 0 && (
              <div>
                <p className="text-lg font-bold uppercase underline underline-offset-2 my-4">Available colors</p>
                <div className="flex space-x-4">
                    { color.map( item => (
                    <div className={`h-8 w-8 rounded-md`} role="button" style={{ backgroundColor:item.variant }} key={ color.indexOf( item ) }/>
                  ))}
                </div>
              </div>
              ) }
              { size.length > 0 && (
              <div>
                <p className="text-lg font-bold uppercase underline underline-offset-2 my-4">Available Sizes</p>
                <div className="flex space-x-4">
                    { size.map( item => (
                    <div className={ `h-8 w-8 rounded-md border` } role="button" key={ size.indexOf( item ) }>
                  <p className="text-center uppercase font-bold">{ item.variant }</p>
                </div>
                  ))}
                </div>
              </div>
              ) }
              
              { others.length > 0 && (
              <div>
                <p className="text-lg font-bold uppercase underline underline-offset-2 my-4">Available Variations</p>
                <div className="flex space-x-4">
                    { others.map( item => (
                    <div className={ `h-8 w-8 rounded-md border` } role="button" key={ others.indexOf( item ) }>
                  <p className="text-center uppercase font-bold">{ item.variant }</p>
                </div>
                  ))}
                </div>
              </div>
              ) }
              { product.suplementryProducts.length > 0 && (
                <div>
                  <p className="text-lg font-bold uppercase underline underline-offset-2 my-4">Suplementry Products</p>
                  <div className="grid grid-cols-4 md:grid-cols-10 gap-4">
                    { product.suplementryProducts.map( item => (
                      <div key={ item.id } className="col-span-2 border rounded-2xl p-2 shadow">
                        <Image src={item.dp } className=" w-40 h-24 object-contain border mb-4" />
                        <p className="capitalize text-small font-semibold">{ item.name }</p>
                        <p className="text-tiny my-2">Price: ₦{ item.price }</p>
                        <p className="text-tiny">Quantity: { item.quantity }</p>
                    </div>
                  ))}
                  </div>
                </div>
              ) }
              <AddToCartModal isOpen={ isOpen } onOpenChange={onOpenChange} product={product}/>
        </div>
            <div className="flex items-center justify-center sticky -bottom-1 z-10">
              <Button color='primary' className="w-full md:w-1/2 lg:w-1/4" onClick={addItemToCart} isDisabled={daysLeft ===0}>
                <FaCartShopping />
                <span>Add to Cart</span>
              </Button>
            </div>
          </div>
          
    </div>
      ) }
      
    </section>
  )
}

export default SingleProduct