/* */

/* When we send the token inside the link to the email by default it gives an 404 error when we click
   on that link to avoid that error we have to use some things :

   1. We have to install vite-plugin-rewrite-all

   2. And use pluginRewriteAll() function inside plugins in the vite.config.js file.
    
*/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  /* */

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        secure: false,
      },
    },
  },

  /* */
  plugins: [react(), pluginRewriteAll()],
});
