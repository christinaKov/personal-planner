// Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";

// Slice
import { removeFromTasks, toggleTaskDone } from "../../app/slices/tasksSlice";

// Styles
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

// Supabase
import { Database } from "../../../types/supabase";
type QuickTask = Database["public"]["Tables"]["tasks"]["Insert"];

const TaskItem = ({ task, newTask }: { task: QuickTask; newTask: string }) => {
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	const handleRemoving = () => {
		dispatch(
			removeFromTasks([
				{
					task_title: newTask,
					id: task.id,
					is_done: false,
				},
				session,
			])
		);
	};

	const handleDone = () => {
		dispatch(
			toggleTaskDone([
				{
					id: task.id,
					is_done: task.is_done,
				},
				session,
			])
		);
	};

	return (
		<li>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				gap="1vw"
			>
				<Typography
					paragraph
					sx={{
						wordBreak: "break-all",
						textDecoration: task.is_done ? "line-through" : "",
					}}
				>
					{task.task_title}
				</Typography>
				<Box display="flex" gap="0.5vw">
					{task.is_done ? (
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
						variant="contained"
						type="submit"
						size="small"
						onClick={handleRemoving}
					>
						<DeleteIcon></DeleteIcon>
					</Button>
				</Box>
			</Box>
		</li>
	);
};

export default TaskItem;
