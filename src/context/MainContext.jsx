/* eslint-disable react/prop-types */
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { EMAIL_REGEX, PWD_REGEX } from "@/constant";
import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


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
    address: "",
    isVerified: false,
    accessToken:"",
    createdAt:"",
    updatedAt:""
  },
  setUser: () => { },
  registerSubmit: async () => { },
  timeInSec: 0,
  resendOtp: async () => { },
  verifyCode:async()=>{},
  categories: [],
  wishlists: [],
  addToWishlist: async()=>{}
} )

export const MainProvider = ( { children } ) =>
{
  const navigate = useNavigate();
  const location = useLocation();
  const {loading,fetchData} = useAxiosFetch()
  const from = location.state?.from?.pathname || "/"
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
  const [ carts, setCarts ] = useState( JSON.parse( localStorage.getItem( "carts" ) ) || [] );
  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
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
      console.log(res.data.user);
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

  const openToast = (message="",status="default") =>
  {
    
    setToastMsg( message ),
    setStatus( status );
    setShow( true )
  }

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
  const addToWishlist = async (id="") =>
  {
    if ( !user.id ) {
      const isExist = wishlists.some( item => item === id )
      if ( !isExist ) {
        const newList = [ ...wishlists, id ];
        setWishlists( newList );
        localStorage.setItem( "wishlists", JSON.stringify( newList ) );
        openToast( "Added to favorite", "success" );
      } else {
        openToast( "Already in favorite","info" );
      }
    } else {
      const local = JSON.parse( localStorage.getItem( 'wishlists' ) ) || [];
      if ( local.length !== 0 ) {
        const exist = local.some( item => item === id )
        if ( !exist ) {
          const newList = [ ...local, id ];
          try {
            const res = await fetchData( true, '/wishlist/add', "POST", { wishlist: newList } )
            openToast( res.message, "success" );
            setWishlists( res.data.products );
          } catch ( error ) {
            console.error(error);
            openToast("Error Occured","error")
          }
        } else {
          try{
          const res = await fetchData( true, '/wishlist/add', "POST", { wishlist: local } )
            openToast( res.message, "success" );
            setWishlists( res.data.products );
          } catch ( error ) {
            console.error(error);
            openToast("Error Occured","error")
          }
        }
      } else {
        const res = await fetchData( true, '/wishlist', "POST", {product_id:id} )
        openToast( res.message, "success" );
        setWishlists( res.data.products );
      }
    }
  }


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
    <MainContext.Provider value={ {formData,persist,setPersist,handleChange,isLoading,show,status,toastMsg,openToast,closeToast,loginSubmit,user,setUser,registerSubmit,resendOtp,verifyCode,timeInSec,categories} }>
      {children}
    </MainContext.Provider>
  )
}

export default MainContext