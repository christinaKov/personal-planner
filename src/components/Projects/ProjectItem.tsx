//Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	removeFromProjects,
	toggleProjectDone,
} from "../../app/slices/projectsSlice";

// Styles
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

// Supabase
import { Database } from "../../../types/supabase";
type Project = Database["public"]["Tables"]["projects"]["Insert"];

const ProjectItem = ({
	project,
	newProject,
}: {
	project: Project;
	newProject: string;
}) => {
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	const handleRemoving = () => {
		dispatch(
			removeFromProjects([
				{
					project_title: newProject,
					id: project.id,
				},
				session,
			])
		);
	};

	const handleDone = () => {
		dispatch(
			toggleProjectDone([
				{
					id: project.id,
					is_done: project.is_done,
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
				alignItems="flex-start"
				gap="1vw"
			>
				<Typography
					paragraph
					sx={{
						wordBreak: "break-all",
						textDecoration: project.is_done ? "line-through" : "",
					}}
				>
					{project.project_title}
				</Typography>
				<Box display="flex" gap="0.5vw">
					{project.is_done ? (
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

export default ProjectItem;
