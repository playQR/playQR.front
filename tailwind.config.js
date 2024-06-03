/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'yspotlight' :'Y_Spotlight'
      },
      fontSize : {
        'pxs' : '12px',
        'psm' : '14px',
        'pmd' : '16px',
        'plg' : '18px',
        'pxl' : '22px',
        'ptitle' :  '28px',
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