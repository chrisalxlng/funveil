import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [
    devtoolsJson(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide",
      strategy: ["preferredLanguage", "baseLocale"]
    }),
    sveltekit(),
    tailwindcss(),
    Icons({
      compiler: "svelte"
    })
  ]
});
