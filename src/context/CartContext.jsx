/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CARTITEM, PRODUCT } from '@/constant';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import useMainContext from '@/hooks/useMainContext';
import { createContext, useCallback, useEffect, useState } from 'react'


const CartContext = createContext( {
  carts: [ CARTITEM ],
  cartSubTotal: 0,
  cartTotal: 0,
  cartTax: 0,
  count: 0,
  addToCart: async ( product = CARTITEM, selectedVariation, supplementaryProducts ) => { },
  handleIncrement: ( {id="",variant=''} ) => { },
  handleDecrement: ( {id="",variant=''} ) => { },
  deleteItem: ( {id="",variant=''} ) => { },
  deleteAll: ( id="" ) => { },
  setCarts:()=>{}
});



export const CartProvider = ( { children } ) =>
{
  const { user, openToast } = useMainContext();
  const {fetchData}= useAxiosFetch()
  const [ carts, setCarts ] = useState( () => {
    const storedCarts = localStorage.getItem( "carts" );
    console.log(storedCarts);
  return storedCarts ? [...JSON.parse(storedCarts)] : [];
});
  const [ cartSubTotal, setCartSubTotal ] = useState( 0 );
  const [ cartTotal, setCartTotal ] = useState( 0 );
  const [ cartTax, setCartTax ] = useState( 0 );
  const [ count, setCount ] = useState( 0 );


  const addToCart = async( product = PRODUCT, selectedVariation, supplementaryProducts ) =>
  {
    const itemPrice = parseFloat( selectedVariation.price );
    let totalCost = itemPrice
    let supplementaryCost
    if ( supplementaryProducts.length > 0 ) {
      supplementaryCost = supplementaryProducts.reduce(
      (sum, item) => sum + item.price,
      0
      );
      totalCost+=supplementaryCost
    }
    


    const cartItem = {
    id: null, // Server-generated for logged-in users, null for local storage
    productId: product.id,
    name: product.name,
    variation: {
      type: selectedVariation.type,
      variant: selectedVariation.variant,
      price: itemPrice,
      quantity: selectedVariation.quantity,
    },
    suplementryProducts: supplementaryProducts.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    quantity: 1,
    price:itemPrice,
    total:totalCost,
    };
    console.log(cartItem);
      const addItemToState = ( item=CARTITEM ) =>
    {
      const existItemIndex = carts.findIndex( ( cartItem ) => cartItem.productId === item.productId && item.variation.variant === cartItem.variation.variant );
      if ( existItemIndex > -1 ) {
        const updateCart = carts.map( ( cartItem, index ) => index === existItemIndex ? { ...cartItem, quantity: cartItem.quantity ++,total: cartItem.total+item.total } : cartItem );
        setCarts( updateCart );
      } else {
        setCarts([...carts,item])
      }
        setCount( carts.length || 0 )
        return item
    }

    if ( !user.accessToken ) {
      const data = addItemToState( cartItem );
      const newItem = [...carts,data]
      localStorage.setItem( "carts", JSON.stringify( newItem ) );
      openToast( "Item added to cart", "success" );
    } else {
      try {
      if ( carts.length > 0 && localStorage.getItem("carts") !== null ) {
        
          const res = await fetchData( true, '/cart/add', "post", { carts:[...carts,cartItem] } );
          setCount(res.data.carts.length)
          setCarts( res.data.carts );
          openToast( "Item added to cart", "success" );
          localStorage.removeItem("carts")
      } else {
        const res = await fetchData( true, "/cart", "post", { productId: product.id, quantity: cartItem.quantity, variation: cartItem.variation, supplementaryProducts, price: cartItem.price, total: cartItem.total } )
        const fetched = res.data.cart
        let tempCart = [ ...carts ]
        const index = tempCart.findIndex( item => item.productId === fetched.productId && item.variation.variant === fetched.variation.variant )
        if ( index === -1 ) return setCarts( [ ...carts, fetched ] )
        const item = tempCart[ index ]
        item.quantity = fetched.quantity;
        item.total = fetched.total;
        tempCart[index]= item
        setCarts( tempCart )
        openToast( "Item added to cart", "success" );
        setCount(1)
      }} catch (error) {
          console.error( error );
          openToast(error.message,"error")
        }
    }
  }

  const handleIncrement = async( {id,variant}  ) =>
  {
    let tempcart = [...carts]
    const index = !user.accessToken ? tempcart.findIndex( item => item.productId === id && item.variation.variant === variant ) : tempcart.findIndex( item => item.id === id && item.variation.variant === variant ); 
    if ( index === -1 ) return;
    const product = tempcart[ index ]
    product.quantity++;
    product.total = product.quantity * product.price
    tempcart[index] = product
    
    if (user && user.accessToken) {
      await updateCartItem( id, product.quantity, product.total );
      setCarts( tempcart )
      openToast("Item quantity updated in the cart", "success");
    } else {
      // Save updated cart in local storage
      localStorage.setItem( "carts", JSON.stringify( tempcart ) );
      setCarts( tempcart )
    }
}

  const handleDecrement =async ({id,variant}  ) =>
  {
    let tempcart = [...carts]
    const index = !user.accessToken ? tempcart.findIndex( item => item.productId === id && item.variation.variant === variant ) : tempcart.findIndex( item => item.id === id && item.variation.variant === variant ); 
    
    if ( index === -1 ) return;
    const product = {...tempcart[ index ]}
    product.quantity--;
    if ( product.quantity === 0 ) {
      await deleteItem({id,variant})
    } else {
      product.total = product.quantity * product.price;
      tempcart[index] = product;
      
      if (user && user.accessToken) {
        await updateCartItem( id, product.quantity, product.total );
        setCarts( tempcart )
        openToast("Item quantity updated in the cart", "success");
      } else {
        // Save updated cart in local storage
        localStorage.setItem( "carts", JSON.stringify( tempcart ) );
        setCarts( tempcart );
      }
    }
  }




  const updateCartItem = useCallback(async (cartItemId,newQuantity,newTotal) =>
  {
      try {
        await fetchData(true, "/cart", "patch", {
          id: cartItemId,
          quantity: newQuantity,
          total:newTotal
        });
        
      } catch (error) {
        console.error("Error updating cart item in database:", error);
        openToast("Failed to update quantity", "error");
      }
  },[fetchData,openToast])

  const deleteItem = async ( {id,variant} ) =>
  {
    if ( user && user.accessToken ) {
      try {
        await fetchData( true, `/cart/${ id }`, "delete" );
        const updateCart = carts.filter( item => item.id !== id );
        setCarts( updateCart )
        openToast("Item removed from cart", "success");
      } catch (error) {
        console.error("Error removing cart item:", error);
        openToast("Failed to remove item from cart", "error");
      }
    } else {
      const updatedCarts = carts.filter( item =>!(item.productId === id && item.variation.variant === variant) );
      console.log(updatedCarts);
      setCarts(updatedCarts);
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
      openToast("Item removed from cart", "success");
    }
  }


  const deleteAll = async () =>
  {
    if ( user && user.accessToken ) {
      await fetchData( true, '/cart', 'delete' )
      setCarts([]);
    } else {
      localStorage.removeItem( "carts" );
      setCarts( [] );

    }
  }

  useEffect( () =>
  {
    ( () =>
    {
      const subTotal = carts.reduce((acc, item) => acc + item.total, 0)
      const tempTax = subTotal * 0.05
      const tax = parseFloat( tempTax.toFixed( 2 ) );
      const total = subTotal + tax;
      setCartSubTotal(subTotal);
      setCartTax( tax );
      setCartTotal( total );
    })()
  }, [ carts ] )
  
  useEffect( () =>
  {
    const getCart = async () => {
    try {
      const res = await fetchData(true, `/cart`, "get");
      const results = await res.data.carts;

      // Clone the current cart to avoid mutating state directly
      const tempCart = [...carts];

      results.forEach((itemCart) => {
        // Find if the item already exists in the cart based on productId and variant
        const existingItemIndex = tempCart.findIndex(
          (item) => item.productId === itemCart.productId && item.variation.variant === itemCart.variation.variant
        );

        if (existingItemIndex !== -1) {
          // Item exists, so increase the quantity and update the total
          const existingItem = tempCart[existingItemIndex];
          existingItem.quantity += itemCart.quantity;
          existingItem.total = existingItem.quantity * existingItem.price;

          // Update the cart item in the database
          updateCartItem(existingItem.id, existingItem.quantity, existingItem.total);
        } else {
          // Item does not exist in local cart, add it as new
          
          tempCart.push(itemCart);
        }
      });

      // Update the state with the modified cart
      setCarts(tempCart);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Fetch the cart if the user is logged in
  if (user?.accessToken) getCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetchData,updateCartItem,user])

  return (
    <CartContext.Provider value={ {count,carts,cartSubTotal,cartTax,cartTotal,addToCart,handleDecrement,handleIncrement,deleteAll,deleteItem} }>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext;