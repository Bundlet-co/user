/* eslint-disable react/prop-types */
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { EMAIL_REGEX, PWD_REGEX } from "@/constant";
import { createContext, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { generateRefrence } from '@/utils/functions';


const MainContext = createContext( {
  formData: {
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    code:""
  },
  persist: JSON.parse( localStorage.getItem( "persist" ) ) || false ,
  setPersist: () => { },
  handleChange: () => { },
  isLoading: false,
  show: false,
  status: "",
  message: "",
  openToast: () => { },
  closeToast: () => { },
  loginSubmit: async () => { },
  user: {
    id:"",
    name: "",
    email: "",
    phone_number: "",
    address: {
    country: "",
    state:"",city:"",location:""
  },
    isVerified: false,
    accessToken:"",
    createdAt:"",
    updatedAt: "",
    balance:0
  },
  setUser: () => { },
  registerSubmit: async () => { },
  timeInSec: 0,
  resendOtp: async () => { },
  verifyCode:async()=>{},
  categories: [],
  wishlists: [],
  // eslint-disable-next-line no-unused-vars
  addToWishlist: async ( id = "" ) => { },
  // eslint-disable-next-line no-unused-vars
  removeFromWishlist: async ( id = "" ) => { },
  deleteAll:()=>{},
} )

export const MainProvider = ( { children } ) =>
{
  const navigate = useNavigate();
  const location = useLocation();
  const {loading,fetchData} = useAxiosFetch()
  const from = location.state?.from?.pathname || "/";
  //Toast States
  const [ show, setShow ] = useState( false )
  const [ toastMsg, setToastMsg ] = useState( "" )
  const [ status, setStatus ] = useState( "" )
  const [ formData, setFormData ] = useState( {
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: ""
  } );
  const [ persist, setPersist ] = useState( JSON.parse( localStorage.getItem( "persist" ) ) || false );
  const [isLoading,setIsLoading] = useState(false)
  const [ user, setUser ] = useState( {} );
  const [timeInSec,setTimeInSec] = useState(0)
  const [ categories, setCategories ] = useState( [] )
  const [ wishlists, setWishlists ] = useState( JSON.parse(localStorage.getItem('wishlists')) || [] );
  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  const handlePayment = (amount,onclose) =>
  {
    const paymentOption = {
      email: user.email,
      firstname: user.name,
      lastname: user.name,
      phoneNumber: `+234${user.phone_number}`,
      fixedAmount: parseFloat( amount )
    }
    const merchantRef = generateRefrence();
    const merchantKey = "39494920422440494939";
    if (typeof window.initializePepsaPay === 'undefined') {
      console.error('PepsaPay script not loaded');
      return;
    }

    const handler = window.initializePepsaPay(
      paymentOption,
      merchantRef,
      merchantKey,
      function onClose( response )
      {
        if ( response.error ) {
          console.error( "Onclose error:", response.error );
          openToast("Error occured","error")
        } else {
          console.log("Onclose Data", response);
        }
        onclose();
      },
      async function callback( response )
      {
        if (response.error) {
          console.error("ONSUCCESS ERROR:", response.error);
          openToast("Error occured","error")
        } else {
          console.log("ONSUCCESS DATA:", response.data);
          const respond = await fetchData( true, `/profile?amount=${ amount }` )
          setUser( prev => ( { ...prev, balance: respond.data.user.balance } ) );
          openToast( "Balance updated", "success" );
        }
        onclose();
      }
    )

    handler();
  }

  const loginSubmit = async () =>
  {
    try {
      setIsLoading(true)
      const res = await fetchData( false, "/auth/login", "POST", formData, {
        header: {
          "Content-Type":"application/json"
        }
      } )
      setUser( res.data.user );
      setToastMsg(res.message)
      openToast( res.message, "success" );
      navigate( from );
      setFormData( {
        name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: ""
      })
    } catch (e) {
      console.error( e );
      openToast(e.message,"error")
    }finally{
      setIsLoading(loading)
    }
  }

  const registerSubmit = async () =>
  {
    const v1 = EMAIL_REGEX.test( formData.email );
    const v2 = PWD_REGEX.test( formData.password );
    if (!v1) {
      openToast( 'Enter a valid email',"error");
      return;
    }

    if (!v2) {
      openToast( 'Password must be 8 to 24 characters long which must include 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',"error");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      openToast('Password does not match ',"error");
      return;
    }
    try {
      setIsLoading(true)
      const res = await fetchData( false, "/auth/register", "POST", formData, {
        header: {
          "Content-Type":"application/json"
        }
      } )
      setFormData({
        ...formData,
        name: "",
        email: res.data.email,
        phone_number: "",
        confirm_password: ""
      })
      setToastMsg(res.message)
      openToast( res.message, "success" );
      setTimeInSec(5*60)
      navigate('/verify')
    } catch (e) {
      openToast(e.message,"error")
    }finally{
      setIsLoading(loading)
    }
  }

const closeToast = () =>
  {
    setShow( false )
    setToastMsg( "" )
    setStatus("")
  }

  const openToast = useCallback((message="",status="default") =>
  {
    
    setToastMsg( message ),
    setStatus( status );
    setShow( true )
  },[])

  const resendOtp = async () =>
  {
    try {
      setIsLoading( true );
      setTimeInSec( 60 * 5 );
      const res = await fetchData( false, `/verify/${ formData.email }`, "GET" );
      setToastMsg(res.message)
      openToast( res.message, "success" );
    }catch (e) {
      openToast(e.message,"error")
    }finally{
      setIsLoading(loading)
    }
  }

  const verifyCode = async () =>
  {
    try {
      setIsLoading( true );
      const res = await fetchData( false, "/verify", "POST", { email: formData.email, code: formData.code } );
      setToastMsg( res.message )
      openToast( res.message, "success" )
      await loginSubmit()
    } catch (e) {
      openToast(e.message,"error")
    }finally{
      setIsLoading(loading)
    }
  }


  //Wishlist functionallity
  const addToWishlist = async (product_id="") =>
  {
    if ( !user.accessToken ) {
      const isExist = wishlists.some( item => item.product_id === product_id )
      if ( !isExist ) {
        const newList = [ ...wishlists, { product_id, inWishlist:true} ];
        setWishlists( newList );
        localStorage.setItem( "wishlists", JSON.stringify( newList ) );
        openToast( "Item added to Favorite", "success" );
      } else {
        openToast( "Already in favorite","info" );
      }
    } else {
      if ( wishlists.length > 0 && localStorage.getItem( "wishlists" ) !== null ) {
        await fetchData( true, '/wishlist/add', "post", { wishlist: [ ...wishlists, {product_id ,inWishlist:true}] } );
        setWishlists( [...wishlists,{product_id,inWishlist:true}] )
        openToast( "Item added to Favorite", "success" );
        localStorage.removeItem("wishlists")
      } else {
        const res = await fetchData( true, '/wishlist',"post", { product_id } )
        setWishlists( [ ...wishlists, { ...res.data.wishlist, inWishlist: true } ] );
        openToast( "Item added to Favorite", "success" );
      }
    }
  }

  const removeFromWishlist = async (product_id="") =>
  {
    if ( !user.accessToken ) {
      const isExist = wishlists.some( item => item.product_id === product_id )
      if ( !isExist ) {
        openToast( "Item not found in favourite", "success" );
      } else {
        const updated = wishlists.filter( item => item.product_id !== product_id );
        localStorage.setItem( "wishlists", JSON.stringify( updated ) );
        setWishlists( updated )
        openToast( "Item removed to Favorite", "success" );
      }
    } else {
      await fetchData( true, `/wishlist/${ product_id }`, "delete" );
      const updated = wishlists.filter( item => item.product_id !== product_id );
      setWishlists( updated )
      openToast( "Item removed to Favorite", "success" );
    }
  }


  const deleteAll = async () =>
  {
    if ( user && user.accessToken ) {
      await fetchData( true, '/wishlist', 'delete' )
      setWishlists([]);
    } else {
      localStorage.removeItem( "wishlists" );
      setWishlists( [] );

    }
  }


  useEffect( () =>
  {
    const getWishLists = async () =>
    {
      try {
        const res = await fetchData( true, '/wishlist', "get" );
        const result = res.data.products
        const tempList = [ ...wishlists ];

        result.forEach( ( item ) =>
        {
          const existingIndex = tempList.findIndex( itemList => item.product_id === itemList.product_id );
          if (existingIndex === -1) {
            // Only push if item does not already exist
            tempList.push({ ...item, inWishlist: true });
          }
        } )
        
        setWishlists(tempList)

      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    }
    if ( user?.accessToken ) getWishLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetchData,user])





  useEffect( () =>
  {
    if ( timeInSec <= 0 ) return setTimeInSec( 0 );
    const interval = setInterval( () =>
    {
      setTimeInSec(prev=>prev-1)
    }, 1000 )
    
    return ()=> clearInterval(interval)
  },[timeInSec])

  useEffect( () =>
  {
    (async () =>
    {
      const res = await fetchData( false, '/categories', "GET" );
      setCategories(res.data.category);
    } )()
  },[fetchData] )
  return (
    <MainContext.Provider value={ {formData,persist,setPersist,handleChange,isLoading,show,status,toastMsg,openToast,closeToast,loginSubmit,user,setUser,registerSubmit,resendOtp,verifyCode,timeInSec,categories,removeFromWishlist,addToWishlist,wishlists,deleteAll,handlePayment} }>
      {children}
    </MainContext.Provider>
  )
}

export default MainContext