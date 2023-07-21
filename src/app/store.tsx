import { configureStore } from "@reduxjs/toolkit";
import QuickTasksReducer from "./slices/tasksSlice";
import ProjectsReducer from "./slices/projectsSlice";
import Schedulereducer from "./slices/scheduleSlice";
import AuthReducer from "./slices/authSlice";

export const store = configureStore({
	reducer: {
		quickTasks: QuickTasksReducer,
		projects: ProjectsReducer,
		schedule: Schedulereducer,
		authInfo: AuthReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
