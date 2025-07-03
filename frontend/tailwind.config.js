module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'neon-blue': '#00f0ff',
        'neon-pink': '#ff00f7',
        'neon-yellow': '#f7ff00',
        'cyber': '#e0e0e0',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 10px #39ff14, 0 0 20px #39ff14',
      },
    },
  },
  plugins: [],
}
