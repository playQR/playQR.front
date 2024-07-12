/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'yspotlight' :'Y_Spotlight',
        'montserrat' : 'Montserrat',
      },
      fontSize : {
        'pxxs' : '10px',
        'pxs' : '12px',
        'psm' : '14px',
        'pmd' : '16px',
        'plg' : '18px',
        'pxl' : '22px',
        'ptitle' :  '28px',
        'plogo' : '26px'
      },
      colors : {
        'primary' : '#1FDA00',
        'secondary' : '#BDC8BB',
        'gray' :{
          '1' : '#FAFAFA',
          '2' : '#C5C5C5',
          '3' : '#474747',
          '4' : '#2A2A2A',
          '5' : '#1E1E1E'
        },
        'text' : {
          'disabled': '#CCCCCC',
          'input' : '#252525',
          'plain' : '#1A1A1A'
        },
        'system' : {
          'background': '#222222',
          'error' : '#F33C3D',
          'black' : '#000000',
          'white' : '#FFFFFF',
        }
        },
        'border-radius' : {
          '20px' : '20px'
        },
        margin : {
          '6px' : '6px',
          '10px' : '10px',
          '14px' : '14px',
          '18px' : '18px',
          '34px' : '34px',
          '30px' : '30px',
          '50px' : '50px',
          '350px' : '350px',
        }
        ,width : {
          '38px' : '38px',
          '60px' : '60px',
          '22px' : '22px',
          '18px' : '18px',
          '75px' : '75px',
          '114px':'114px',
          '300px' : '300px',
          '640px': '640px',
          '768px' : '768px'
        },height : {
          '4px' : '4px',
          '10px' : '10px',
          '38px' : '38px',
          '22px' : '22px',
          '30px' : '30px',
          '36px' : '36px',
          '42px' : '42px',
          '45px' : '45px',
          '46px' : '46px',
          '48px' : '48px',
          '100px' : '100px',
          '114px' : '114px',
          '140px' : '140px',
          '200px' : '200px',
          '268px' : '268px',
          '300px' : '300px',
          '350px' : '350px',
          '0.4px' : '0.4px',
        },
        padding : {
          '10px' : '10px',
          '14px' : '14px',
          '54px' : '54px',
          '22px' : '22px',
          '6px' : '6px',
          '20px' : '20px',
        },
        top : {
          '10px' : '10px'
        },
        right : {
          '10px' : '10px'
        },bottom : {
          '54px' : '54px'
        },
        borderRadius : {
          '5px' : '5px',
        },
        borderWidth : {
          '1px' : '1px',
        }
      },

      },
  plugins: [],
}