import { createClient } from "@supabase/supabase-js";

const client = createClient(
	process.env.SUPABASE_URL as string,
	process.env.SUPABASE_API_KEY as string
);

export const getClient = () => client;
