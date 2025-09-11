import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackNav = () => {
	const navigate = useNavigate();

	const back = () => {
		navigate(-1);
	};
	return (
		<div
			className="rounded-full p-2 border border-gray-300 w-fit"
			role="button"
			onClick={back}>
			<IoChevronBackOutline className="text-lg" />
		</div>
	);
};

export default BackNav;
