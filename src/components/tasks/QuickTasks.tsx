//React
import { useState, useEffect } from "react";

// Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchSession } from "../../app/slices/authSlice";
import { addToTasks, fetchTasks } from "../../app/slices/tasksSlice";

// Components
import TaskItem from "./TaskItem";

// UUID
import { v4 as uuidv4 } from "uuid";

// Styles
import { TextField, Button, Box, List, Typography } from "@mui/material";

const QuickTasks = () => {
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	useEffect(() => {
		dispatch(fetchSession());
	}, [dispatch]);

	useEffect(() => {
		if (session) dispatch(fetchTasks(session?.user.id));
	}, [session]);

	const quickTasks = useAppSelector((state) => state.quickTasks.tasks);

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

	return (
		<Box maxWidth="100%" display="flex" flexDirection="column" gap="1rem">
			<Typography variant="h5" align="center">
				Quick Tasks
			</Typography>
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
			<List>
				{quickTasks.map((task) => (
					<TaskItem
						newTask={newTask}
						key={task.id?.toString()}
						task={task}
					></TaskItem>
				))}
			</List>
		</Box>
	);
};

export default QuickTasks;
