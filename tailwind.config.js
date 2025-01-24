/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // colors: {},
    fontFamily: {
      sans: ["Pretendard-Regular", "sans-serif"], // 기본 폰트로 설정
      // serif: ['Merriweather', 'serif'],
    },
    fontSize: {
      sm: "14px",
      base: "10px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
    },
    extend: {
      spacing: {
        // '8xl': '96rem',
        // '9xl': '128rem',
      },
      borderRadius: {
        // '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
