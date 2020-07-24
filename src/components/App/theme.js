import { createMuiTheme }  from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#00446b' },
    secondary:{"main": '#022c42' }   
  },
  shape: {
    borderRadius:0
  }
})
export default theme