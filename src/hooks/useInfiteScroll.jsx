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
  const { ref, inView } = useInView({
    threshold: 1.0,
  } )
  
  const loadProduct = useCallback(async () => {
    if ( !hasMore || isLoading ) return;
    let baseUrl = `${ url }?skip=${ skip }`;
    if ( category ) {
      baseUrl+=`&category=${category}`
    }
    try {
      setIsLoading(true);
        const res = await fetchData(false, baseUrl,'get')
        const fetched = res.data.products
      setProducts( prev =>
      {
        const uniqueProducts = fetched.filter( newItem => !prev.some( item => item.id === newItem.id ) );
        return [...prev, ...uniqueProducts];
        });
        setSkip(prev => prev + fetched.length)
        if (fetched.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error)
        setHasMore(false)
    } finally {
      setIsLoading(false)
    }
    },[ hasMore,fetchData,category,skip,isLoading,url])

  useEffect(() => {
    // Reset when category changes
    setProducts([]);
    setSkip(0);
    setHasMore(true);
  }, [category]);


  
  useEffect( () =>
  {
    if ( inView && hasMore && !isLoading ) {
      loadProduct();
    }
  }, [ loadProduct, inView, hasMore, isLoading ] );

  useEffect( () =>
  {
    loadProduct()
  },[loadProduct])

  return {hasMore,products,ref,isLoading}
}

export default useInfiteScroll