// React
import { useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	addToSchedule,
	removeFromSchedule,
	toggleScheduleDone,
} from "../../app/slices/scheduleSlice";

// Styles
import { TextField, Button, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

// UUID
import { v4 as uuidv4 } from "uuid";

// Supabase
import { Database } from "../../../types/supabase";
type ScheduleItemType =
	Database["public"]["Tables"]["schedule_items"]["Insert"];

const ScheduleItem = ({ scheduleItem }: { scheduleItem: ScheduleItemType }) => {
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	const [newScheduleItem, setNewScheduleItem] = useState("");

	const handleInput = (value: string) => {
		setNewScheduleItem(value);
	};

	const handleAdding = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(
			addToSchedule([
				{
					schedule_item_title: newScheduleItem,
					id: scheduleItem.id,
					schedule_time: scheduleItem.schedule_time,
				},
				session,
			])
		);
		setNewScheduleItem("");
	};

	const handleRemoving = () => {
		dispatch(
			removeFromSchedule([
				{
					schedule_item_title: newScheduleItem,
					id: scheduleItem.id,
					schedule_time: scheduleItem.schedule_time,
				},
				session,
			])
		);
	};

	const handleDone = () => {
		dispatch(
			toggleScheduleDone([
				{
					id: scheduleItem.id,
					is_done: scheduleItem.is_done,
					schedule_time: scheduleItem.schedule_time,
				},
				session,
			])
		);
	};

	return (
		<li>
			{scheduleItem.schedule_item_title ? (
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="flex-start"
					gap="1vw"
				>
					<Typography paragraph>{scheduleItem.schedule_time}</Typography>
					<Typography
						paragraph
						sx={{
							wordBreak: "break-all",
							textDecoration: scheduleItem.is_done ? "line-through" : "",
							flex: 1,
						}}
					>
						{scheduleItem.schedule_item_title}
					</Typography>
					{scheduleItem.is_done ? (
						<Button
							variant="contained"
							type="submit"
							size="small"
							onClick={handleDone}
						>
							<ClearIcon></ClearIcon>
						</Button>
					) : (
						<Button
							variant="contained"
							type="submit"
							size="small"
							onClick={handleDone}
						>
							<CheckIcon></CheckIcon>
						</Button>
					)}
					<Button
						onClick={handleRemoving}
						variant="contained"
						type="submit"
						size="small"
					>
						<DeleteIcon></DeleteIcon>
					</Button>
				</Box>
			) : (
				<form onSubmit={(e) => handleAdding(e)}>
					<Box display="flex" flexDirection="column" gap="0.5vw">
						<TextField
							id="standard-basic"
							placeholder={scheduleItem.schedule_time}
							variant="standard"
							type="text"
							onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleInput(e.target.value)
							}
							value={newScheduleItem}
						/>
						<Button variant="contained" type="submit" size="small">
							Create
						</Button>
					</Box>
				</form>
			)}
		</li>
	);
};
export default ScheduleItem;
