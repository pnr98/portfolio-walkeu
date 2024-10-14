import { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../api/apiService";

const Container = styled.div``;

const Main = () => {
	const [data, setData] = useState(null);

	const getData = async () => {
		const res = await apiClient.get("/");
		setData(res.data);
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<Container>
			Main
			{data && <div>{data}</div>}
		</Container>
	);
};

export default Main;
