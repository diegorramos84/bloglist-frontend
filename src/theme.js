import { orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#764abc'
    },
    secondary: {
      main: '#ffffff',

    },
    dark: {
      main: '#212121',
    },
    myColor: {
      main: orange[500]
    }
  },
})

export default theme
