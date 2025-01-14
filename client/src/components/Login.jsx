import React , {useContext , useState} from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter as Router , Link , Switch } from 'react-router-dom';
import { Grid , TextField , Button ,useMediaQuery } from '@material-ui/core';
import { makeStyles , useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    adjustMargin:{
        margin: "5px",
      },
    parentDiv : {
      width : "100%",
      height : "100%",
      display : "flex",
      justifyContent : "center" ,
      alignContent : "center" ,
      alignItems: "center" ,
    }
}));

export default function Login(props){

  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({ username : "" , password : ""});
  const [message , setMessage] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const width = matches ? "60vw" : "30vw" ;

  const onChange = e => {
    setUser({ ...user , [e.target.name] : e.target.value});
  }
  const submitHandler = (e) => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      const {isAuthenticated , user , message} = data;
      if(isAuthenticated){
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/todos');
      }
      else setMessage(message);
    })

  }
  return(
    <div className={classes.parentDiv}>
      <Grid style={{width : width }} container direction="column" justify="center">
      <h3 style={{textAlign : "center" , color : "red"}}>SIGN IN !</h3>
      <form onSubmit = {submitHandler}>  
          <TextField onChange={onChange} required style={{width : width , margin : "5px" }} variant="outlined" name="username" label="Enter username" type= "text" />
          <TextField onChange={onChange} required style={{width : width , margin : "5px" }} variant="outlined" name="password" label="Enter password" type="password" />
          <Button type="submit" style={{width : width , margin : "5px" }} variant="contained" color="secondary">Sign In</Button>
      </form>
      <Link to="/register">
        <div><p style={{width : width , textAlign : "center"}}>Don't have an account ? Create one now !</p></div>
      </Link>
      {message ? <Message message={message}/> : null}
      </Grid>
    </div> 
  )
}
{/* <Divider style={{ margin : "15px"}}/>
      <Button className={classes.adjustMargin} variant="contained" color="secondary">Sign in with Google</Button>
      <Button className={classes.adjustMargin} variant="contained" color="primary">Sign in with Facebook</Button>  */}
