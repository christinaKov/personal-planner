// Redux
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Supabase
import { supabase } from "./authSlice";
import { Session } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";

// Define a type for the slice state
type Project = Database["public"]["Tables"]["projects"]["Insert"];

interface ProjectsState {
	projects: Project[];
}

// Define the initial state using that type
const initialState: ProjectsState = {
	projects: [],
};

export const fetchProjects = createAsyncThunk(
	"projects/fetchProjects",
	async (userId: string, thunkAPI) => {
		const { data: projects, error } = await supabase
			.from("projects")
			.select("*")
			.eq("user_id", userId);
		return projects;
	}
);

export const ProjectsSlice = createSlice({
	name: "Projects",
	initialState,
	reducers: {
		addToProjects: (
			state,
			action: PayloadAction<[Project, Session | null]>
		) => {
			const newProject = action.payload[0];
			const session = action.payload[1];

			if (session) {
				(async () => {
					const data = await supabase
						.from("projects")
						.insert([
							{
								user_id: session.user.id,
								project_title: newProject.project_title,
								id: newProject.id,
							},
						])
						.select();
				})();
			}
			state.projects.push(newProject);
		},
		removeFromProjects: (
			state,
			action: PayloadAction<[Project, Session | null]>
		) => {
			const newProject = action.payload[0];
			const session = action.payload[1];

			if (session) {
				(async () => {
					const { error } = await supabase
						.from("projects")
						.delete()
						.eq("id", newProject.id);
				})();
			}

			state.projects = state.projects.filter(
				(project) => project.id !== newProject.id
			);
		},
		toggleProjectDone: (
			state,
			action: PayloadAction<[Project, Session | null]>
		) => {
			const newProject = action.payload[0];
			const session = action.payload[1];

			if (session) {
				(async () => {
					const { data, error } = await supabase
						.from("projects")
						.update({ is_done: !newProject.is_done })
						.eq("id", newProject.id)
						.select();
				})();
			}

			state.projects.map((project) =>
				project.id === newProject.id ? (project.is_done = !project.is_done) : ""
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProjects.fulfilled, (state, action) => {
			if (action.payload) state.projects = action.payload;
		});
	},
});

export const { addToProjects, removeFromProjects, toggleProjectDone } =
	ProjectsSlice.actions;

export default ProjectsSlice.reducer;
