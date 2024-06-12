/** @type {import('tailwindcss').Config.theme} */
const TailwindTheme = {
  fontFamily: {
    sans: ["Myriad Pro", "sans-serif"],
  },
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-font-loader"],
  devtools: { enabled: true },
  fontLoader: {
    local: [
      {
        src: "/fonts/MyriadPro-Regular.otf",
        family: "Myriad Pro",
      }
    ]
  },
  app: {
    head: {
      viewport: "width=device-width, initial-scale=1, minimum-scale=1",
    }
  },
  tailwindcss: {
    editorSupport: true,
    // cssPath: "~/assets/css/global.css",
    config: {
      corePlugins: {
        // preflight: false,
      },
      theme: {
        extend: TailwindTheme,
      },
      plugins: [
        // require('@tailwindcss/typography'),
        // ...
      ],
    },
  }
})