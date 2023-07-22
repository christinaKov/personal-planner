// React
import { useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	addToSchedule,
	removeFromSchedule,
} from "../../app/slices/scheduleSlice";

// Styles
import { TextField, Button, Box } from "@mui/material";

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

	return (
		<li>
			{scheduleItem.schedule_item_title ? (
				<div>
					<p>{scheduleItem.schedule_time}</p>
					<p>{scheduleItem.schedule_item_title}</p>
					<Button
						onClick={handleRemoving}
						variant="contained"
						type="submit"
						size="small"
					>
						Remove Item
					</Button>
				</div>
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
							Add Item
						</Button>
					</Box>
				</form>
			)}
		</li>
	);
};
export default ScheduleItem;
