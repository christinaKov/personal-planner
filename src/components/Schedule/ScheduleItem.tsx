import { useAppDispatch } from "../../app/hooks";
import {
	addToSchedule,
	removeFromSchedule,
} from "../../app/slices/scheduleSlice";

import { useState } from "react";

import { TextField, Button, Box } from "@mui/material";

const ScheduleItem = ({
	id,
	time,
	title,
}: {
	id: string;
	time: string;
	title: string;
}) => {
	const dispatch = useAppDispatch();

	const [newScheduleItem, setNewScheduleItem] = useState("");

	const handleInput = (value: string) => {
		setNewScheduleItem(value);
	};

	const handleAdding = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(addToSchedule({ title, id, time }));
		setNewScheduleItem("");
	};

	const handleRemoving = () => {
		dispatch(removeFromSchedule({ time, title, id }));
	};

	return (
		<li>
			{title ? (
				<div>
					<p>{time}</p>
					<p>{title}</p>
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
							placeholder={time}
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
