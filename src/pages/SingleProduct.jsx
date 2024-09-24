import { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination,Autoplay } from 'swiper/modules';
import { Button, Image, Spinner } from "@nextui-org/react";
import { dev_url } from "@/utils/axios";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import { FaCartShopping } from "react-icons/fa6";


const SingleProduct = () =>
{
  const { id } = useParams();
  const [ loading, setLoading ] = useState( true );
  const [product, setProduct] = useState({} );
  const [ carouselImg, setCarouselImg ] = useState( [] );
  const {fetchData} = useAxiosFetch()

  useState( () =>
  {
    ( async() =>
    {
      try {
        const res = await fetchData( false, `/product/${ id }` );
        setProduct( res.data.product );
        setCarouselImg( [ res.data.product.dp, ...res.data.product.images ] );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    })()
  }, [] )
  
  console.log(product);
  return (
    loading ? <div className="h-full flex justify-center items-center">
      <Spinner/>
    </div> : (
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
            <Image src={`${dev_url}/${img.replace("public/","")}` } className="mx-auto object-cover  w-full"/>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pt-4">
        <hr />
            <div className="flex">
              <p className="text-2xl font-bold capitalize">{ product.name } <span className="text-tiny text-primary lowercase">{ product.quantity } units available</span></p>
        </div>
            <div className="my-2">
              <p className='text-primary font-bold text-medium'>Price:
          <span className={ product.discount_amount ? "line-through text-italic me-1 text-tiny font-thin text-danger" : "" }>&#8358;{ product.price }</span>
          <span className={!product.discount_amount ? "hidden" : "inline-block"}>{ product.discount_type.toLowerCase() === "flat" ? `₦${product.price - product.discount_amount}`: `₦${(product.discount_amount*product.price)/100}` }</span>
            </p>
            <p className="text-lg font-bold uppercase underline underline-offset-2 my-4">Description</p>
            <p>{ product.description }</p>
            { product.slug.map( item => (
              <span className="text-thin text-tiny border p-1 rounded-lg bg-primary-600 text-white italic me-1" key={ product.slug.indexOf( item ) }>#{ item }</span>
            ))}
            <p className="text-lg font-bold uppercase underline underline-offset-2 my-4">Available colors</p>
            <div className="flex space-x-4">
              { product.color.map( item => (
                <div className={`h-8 w-8 rounded-md`} role="button" style={{ backgroundColor:item }} key={ product.color.indexOf( item ) }/>
            ))}
            </div>
            <p className="text-lg font-bold uppercase underline underline-offset-2 my-4">Available sizes</p>
            <div className="flex space-x-4">
              { product.size.map( item => (
                <div className={ `h-8 w-8 rounded-md border` } role="button" key={ product.color.indexOf( item ) }>
                  <p className="text-center uppercase font-bold">{ item }</p>
                </div>
            ))}
            </div>
        </div>
            <div className="flex items-center justify-center sticky -bottom-1">
              <Button color='primary' className="w-full md:w-1/2 lg:w-1/4">
                <FaCartShopping />
                <span>Add to Cart</span>
              </Button>
            </div>
          </div>
          
    </div>
    )
  )
}

export default SingleProduct