/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'Montserrat' : ['Montserrat', 'sans-serif'],
      },
      fontSize : {
        'xs' : '12px',
        'sm' : '14px',
        'base' : '16px',
        'lg' : '18px',
        'xl' : '22px',
        'title' :  '28px',
      },
      colors : {
        'primary' : '#1FDA00',
        'secondary' : '#BDC8BB',
        'gray' :{
          '100' : '#FAFAFA',
          '200' : '#C5C5C5',
          '300' : '#474747',
          '400' : '#2A2A2A',
          '500' : '#1E1E1E'
        },
        'text' : {
          'disabled': '#EBEBEB',
          'input' : '#252525',
          'plain' : '#1A1A1A'
        },
        'system' : {
          'background': '#222222',
          'error' : '#F33C3D',
          'black' : '#000000',
          'white' : '#FFFFFF',
        }
        }
      },

      },
  plugins: [],
}