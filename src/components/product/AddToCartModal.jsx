/* eslint-disable react/prop-types */
import { PRODUCT } from "@/constant";
import useCartContext from "@/hooks/useCartContext";
import { dev_url } from "@/utils/axios";
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter,ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { /* BsDash, */ BsPlus } from "react-icons/bs";


const AddToCartModal = ( { isOpen = false, onOpenChange = () => { }, item = PRODUCT } ) =>
{
  const { addToCart } = useCartContext();
  const [ suplementryProducts, setSuplementryProducts ] = useState( [] );

  const addSuplementryProduct = ( sup ) =>
  {
    setSuplementryProducts(prev=>[...prev,sup])
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
      <ModalContent>
        { (onClose) => (
          <>
            <ModalHeader>
              Add {item.name} to cart
            </ModalHeader>
            <ModalBody>
              { item.variation.map( variattion => (
                <div key={item.variation.indexOf(variattion)+1} className="flex justify-between items-center">
                  <div className="">
                    <div className="text-sm flex items-center space-x-2 capitalize">
                      <p className="text-gray-600">{ variattion.type }:</p>
                      <div className="h-6 w-6 rounded-md" style={ variattion.type === "color" ? { backgroundColor: variattion.variant } : {} }>
                        {variattion.type!== "color" ? variattion.variant : null}
                      </div>
                    </div>
                    <p className="text-tiny"><span className="font-bold">Available:</span> { variattion.quantity } { item.unit } left</p>
                    <p className="text-tiny"><span className="font-bold">Price:</span> ₦{ variattion.price }</p>
                  </div>
                  <div className="flex items-center space-x-4">{/* 
                    <Button size="sm" color="default" onClick={ () => console.log( "Decreased" ) }>
                      <BsDash/>
                    </Button>
                    <p>4</p> */}
                    <Button size="sm" color="default" onClick={ () => addToCart({id:item.id,name:item.name,variation:variattion,suplementryProducts},variattion,suplementryProducts) }>
                      <BsPlus/>
                    </Button>
                  </div>
                </div>
              ) ) }
              { item.suplementryProducts.length > 0 && (
                <div>
                  <p className="text-medium font-bold">Supplementry Items:</p>
                  <div className="flex gap-4 overflow-x-auto">
                    
                    {item.suplementryProducts.map( product => (
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