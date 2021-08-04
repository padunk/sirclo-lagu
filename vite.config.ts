import dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [...(process.env.NODE_ENV !== "test" ? [reactRefresh()] : [])],
    define: {
        "process.env.VITE_LAST_FM_API_KEY": `"${process.env.VITE_LAST_FM_API_KEY}"`,
    },
});
