// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
    plugins: ['prettier-plugin-tailwindcss'],
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
};

module.exports = config;
