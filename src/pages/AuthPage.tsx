import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import LogInComponent from "../components/Auth/LogInComponent";

const supabase = createClient(
	"https://ersihsrulpuwhyljhwnc.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyc2loc3J1bHB1d2h5bGpod25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NjM2ODMsImV4cCI6MjAwMzUzOTY4M30.uGjEAqvwQxxosa7u1vR6W9Loli_RHPks5TKTh_BN4TQ"
);

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

	if (!session) {
		return (
			<LogInComponent
				session={session}
				setSession={setSession}
				supabase={supabase}
			></LogInComponent>
		);
	} else {
		return (
			<button
				onClick={async () => {
					await supabase.auth.signOut();
				}}
			>
				Log out
			</button>
		);
	}
};

export default AuthPage;
