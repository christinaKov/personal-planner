export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					full_name: string | null;
					id: string;
					updated_at: string | null;
					username: string | null;
				};
				Insert: {
					full_name?: string | null;
					id: string;
					updated_at?: string | null;
					username?: string | null;
				};
				Update: {
					full_name?: string | null;
					id?: string;
					updated_at?: string | null;
					username?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey";
						columns: ["id"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			tasks: {
				Row: {
					created_at: string | null;
					id: string;
					is_done: boolean;
					task_title: string | null;
					user_id: string | null;
				};
				Insert: {
					created_at?: string | null;
					id?: string;
					is_done?: boolean;
					task_title?: string | null;
					user_id?: string | null;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					is_done?: boolean;
					task_title?: string | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "tasks_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
