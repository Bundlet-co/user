import { RiWhatsappFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const WhatsapSupport = () => {
	return (
		<Link
			to="https://wa.link/m1dn9m"
			target="_blank">
			<RiWhatsappFill className="text-green-500 text-5xl" />
		</Link>
	);
};

export default WhatsapSupport;
