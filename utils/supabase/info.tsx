// utils/supabase/info.tsx

export const projectId = "cobpfldkzfrxapsomwrc"
export const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvYnBmbGRremZyeGFwc29td3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjI3MDksImV4cCI6MjA3OTIzODcwOX0.eQJtt2HwtvTEEY78Lvs5T1m7UtJOCiyogKFDfEEK0pc"

// Add const for Server
export const SUPABASE_URL = `https://${projectId}.supabase.co`;
export const EDGE_FUNCTION_NAME = "server";
export const EDGE_FUNCTION_BASE_URL = `${SUPABASE_URL}/functions/v1/${EDGE_FUNCTION_NAME}`;