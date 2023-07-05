import styled from "styled-components";

import QuickTasks from "../components/QuickTasks";
import Projects from "../components/Projects";
import Schedule from "../components/Schedule";

import HabbitOfTheDay from "../components/HabbitOfTheDay";

const MainPage = () => {
	return (
		<StyledMain>
			<h1>Today's Agenda</h1>
			<StyledGrid>
				<QuickTasks></QuickTasks>
				<Projects></Projects>
				<Schedule></Schedule>
			</StyledGrid>
			<HabbitOfTheDay></HabbitOfTheDay>
		</StyledMain>
	);
};

export default MainPage;

const StyledMain = styled.div`
	padding: 4rem 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const StyledGrid = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;
