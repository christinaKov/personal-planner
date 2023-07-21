// React
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

// Components
import LogInComponent from "../components/Auth/LogInComponent";

// Styles
import { Box, Button } from "@mui/material";

// Auth
import { fetchSession, supabase } from "../app/slices/authSlice";

const AuthPage = () => {
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	useEffect(() => {
		dispatch(fetchSession());
	}, [dispatch]);

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Ошибка при выходе:", error);
		} else {
			dispatch(fetchSession());
		}
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="70vh"
			gap="3vw"
		>
			{session ? (
				<Button onClick={handleSignOut}>Log out</Button>
			) : (
				<LogInComponent></LogInComponent>
			)}
		</Box>
	);
};

export default AuthPage;
