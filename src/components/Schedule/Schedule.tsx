import { useAppSelector } from "../../app/hooks";

import ScheduleItem from "./ScheduleItem";

import { Box } from "@mui/material";

const Schedule = () => {
	const schedule = useAppSelector((state) => state.schedule.schedule);

	return (
		<Box display="flex" flexDirection="column" padding="2rem" gap="1rem">
			<h1>Schedule</h1>
			<ul>
				{schedule.map((scheduleItem) => (
					<ScheduleItem
						key={scheduleItem.id.toString()}
						id={scheduleItem.id}
						title={scheduleItem.title}
						time={scheduleItem.time}
					></ScheduleItem>
				))}
			</ul>
		</Box>
	);
};

export default Schedule;
