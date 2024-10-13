import { Skeleton } from "@nextui-org/react";


const CartLoader = () => {
  return (
    <div className="flex gap-2 border rounded-lg p-2 items-center mb-2">
      <Skeleton className="rounded-md">
        <div className="w-20 h-20"/>
      </Skeleton>
      <div className="flex-1 space-y-2">
        <Skeleton className="rounded">
          <div className="h-4 w-full"/>
        </Skeleton>
        <Skeleton className="rounded">
          <div className="h-4 w-full"/>
        </Skeleton>
        <Skeleton className="rounded">
          <div className="h-4 w-full"/>
        </Skeleton>
      </div>
    </div>
  )
}

export default CartLoader