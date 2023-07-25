// React
import { useEffect } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchSession } from "../../app/slices/authSlice";
import { fetchSchedule } from "../../app/slices/scheduleSlice";

// Components
import ScheduleItem from "./ScheduleItem";

// Styles
import { Box, Typography, List } from "@mui/material";

const Schedule = () => {
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	useEffect(() => {
		dispatch(fetchSession());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchSchedule(session?.user.id));
	}, [session]);

	const schedule = useAppSelector((state) => state.schedule.schedule);

	return (
		<Box display="flex" flexDirection="column" gap="1rem">
			<Typography variant="h5" align="center">
				Schedule
			</Typography>
			<List
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1.5vw",
					paddingTop: "0",
				}}
			>
				{schedule.map((scheduleItem) => (
					<ScheduleItem
						key={scheduleItem.id}
						scheduleItem={scheduleItem}
					></ScheduleItem>
				))}
			</List>
		</Box>
	);
};

export default Schedule;
