import { useEffect, useState } from "react";

import EmptyItem from "@/components/EmptyItem"
import useMainContext from "@/hooks/useMainContext";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import ProductCard from "@/components/product/ProductCard";
import { dev_url } from "@/utils/axios";
import { Button } from "@nextui-org/react";
import { FaTrashCan } from "react-icons/fa6";

const Wishlist = () =>
{
  const { wishlists,deleteAll } = useMainContext();
  const {fetchData} = useAxiosFetch()
  const [ wishlistItems, setWishlistItems ] = useState( [] )

  useEffect( () =>
  {
    const fetchAll = async () =>
    {
      const fetchDataWishlist = wishlists.map( async ( item ) =>
      {
        try {
          const res = await fetchData( false, `/product/${ item.product_id }`, "get" )
          const result = res.data.product;
          return {...item,product:result}
        } catch (error) {
          console.error(error);
        }
      } )
      const data = await Promise.all( fetchDataWishlist )
      setWishlistItems(data)
    }

    fetchAll()
  },[fetchData,wishlists])


  return (
    wishlists.length <= 0 ? (
      <EmptyItem message="Your wishlist is empty"/>
    ) : (
        <section className="h-full">
          <div className="flex items-center justify-between">
            <p className="text-lg md:text-xl text-primary py-2 font-extrabold">My Wishlist</p>
            <Button color="danger" onClick={deleteAll}><FaTrashCan/> Clear All</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            { wishlistItems.map( item => (
              <ProductCard key={item.id ? item.id : wishlistItems.indexOf(item)} product={item.product} dev_url={dev_url}/>
            ))}
          </div>
        </section>
    )
  )
}

export default Wishlist