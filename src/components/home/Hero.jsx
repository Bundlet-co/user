/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Autoplay} from 'swiper/modules'
import { useEffect, useState } from 'react';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { Button, Image } from '@nextui-org/react';
import { dev_url } from '@/utils/axios';
import { BsStarFill } from 'react-icons/bs';

//&#8358;
const Item = ({carousel,phrase,buyWords}) =>
{
  return (
    <div className="border rounded-lg flex items-center p-4 bg-gradient-to-br from-primary-300 to-orange-400 text-white relative">
      <Image
        radius='lg'
        alt={carousel.name}
        src={`${dev_url}/${carousel.dp.replace('public/','')}`}
        className='object-cover w-[10rem] h-[10rem] relative z-0'
      />
      <div className='text-center flex-1 z-10'>
        <p className="text-small">{phrase } on</p>
        <p className="text-2xl mb-3 capitalize">{ carousel.name }</p>
        <div className="flex items-center space-x-3 justify-center flex-col">
          <p className="line-through text-danger text-small">₦{ carousel.price }</p>
          <p className="tex-2xl font-mono font-bold">now</p>
          <p className="text-4xl uppercase font-bold ">{ carousel.discount_type.toLowerCase() === "flat" ? `₦${carousel.price - carousel.discount_amount}`: `₦${(carousel.discount_amount*carousel.price)/100}` }</p>
        </div>
      </div>
      <div className="absolute bottom-56 flex justify-center items-center flex-col right-1  rotate-[30deg]">
        <div className="relative">
          <BsStarFill size={ 80 } className='text-danger'/>
          <div className="absolute flex justify-center items-center  top-9 left-2 w-16">
            <p className='text-primary-50 text-[8px] font-bold'>{carousel.discount_type.toLowerCase() === "flat" ? `₦${carousel.discount_amount} off` : `${carousel.discount_amount}% off`}</p>
          </div>
          <Button color='primary' size='sm'>{buyWords}</Button>
        </div>
      </div>
    </div>
  )
}

const Hero = () => {
  const [ carousel, setCarousel ] = useState( [] )
  const { fetchData } = useAxiosFetch()
  const [randomPhrase,setRandomPhrase] = useState("Exclusive deals")
  const [buyText,setBuyText]= useState("Buy now")
  const details = ["Exclusive Offer"," Specials Offer", "Discount sales", "Limited offer"];
  
  const getRoandom = ( arr,setState ) =>
  {
    const randomIndex = Math.floor( Math.random() * arr.length );
    setState( arr[randomIndex] )
  }

  useEffect( () =>
  {
    const buy = [ "Buy now", "Claim offer", "Get now" ];
    getRoandom(buy,setBuyText)
  },[randomPhrase])



  useEffect( () =>
  {
    const getData = async () =>
    {
      const res = await fetchData( false, '/product/carousel' )
      setCarousel(res.data.products)
    }
    getData()
  },[fetchData])
  return (
    <div>
      <Swiper spaceBetween={ 30 } centeredSlides={ true } autoplay={ { delay: 2500, disableOnInteraction: false } } modules={ [ Autoplay ] } className='mySwiper' onSlideChange={()=>getRoandom(details,setRandomPhrase)}>
        { carousel.map( item => (
          <SwiperSlide key={item.id}>
            <Item carousel={item} phrase={randomPhrase} buyWords={buyText}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Hero