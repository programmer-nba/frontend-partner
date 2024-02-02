/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/LoginView.vue',
    './src/components/template/NavbarPartner.vue',
    './src/components/partner/HomeNewPartner.vue',

  ],  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss")],
}

