/* eslint-disable react/prop-types */
import EditModal from "@/components/profile/EditModal";
import { CARTITEM, PRODUCT } from "@/constant";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useCartContext from "@/hooks/useCartContext";
import useMainContext from "@/hooks/useMainContext";
import { dev_url } from "@/utils/axios";
import {
	Button,
	Image,
	Radio,
	RadioGroup,
	Skeleton,
	useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaCartShopping, FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import BackNav from "@/components/BackNav";

const Checkout = () => {
	const { carts, cartTax, cartSubTotal, cartTotal, deleteAll } =
		useCartContext();
	const [cartItems, setCartItems] = useState([
		{ ...CARTITEM, product: { ...PRODUCT } },
	]);
	const { user, openToast } = useMainContext();
	const { fetchData, loading } = useAxiosFetch();
	const [isDisabled, setisDisabled] = useState(
		(!user.address && !user.address?.location) ||
			user.balance < cartTotal + cartItems.length * 200
	);
	const [dispatchCenter, setDispatchCenter] = useState("");
	const [isDispatchActive, setDispatchActive] = useState(false);
	const config = {
		reference: "bundlet-" + new Date().getTime().toString(),
		email: user.email,
		amount: cartTotal * 100,
		publicKey: "pk_live_58c8df2bc16fc5632671c2f7f0afe87edede5d02",
	};
	const initializePayment = usePaystackPayment(config);

	const navigate = useNavigate();

	const onClosePaystack = () => {
		console.log("Payment not made");
		navigate("/checkout");
	};

	const [isEdit, setIsEdit] = useState(false);
	const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
	const toggleEdit = () => {
		if (!isEdit) {
			setIsEdit(!isEdit);
			onOpen();
		} else {
			setIsEdit(!isEdit);
			onClose();
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const newItem = carts.map(async (item) => {
					const res = await fetchData(false, `/product/${item.productId}`);
					const result = await res.data.product;
					return { ...item, product: result };
				});
				const data = await Promise.all(newItem);
				setCartItems(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [carts, fetchData, user, cartTotal]);

	const checkOut = async () => {
		const data = {
			userId: user.id,
			netAmount: cartTotal + cartItems.length * 200,
			address: dispatchCenter,
			orderProduct: cartItems.map((item) => ({
				productId: item.productId,
				price: item.price,
				quantity: item.quantity,
				variation: item.variation,
				supplementryProducts: JSON.stringify(item.suplementryProducts),
			})),
		};
		try {
			const res = await fetchData(true, `/order`, "post", data);
			openToast(res.message, "success");
			navigate("/order");
			deleteAll();
		} catch (error) {
			openToast(error.message, "error");
			console.error(error);
		}
	};

	useEffect(() => {
		if (user.address && user.address.location) return setisDisabled(false);
	}, [user.address]);

	return (
		<div className="h-full">
			<BackNav />
			{!isDispatchActive && (
				<div className="h-full">
					<p className="text-lg md:text-xl text-primary py-2 font-extrabold col-span-full h-fit">
						Review Order
					</p>
					<section className="h-full flex flex-col lg:grid lg:grid-cols-5 lg:gap-4">
						<div className="col-span-3 p-4 lg:max-h-full overflow-y-auto border   lg:h-fit">
							{!user.address && <p>Add an address</p>}
							{user.address && (
								<div className="lg:hidden w-full mb-4 border-b-1">
									<p className="text-medium font-bold">Address Information</p>
									<p className="text-small">
										{user.address.location}, {user.address.city}, {user.address.state},{" "}
										{user.address.country}
									</p>
								</div>
							)}
							{cartItems.map((cart) => (
								<div
									className="flex space-x-2 border-b items-center flex-grow"
									key={cart.id ? cart.id : cartItems.indexOf(cart) + 1}>
									<p className="text-lg font-bold">{cartItems.indexOf(cart) + 1}.</p>
									<div className="flex gap-2 p-2 items-center mb-2 flex-grow">
										<div className="">
											<Image
												src={`${dev_url}/${cart.product.dp.replace("public/", "")}`}
												className="w-20 h-20 object-cover"
											/>
										</div>
										<div className="flex-1">
											<div className="flex flex-between mb-4">
												<div className="flex-1">
													<p className="font-bold md:text-medium lg:text-lg">
														{cart.product.name}
													</p>
													{cart.variation && (
														<div className="flex items-center space-x-2">
															<p className="text-small font-semibold capitalize">
																{cart.variation.type}:
															</p>
															<div
																className={
																	cart.variation.type === "color" ? "h-6 w-6 rounded-md" : ""
																}
																style={
																	cart.variation.type === "color"
																		? { backgroundColor: cart.variation.variant }
																		: {}
																}>
																{cart.variation.type !== "color" ? (
																	<p className="text-tiny">{cart.variation.variant}</p>
																) : null}
															</div>
														</div>
													)}
													<div className="flex space-x-2">
														<p className="text-primary  text-tiny">
															<span className="text-black font-bold">Price:</span>
															<span className={"inline-block"}>
																&#8358;
																{cart.price.toLocaleString("en-US", {
																	minimumFractionDigits: 2,
																	maximumFractionDigits: 2,
																})}
															</span>
														</p>
														<p className="text-tiny">
															<span className="text-black font-bold">Quantity:</span>
															<span className={"inline-block"}>
																{cart.quantity} {cart.product.unit}
															</span>
														</p>
													</div>
													<p className="text-normal font-bold">
														<span className=" ">Total:</span>{" "}
														<span className={"inline-block"}>
															&#8358;
															{cart.total.toLocaleString("en-US", {
																minimumFractionDigits: 2,
																maximumFractionDigits: 2,
															})}
														</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="sticky mx-auto w-full flex justify-between items-center border-t-1 p-2 lg:flex-col border lg:col-span-2 h-fit lg:h-64 lg:items-start mt-2 lg:mt-0 rounded-s-md">
							{!user.address && (
								<div>
									<p>Add an address</p>
									<Button
										color="default"
										className="flex"
										onClick={toggleEdit}>
										<FaPencil /> <span className="hidden lg:block">Edit profile</span>
									</Button>
								</div>
							)}
							{user.address && (
								<div className="hidden lg:block w-full">
									<p className="text-lg font-bold">Address Information</p>
									<hr />
									<p>
										{user.address.location}, {user.address.city}, {user.address.state},{" "}
										{user.address.country}
									</p>
								</div>
							)}
							<hr className="hidden lg:block w-full" />
							<div className="lg:w-full">
								<div>
									<p className="text-tiny md:text-small text-end lg:text-lg font-bold">
										Subtotal:{" "}
										<span className="font-normal">
											₦
											{cartSubTotal.toLocaleString("en-US", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</span>
									</p>
								</div>
								<div>
									<p className="text-tiny md:text-small text-end lg:text-lg font-bold">
										VAT:{" "}
										<span className="font-normal">
											₦
											{cartTax.toLocaleString("en-US", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</span>
									</p>
								</div>
								<div>
									<p className="text-tiny md:text-small text-end lg:text-lg font-bold">
										Total:{" "}
										<span className="font-normal">
											₦
											{cartTotal.toLocaleString("en-US", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</span>
									</p>
								</div>
							</div>
							<Button
								radius="full"
								color="primary"
								className="flex space-x-2 w-1/2 lg:w-full"
								onClick={() => setDispatchActive((prev) => !prev)}
								isLoading={loading}
								isDisabled={isDisabled}>
								<FaCartShopping />
								<p>Select Dispatch center</p>
							</Button>
						</div>
						<EditModal
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							closeToggle={toggleEdit}
						/>
					</section>
				</div>
			)}
			{isDispatchActive && (
				<DeliveryAddress
					isLoading={loading}
					isDisabled={isDisabled}
					checkOut={() =>
						initializePayment({ onSuccess: checkOut, onClose: onClosePaystack })
					}
					setDispatchActive={setDispatchActive}
					setDispatchCenter={setDispatchCenter}
				/>
			)}
		</div>
	);
};

const DeliveryAddress = ({
	isLoading,
	isDisabled,
	checkOut,
	setDispatchCenter,
	setDispatchActive,
}) => {
	const { fetchData, loading } = useAxiosFetch();
	const [locations, setLocations] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const res = await fetchData(false, "/location", "GET");
				const result = await res.data;
				setLocations(result.locations);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [fetchData]);
	return (
		<div className="h-full flex gap-4 flex-col">
			<div>
				<BsArrowLeft
					size={20}
					onClick={() => setDispatchActive((prev) => !prev)}
				/>
			</div>
			<div className="flex-1 overflow-y-auto">
				{locations.length === 0 && loading && (
					<div className="h-full">
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</div>
				)}
				{!loading && locations.length > 0 && (
					<RadioGroup
						label="Select dispatch location"
						onChange={(e) => setDispatchCenter(e.target.value)}>
						{locations.map((location) => (
							<Radio
								key={location.id}
								value={`${location.address}, ${location.city}, ${location.state}, ${location.country}`}>{`${location.address}, ${location.city}, ${location.state}, ${location.country}`}</Radio>
						))}
					</RadioGroup>
				)}
			</div>
			<Button
				radius="full"
				color="primary"
				className="flex space-x-2 w-1/2 lg:w-full"
				onClick={checkOut}
				isLoading={isLoading}
				isDisabled={isDisabled}>
				<FaCartShopping />
				<p>Checkout</p>
			</Button>
		</div>
	);
};

export default Checkout;
