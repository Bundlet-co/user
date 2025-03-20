import useAxiosFetch from "@/hooks/useAxiosFetch";
import { dev_url } from "@/utils/axios";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const SingleOrder = () =>
{
  const { id } = useParams();
  const [ order, setOrder ] = useState( null );
  const [ vat, setVat ] = useState( 0 )
  const [ charge, setCharge ] = useState( 0 )
  const [subTotal, setSubTotal] = useState(0)
  const {fetchData,loading} = useAxiosFetch()
  
  useEffect( () =>
  {
    ( async () =>
    {
      try {
        const res = await fetchData( true, `/order/${ id }` );
        const result = res.data;
        const chargeCal = 200 * result.orders.products.length;
        const subtotatCal = result.orders.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        // Calculate supplementary product price
        const supPrice = result.orders.products.reduce((acc, product) => {
          if (product.supplementryProducts) {
            return acc + product.supplementryProducts.reduce((sum, item) => sum + item.price, 0);
          }
          return acc;
        }, 0);

        const total = subtotatCal + supPrice;
        const vatCal = total * 0.075;

        setSubTotal(total);
        setVat(vatCal);
        setCharge(chargeCal);
        setOrder(result.orders);

      } catch (error) {
        console.error(error);
      }
    })()
  },[id,fetchData])


  return (
    <section className="h-full">
      { loading && !order && (
        <div className="h-full flex item-center justify-center">
          <Spinner size="sm"/>
        </div>
      ) }
      { !loading && !order && (
        <div className="h-full flex item-center justify-center">
          <p className="text-neutral-500">An error occured</p>
        </div>
      ) }
      { !loading && order && (
        <div className="h-full overflow-y-auto">
          <p className="text-primary text-sm mb-2">Order Id: { order.id }</p>
          <div className="flex items-center justify-between">
            <p className={ order.status === "PENDING" ? "text-medium text-warning" : order.status === "DELIVERED" ? "text-medium text-success" : order.status === "CANCELLED" ? "text-medium text-danger" : "text-medium text-primary" }><span className="capitalize font-bold text-black">Status:</span> { order.status }</p>
            <div>
              <p className="text-medium"><span className="capitalize font-bold">Subtotal:</span> &#8358; { subTotal.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</p>
              <p className="text-medium"><span className="capitalize font-bold">VAT:</span> &#8358; { vat.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</p>
              <p className="text-medium"><span className="capitalize font-bold">Charges:</span> &#8358; { charge.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</p>
              <p className="text-medium"><span className="capitalize font-bold">Net Amount:</span> &#8358; { parseFloat(order.netAmount).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                { order.products.map( item => (
                  <div key={ item.id } className="border p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <img src={`${dev_url}/${item.product.dp.replace("public/","")}`} alt={ item.product.name } className="w-10 h-10 object-contain" />
                        <p className="font-bold">{ item.product.name }</p>
                      </div>
                      <p className="font-bold">&#8358;{ item.price.toLocaleString( "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</p>
                      
                    </div>
                    <div>
                      <p>Quantity: { item.quantity }</p>
                      <p>Total cost: &#8358; {( item.price*item.quantity).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</p>
                      <div className="flex space-x-2 items-center">
                        { item.variation !== null && (
                          <div className="flex space-x-2 items-center">
                            <p>Variant:</p>
                            { item.variation.type === "size" || item.variation.type ===  "others" ? (
                              <p className="uppercase">{ item.variation.variant }</p>
                            ) : (
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.variation.variant }}/>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    { item.supplementryProducts && item.supplementryProducts.length > 0 && (
                      <div className="mt-4">
                        <p className="font-bold text-small capitalize">Supplementary Product Informations</p>
                        <div className="grid grid-cols-1 gap-4">
                          { item.supplementryProducts.map( sup => (
                            <div key={ sup.id } className="border p-4 rounded-lg">
                              <div className="flex justify-between">
                                <div className="flex space-x-2 items-center">
                                  <p className="font-bold">{ sup.name || sup.product.name }</p>
                                </div>
                                <p className="font-bold">&#8358;{ sup.product.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</p>
                              </div>
                              <div>
                                <p>Total Cost: &#8358; { sup.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) }</p>
                                <p>Quantity: { sup.quantity }</p>
                              </div>
                            </div>
                          ) ) }
                          </div>
                      </div>
                    )}
                  </div>
                ) ) }
              </div>
        </div>
      )}
    </section>
  )
}

export default SingleOrder