import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addToProjects, removeFromProjects } from "../app/slices/projectsSlice";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { TextField, Button, Box } from "@mui/material";

const Projects = () => {
	const projects = useAppSelector((state) => state.projects.projects);
	const dispatch = useAppDispatch();

	const [newProject, setNewProject] = useState("");

	const handleInput = (value: string) => {
		setNewProject(value);
	};

	const handleAdding = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(addToProjects({ title: newProject, id: uuidv4() }));
		setNewProject("");
	};
	const handleRemoving = (id: String) => {
		dispatch(removeFromProjects(id));
	};

	return (
		<Box display="flex" flexDirection="column" gap="1rem">
			<h1>Projects</h1>
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
			<ul>
				{projects.map((project) => (
					<div key={project.id.toString()}>
						<li>{project.title}</li>
						<Button
							variant="contained"
							type="submit"
							size="small"
							onClick={() => handleRemoving(project.id)}
						>
							Remove Item
						</Button>
					</div>
				))}
			</ul>
		</Box>
	);
};

export default Projects;
