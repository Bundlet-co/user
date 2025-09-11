import { Image } from "@nextui-org/react";
import logo from "../assets/img2.png";
import img from "../assets/img3.png";
import { BsEnvelope, BsFacebook, BsGithub, BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
	const company = ["About", "Features", "Works", "Career"];

	const help = [
		{
			name: "customer support",
			link: "/",
		},
		{
			name: "delivery details",
			link: "/",
		},
		{
			name: "Terms & conditions",
			link: "/terms",
		},
		{
			name: "Privacy policy",
			link: "/privacy",
		},
	];

	const faq = ["account", "manage deliveries", "orders", "payments"];

	const year = new Date().getFullYear();
	return (
		<div className="bg-neutral-200 p-4">
			<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
				<div className="col-span-full lg:col-span-1">
					<Image
						src={logo}
						className="w-32 h-8"
					/>
					<p className="my-4 text-small ">
						No. 1 Bulk buying platform for discounted purchases, empowering farmers
						and manufacturers to sell more and export.
					</p>
					<div className="flex items-center space-x-4">
						<BsTwitterX
							className="rounded-full p-1 text-black"
							size={26}
						/>
						<BsFacebook
							className="rounded-full p-1 text-black"
							size={26}
						/>
						<BsEnvelope
							className="rounded-full p-1 text-black"
							size={26}
						/>
						<BsGithub
							className="rounded-full p-1 text-black"
							size={26}
						/>
					</div>
				</div>
				<div className="col-span-1">
					<p className="text-lg font-bold uppercase">Company</p>
					<div>
						{company.map((item, index) => (
							<p
								className="capitalize my-2 text-neutral-700"
								key={index}>
								{item}
							</p>
						))}
					</div>
				</div>
				<div className="col-span-1">
					<p className="text-lg font-bold uppercase">HELP</p>
					<div className="grid grid-cols-1">
						{help.map((item, index) => (
							<Link
								to={item.link}
								className="capitalize my-2 text-neutral-700"
								key={index}>
								{item.name}
							</Link>
						))}
					</div>
				</div>
				<div className="col-span-1">
					<p className="text-lg font-bold uppercase">FAQ</p>
					<div>
						{faq.map((item, index) => (
							<p
								className="capitalize my-2 text-neutral-700"
								key={index}>
								{item}
							</p>
						))}
					</div>
				</div>
			</div>
			<hr className="my-4 border border-neutral-400" />

			<div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
				<p className="text-center text-neutral-800">
					Bundlet.co &copy; {year}. All rights Reserved
				</p>
				<div>
					<Image
						src={img}
						className="object-contain"
					/>
				</div>
			</div>
		</div>
	);
};

export default Footer;
