/* eslint-disable react/prop-types */
import { PRODUCT } from "@/constant";
import useCartContext from "@/hooks/useCartContext";
import { dev_url } from "@/utils/axios";
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter,ModalHeader, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { /* BsDash, */ BsDash, BsPlus } from "react-icons/bs";


const AddToCartModal = ( { isOpen = false, onOpenChange = () => { }, product = PRODUCT } ) =>
{
  const { addToCart,carts,handleDecrement,handleIncrement,loading } = useCartContext();
  const [ suplementryProducts, setSuplementryProducts ] = useState( [] );

  const addSuplementryProduct = ( sup ) =>
  {
    setSuplementryProducts((prevProducts) => {
    const isExisting = prevProducts.find((item) => item.id === sup.id);

    if (isExisting) {
      // If product exists, remove it
      return prevProducts.filter((item) => item.id !== sup.id);
    } else {
      // If product does not exist, add it
      return [...prevProducts, sup];
    }
  });
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
                          onClick={() => addToCart({ id: product.id, name: product.name, variation: variattion, suplementryProducts,discount_type:product.discount_type,discount_amount:product.discount_amount }, variattion, suplementryProducts)}
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
                  <div className="flex gap-4 overflow-x-auto">
                    
                    {product.suplementryProducts.map( product => (
                      <div key={ product.id } className={suplementryProducts.includes(product) ? "border shadow-md rounded-md border-primary":"border shadow-md rounded-md"} role="button" onClick={()=>addSuplementryProduct(product)}>
                        <Image src={ `${ dev_url }/${ product.dp.replace( "public/", "" ) }` } className="w-32 h-24 object-contain"/>
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