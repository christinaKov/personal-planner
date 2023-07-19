// React
import { useState, useEffect } from "react";

// Components
import LogInComponent from "../components/Auth/LogInComponent";

// Styles
import { Box, Button } from "@mui/material";

// Supabase
import { supabase } from "../app/utils";
import { Session } from "@supabase/supabase-js";

const AuthPage = () => {
	const [session, setSession] = useState<Session | null>(null!);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

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
				<Button
					onClick={async () => {
						await supabase.auth.signOut();
					}}
				>
					Log out
				</Button>
			) : (
				<LogInComponent
					session={session}
					setSession={setSession}
					supabase={supabase}
				></LogInComponent>
			)}
		</Box>
	);
};

export default AuthPage;
