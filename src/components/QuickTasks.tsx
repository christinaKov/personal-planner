//React
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
	addToTasks,
	removeFromTasks,
	fetchTasks,
} from "../app/slices/tasksSlice";

// Supabase
import { fetchSession } from "../app/slices/authSlice";

// UUID
import { v4 as uuidv4 } from "uuid";

// Styles
import { TextField, Button, Box } from "@mui/material";

const QuickTasks = () => {
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	useEffect(() => {
		dispatch(fetchSession());
		dispatch(fetchTasks());
	}, [dispatch]);

	const QuickTasks = useAppSelector((state) => state.quickTasks.tasks);

	const [newTask, setNewTask] = useState("");

	const handleInput = (value: string) => {
		setNewTask(value);
	};

	const handleAdding = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(
			addToTasks([
				{
					task_title: newTask,
					id: uuidv4(),
					created_at: Date.now().toString(),
					is_done: false,
					user_id: "",
				},
				session,
			])
		);
		setNewTask("");
	};

	const handleRemoving = (id: string) => {
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
						value={newTask}
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
						<li>{task.task_title}</li>
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
