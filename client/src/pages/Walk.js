import { useSelector } from "react-redux";

const Walk = () => {
	const user = useSelector((state) => state.auth.user);
    const nickname = user? user.nickname : null
	return (
		<div>
			walk,
			{nickname ?  nickname  : (<div>없음</div>)}
		</div>
	);
};

export default Walk;
