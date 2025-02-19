/* eslint-disable react/prop-types */
import { PRODUCT } from "@/constant";
import useCartContext from "@/hooks/useCartContext";
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter,ModalHeader, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { BsDash, BsPlus } from "react-icons/bs";


const AddToCartModal = ( { isOpen = false, onOpenChange = () => { }, product = PRODUCT } ) =>
{
  const { addToCart,carts,handleDecrement,handleIncrement,loading } = useCartContext();
  const [ suplementryProducts, setSuplementryProducts ] = useState( [] );

  const addSuplementryProduct = ( sup ) =>
  {
    console.log(sup);
    setSuplementryProducts( ( prevProducts ) => [ ...prevProducts, {
      ...sup,total:sup.price,quantity:1
    }])
  }

  const increaseSup = (id) =>
  {
    const temSup = [...suplementryProducts]
    const product = temSup.find( item => item.id === id );
    const index = temSup.findIndex( item => item.id === id );
    product.quantity++
    product.price = product.total * product.quantity;
    temSup[ index ] = product;
    setSuplementryProducts(temSup)
  }

  const decreseSup = (id) =>
  {
    console.log(id);
    const temSup = [...suplementryProducts]
    const product = temSup.find( item => item.id === id );
    const index = temSup.findIndex( item => item.id === id );

    product.quantity--
    if ( product.quantity === 0 ) {
      const newSup = temSup.filter( item => item.id !== product.id )
      setSuplementryProducts( newSup );
    } else {
      product.price = product.total * product.quantity;
      temSup[ index ] = product;
      setSuplementryProducts(temSup)
    }

    console.log( product );
    console.log(temSup);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
      <ModalContent>
        { (onClose) => (
          <>
            <ModalHeader>
              Add {product.name} to cart
            </ModalHeader>
            <ModalBody>
              {product.variation.map(variattion => {
                const isVariantInCart = carts.find(item =>
                  item.productId === product.id && item.variation?.variant === variattion.variant
                );

                return (
                  <div key={product.variation.indexOf(variattion) + 1} className="flex justify-between items-center">
                    <div className="">
                      <div className="text-sm flex items-center space-x-2 capitalize">
                        <p className="text-gray-600">{variattion.type}:</p>
                        <div className="h-6 w-6 rounded-md" style={variattion.type === "color" ? { backgroundColor: variattion.variant } : {}}>
                          {variattion.type !== "color" ? variattion.variant : null}
                        </div>
                      </div>
                      <p className="text-tiny">
                        <span className="font-bold">Available:</span> {variattion.quantity} {product.unit} left
                      </p>
                      <p className="text-tiny">
                        <span className="font-bold">Price:</span> ₦{variattion.price}
                      </p>
                    </div>

                    {isVariantInCart ? (
                      <div className="flex items-center space-x-4">
                        <Button
                          size="sm"
                          color="default"
                          onClick={() => handleDecrement({ id: isVariantInCart.id || product.id, variant: variattion.variant })}
                        >
                          <BsDash />
                        </Button>
                        {loading?(<Spinner size="sm"/>) :( <p>{isVariantInCart.quantity}</p>)}
                        <Button
                          size="sm"
                          color="default"
                          onClick={() => handleIncrement({ id: isVariantInCart.id || product.id, variant: variattion.variant })}
                        >
                          <BsPlus />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <Button
                          size="sm"
                          color="default"
                          onClick={() => addToCart({ id: product.id, name: product.name, variation: variattion, suplementryProducts,discount_type:product.discount_type,discount_amount:product.discount_amount }, variattion, suplementryProducts,setSuplementryProducts)}
                        >
                          <BsPlus />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
              { product.suplementryProducts.length > 0 && (
                <div>
                  <p className="text-medium font-bold">Supplementry Items:</p>
                  <div className="grid grid-cols-2 gap-4 overflow-x-auto">
                    
                    {product.suplementryProducts.map( product => (
                      <div key={ product.id } className={"border shadow-md rounded-md px-2 col-span-1"} role="button" >
                        <Image src={ product.dp } className="w-full h-24 object-contain" />
                        <p className="font-bold">{ product.name }</p>
                        
                        { suplementryProducts.some( item=>item.id === product.id ) ? (
                          <div className=" my-2 flex items-center justify-between">
                            <Button size="sm" className="mx-auto" onClick={()=>decreseSup(product.id)}>
                              <BsDash />
                            </Button>
                            
                            <p className="text-tiny font-bold">{ suplementryProducts.find(item=>item.id === product.id)?.quantity }</p>
                            <Button size="sm" className="mx-auto" onClick={()=>increaseSup(product.id)}>
                              <BsPlus />
                            </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <Button size="sm" className="mx-auto my-2" onClick={()=>addSuplementryProduct(product)}>
                                <BsPlus />
                              </Button>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter >
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AddToCartModal