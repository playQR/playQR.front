import { Toaster } from 'react-hot-toast'

type Props = {}

const CustomToast = (props: Props) => {
  return (
    <Toaster
                  position="bottom-center"
                  reverseOrder={false}
                  gutter={8}
                  containerClassName=""
                  containerStyle={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 150,
                  }}
                  toastOptions={{
                    // Define default options
                    className: '',
                    duration: 3000,
                    style: {
                      background: 'rgb(0 0 0 / 70%)',
                      color: '#fff',
                      opacity : '0.7'
                    },

                    // Default options for specific types
                    success: {
                      duration: 3000,
                    },
                  }}
                />
  )
}

export default CustomToast