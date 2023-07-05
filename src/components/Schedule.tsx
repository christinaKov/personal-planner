import styled from "styled-components";

import { useAppSelector } from "../app/hooks";

import ScheduleItem from "./ScheduleItem";

const Schedule = () => {
	const schedule = useAppSelector((state) => state.schedule.schedule);

	return (
		<StyledPlannerItem>
			<h1>Schedule</h1>
			<ol>
				{schedule.map((scheduleItem) => (
					<ScheduleItem
						key={scheduleItem.id.toString()}
						id={scheduleItem.id}
						title={scheduleItem.title}
						time={scheduleItem.time}
					></ScheduleItem>
				))}
			</ol>
		</StyledPlannerItem>
	);
};

export default Schedule;

const StyledPlannerItem = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	input {
		height: 2rem;
		padding: 0.5rem;
		outline: none;
	}
	ol {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
`;
