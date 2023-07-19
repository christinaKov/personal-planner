import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addToTasks, removeFromTasks } from "../app/slices/tasksSlice";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { TextField, Button, Box } from "@mui/material";

const QuickTasks = () => {
	const QuickTasks = useAppSelector((state) => state.quickTasks.tasks);
	const dispatch = useAppDispatch();

	const [newTick, setNewTick] = useState("");

	const handleInput = (value: string) => {
		setNewTick(value);
	};

	const handleAdding = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(addToTasks({ title: newTick, id: uuidv4() }));
		setNewTick("");
	};

	const handleRemoving = (id: String) => {
		dispatch(removeFromTasks(id));
	};

	return (
		<Box display="flex" flexDirection="column" padding="2rem" gap="1rem">
			<h1>Quick Tasks</h1>
			<form onSubmit={(e) => handleAdding(e)}>
				<Box display="flex" flexDirection="column" gap="0.5vw">
					<TextField
						type="text"
						name=""
						id=""
						value={newTick}
						onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleInput(e.target.value)
						}
						placeholder="Implement Material UI"
						variant="standard"
					/>
					<Button variant="contained" type="submit" size="small">
						Add Item
					</Button>
				</Box>
			</form>
			<ul>
				{QuickTasks.map((task) => (
					<div key={task.id.toString()}>
						<li>{task.title}</li>
						<Button
							variant="contained"
							type="submit"
							size="small"
							onClick={() => handleRemoving(task.id)}
						>
							Remove Item
						</Button>
					</div>
				))}
			</ul>
		</Box>
	);
};

export default QuickTasks;
