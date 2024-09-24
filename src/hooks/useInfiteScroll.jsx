import { useState,useEffect,useCallback } from "react";
import useAxiosFetch from "./useAxiosFetch";
import { useInView } from 'react-intersection-observer';


const useInfiteScroll = ({url,category}) =>
{
  const { fetchData } = useAxiosFetch();
  const [products,setProducts] = useState([])
  const [skip, setSkip] = useState(0);
  const [ hasMore, setHasMore ] = useState( true )
  const [isLoading, setIsLoading] = useState(false);

  const loadProduct = useCallback(async () => {
    if ( !hasMore ) return;
    let baseUrl = `${ url }?skip=${ skip }`;
    if ( category ) {
      baseUrl+=`&category=${category.toLowerCase()}`
    }
    try {
      setIsLoading(true);
        const res = await fetchData(false, baseUrl)
        const fetched = res.data.products
        setProducts( prev => [...prev,...fetched]);
        setSkip(prev => prev + fetched.length)
        if (fetched.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error)
        setHasMore(false)
    }
    finally {
      setIsLoading(false)
    }
    },[ hasMore,fetchData,category,skip,url])

useEffect(() => {
    // Reset when category changes
    setProducts([]);
    setSkip(0);
    setHasMore(true);
  }, [category]);

  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce:false
  })
  
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadProduct();
    }
  },[loadProduct,inView,hasMore,isLoading])
  return {hasMore,products,ref}
}

export default useInfiteScroll