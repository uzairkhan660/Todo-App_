import React , {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  buttonColor:{
    color : "white"
  }
}));

export default function Navbar() {

  const classes = useStyles();
  const {isAuthenticated , user , setIsAuthenticated , setUser} = useContext(AuthContext);

  const logoutHandler = () => {
      AuthService.logout().then(data => {
        if(data.success){
          setUser(data.user);
          setIsAuthenticated(false);
        }
      })
  }

  const UnAuthenticatedUser = () => {
    return (
      <>
         <Button href = "/login" className={classes.buttonColor}>Login</Button>
         <Button href = "/register" className={classes.buttonColor}>Create Account</Button>
      </>
    )
  }

  const authenticatedUser = () => {
    return (
      <>
        <Button href = "/todos" className={classes.buttonColor}>Todos</Button>
        { user.role === 'admin' ? <Button href = "/admin" className={classes.buttonColor}>Admin</Button> : null }
        <Button onClick = {logoutHandler} className={classes.buttonColor}>Logout</Button>
      </>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todo Maker
          </Typography>
          <Button href = "/" className={classes.buttonColor}>Home</Button>
          {isAuthenticated ? authenticatedUser() : UnAuthenticatedUser()}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
