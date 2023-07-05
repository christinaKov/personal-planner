import { useAppDispatch } from "../app/hooks";
import { addToSchedule, removeFromSchedule } from "../app/slices/scheduleSlice";

import { useState } from "react";

const ScheduleItem = ({
	id,
	time,
	title,
}: {
	id: String;
	time: String;
	title: String;
}) => {
	const dispatch = useAppDispatch();

	const [newScheduleItem, setNewScheduleItem] = useState("");

	const handleInput = (value: string) => {
		setNewScheduleItem(value);
	};

	const handleAdding = (time: String, title: String, id: String) => {
		dispatch(addToSchedule({ title, id, time }));
		setNewScheduleItem("");
	};

	const handleRemoving = (time: String, title: String, id: String) => {
		dispatch(removeFromSchedule({ time, title, id }));
	};

	return (
		<li>
			<p>{time}</p>
			{title ? (
				<div>
					<p>{title}</p>
					<button onClick={() => handleRemoving(time, newScheduleItem, id)}>
						Remove Item
					</button>
				</div>
			) : (
				<div>
					<input
						type="text"
						onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleInput(e.target.value)
						}
						value={newScheduleItem}
					/>
					<button onClick={() => handleAdding(time, newScheduleItem, id)}>
						Add Item
					</button>
				</div>
			)}
		</li>
	);
};
export default ScheduleItem;
