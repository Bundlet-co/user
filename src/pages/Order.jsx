import CartLoader from "@/components/animations/CartLoader";
import BackNav from "@/components/BackNav";
import EmptyItem from "@/components/EmptyItem";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import { dev_url } from "@/utils/axios";
import { Image } from "@nextui-org/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Order = () => {
	const [orders, setOrders] = useState([]);
	const { fetchData, loading } = useAxiosFetch();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetchData(true, `/order`, "get");
				const result = res.data.orders;
				setOrders(result);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [fetchData]);
	return (
		<div className="h-100">
			<BackNav />
			{loading && orders.length <= 0 && (
				<div>
					<CartLoader />
					<CartLoader />
					<CartLoader />
					<CartLoader />
					<CartLoader />
					<CartLoader />
					<CartLoader />
					<CartLoader />
					<CartLoader />
					<CartLoader />
				</div>
			)}
			{!loading && orders.length <= 0 && <EmptyItem message="No order placed" />}
			{!loading && orders.length > 0 && (
				<div className="h-full flex flex-col">
					<p className="text-lg md:text-xl text-primary py-2 font-extrabold">
						My Orders
					</p>
					<div className="flex-1 grid grid-cols-1 gap-4">
						{orders.map((order) => (
							<Link
								to={`/order/${order.id}`}
								key={order.id}
								className="border p-2 rounded-md">
								<p className="text-tiny">
									<span className="capitalize font-bold">order Id:</span> {order.id}
								</p>
								<div className="flex items-center space-x-2">
									<div className="">
										<Image
											src={`${dev_url}/${order.products[0].product.dp.replace(
												"public/",
												""
											)}`}
											className="w-20 h-20 object-cover"
										/>
									</div>
									<div>
										<p className="text-tiny">
											<span className="capitalize font-bold">Net Amount:</span> &#8358;
											{order.netAmount.toLocaleString("en-US", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</p>
										<p
											className={
												order.status === "PENDING"
													? "text-tiny text-warning"
													: order.status === "DELIVERED"
													? "text-tiny text-success"
													: order.status === "CANCELLED"
													? "text-tiny text-danger"
													: "text-tiny text-primary"
											}>
											<span className="capitalize font-bold text-black">Status:</span>{" "}
											{order.status}
										</p>
										<p className="text-tiny">
											<span className="capitalize font-bold">Ordered Date:</span>{" "}
											{dayjs(order.createdAt).format("MMMM D, YYYY")}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Order;
