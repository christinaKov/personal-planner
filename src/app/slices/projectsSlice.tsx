import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface Projects {
	title: string;
	id: string;
}

interface ProjectsState {
	projects: Projects[];
}

// Define the initial state using that type
const initialState: ProjectsState = {
	projects: [],
};

export const ProjectsSlice = createSlice({
	name: "Projects",
	initialState,
	reducers: {
		addToProjects: (state, action: PayloadAction<Projects>) => {
			state.projects.push(action.payload);
		},
		removeFromProjects: (state, action: PayloadAction<String>) => {
			state.projects = state.projects.filter(
				(project) => project.id !== action.payload
			);
		},
	},
});

export const { addToProjects, removeFromProjects } = ProjectsSlice.actions;

export default ProjectsSlice.reducer;
