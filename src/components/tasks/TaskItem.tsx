// Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";

// Slice
import { removeFromTasks } from "../../app/slices/tasksSlice";

// Styles
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

// Supabase
import { Database } from "../../../types/supabase";
type QuickTask = Database["public"]["Tables"]["tasks"]["Row"];

const TaskItem = ({ task, newTask }: { task: QuickTask; newTask: string }) => {
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	const handleRemoving = (id: string) => {
		dispatch(
			removeFromTasks([
				{
					task_title: newTask,
					id,
					created_at: Date.now().toString(),
					is_done: false,
					user_id: "",
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
				<Typography paragraph sx={{ wordBreak: "break-all" }}>
					{task.task_title}
				</Typography>
				<Box display="flex" gap="0.5vw">
					<Button variant="contained" type="submit" size="small">
						<CheckIcon></CheckIcon>
					</Button>
					<Button
						variant="contained"
						type="submit"
						size="small"
						onClick={() => handleRemoving(task.id)}
					>
						<DeleteIcon></DeleteIcon>
					</Button>
				</Box>
			</Box>
		</li>
	);
};

export default TaskItem;
