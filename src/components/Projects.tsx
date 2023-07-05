import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addToProjects, removeFromProjects } from "../app/slices/projectsSlice";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const Projects = () => {
	const projects = useAppSelector((state) => state.projects.projects);
	const dispatch = useAppDispatch();

	const [newProject, setNewProject] = useState("");

	const handleInput = (value: string) => {
		setNewProject(value);
	};

	const handleAdding = () => {
		dispatch(addToProjects({ title: newProject, id: uuidv4() }));
		setNewProject("");
	};
	const handleRemoving = (id: String) => {
		dispatch(removeFromProjects(id));
	};

	return (
		<StyledPlannerItem>
			<h1>Projects</h1>
			<input
				type="text"
				name=""
				id=""
				value={newProject}
				onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleInput(e.target.value)
				}
			/>
			<button onClick={handleAdding}>Add Item</button>
			<ol>
				{projects.map((project) => (
					<div key={project.id.toString()}>
						<li>{project.title}</li>
						<button onClick={() => handleRemoving(project.id)}>
							Remove Item
						</button>
					</div>
				))}
			</ol>
		</StyledPlannerItem>
	);
};

export default Projects;

const StyledPlannerItem = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	input {
		height: 2rem;
		padding: 0.5rem;
		outline: none;
	}
	ol {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
`;
