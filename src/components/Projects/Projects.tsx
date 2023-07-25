// React
import { useState, useEffect } from "react";

//Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addToProjects, fetchProjects } from "../../app/slices/projectsSlice";
import { fetchSession } from "../../app/slices/authSlice";

// Components
import ProjectItem from "./ProjectItem";

// UUID
import { v4 as uuidv4 } from "uuid";

// Styles
import { TextField, Button, Box, Typography, List } from "@mui/material";

const Projects = () => {
	const projects = useAppSelector((state) => state.projects.projects);
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	useEffect(() => {
		dispatch(fetchSession());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchProjects(session?.user.id));
	}, [session]);

	const [newProject, setNewProject] = useState("");

	const handleInput = (value: string) => {
		setNewProject(value);
	};

	const handleAdding = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(
			addToProjects([
				{ project_title: newProject, id: uuidv4(), is_done: false },
				session,
			])
		);
		setNewProject("");
	};

	return (
		<Box display="flex" flexDirection="column" gap="1rem">
			<Typography variant="h5" align="center">
				Projects
			</Typography>
			<form onSubmit={(e) => handleAdding(e)}>
				<Box display="flex" flexDirection="column" gap="0.5vw">
					<TextField
						placeholder="Create planner grid"
						variant="standard"
						type="text"
						name=""
						id=""
						value={newProject}
						onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleInput(e.target.value)
						}
					/>
					<Button variant="contained" type="submit" size="small">
						Add Item
					</Button>
				</Box>
			</form>
			<List
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1.5vw",
					paddingTop: "0",
				}}
			>
				{projects.map((project) => (
					<ProjectItem
						project={project}
						newProject={newProject}
						key={project.id?.toString()}
					></ProjectItem>
				))}
			</List>
		</Box>
	);
};

export default Projects;
