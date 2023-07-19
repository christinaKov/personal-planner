import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://ersihsrulpuwhyljhwnc.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyc2loc3J1bHB1d2h5bGpod25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NjM2ODMsImV4cCI6MjAwMzUzOTY4M30.uGjEAqvwQxxosa7u1vR6W9Loli_RHPks5TKTh_BN4TQ"
);
