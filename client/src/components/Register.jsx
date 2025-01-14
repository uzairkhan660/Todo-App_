import React , {useState , useRef , useEffect} from 'react';
import { Grid , TextField , Divider , Button ,useMediaQuery  } from '@material-ui/core';
import { makeStyles , useTheme } from '@material-ui/core/styles';
import AuthService from '../services/AuthService';
import Message from './Message';

const useStyles = makeStyles(() => ({
    parentDiv : {
      width : "100%",
      height : "100%",
      display : "flex",
      justifyContent : "center" ,
      alignContent : "center" ,
      alignItems: "center" ,
    }
}));

export default function Register(props){

  const [user, setUser] = useState({ username : "" , password : "" , role: ""});
  const [message , setMessage] = useState(null);
  let timerId = useRef(null);

  useEffect(() => {
    return ()=>{
      clearTimeout(timerId);
    }
  } , []);

  const resetForm = () => {
    setUser({username:"" , password:"" , role:"" });
  }

  const onChange = e => {
    setUser({ ...user , [e.target.name] : e.target.value});
  }

  const submitHandler = (e) => {
    e.preventDefault();
    AuthService.register(user).then(data => {
      const {message} = data;
      setMessage(message);
      resetForm();
     if(!message.msgError){
         timerId = setTimeout(() => {
         props.history.push('/login');
       },2000)
     }
    })
  }

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const width = matches ? "60vw" : "30vw" ;
  return(
    <div className={classes.parentDiv}>
      <Grid style={{width : width }} container direction="column" justify="center">
      <h3 style={{textAlign : "center" , color : "red"}}>SIGN UP !</h3>
      <form onSubmit = {submitHandler}>  
        <TextField required value={user.username} onChange={onChange} name="username" style={{width : width , margin : "5px" }} variant="outlined" label="Enter username" type= "text" />
        <TextField required value={user.password} onChange={onChange} name="password" style={{width : width , margin : "5px" }} variant="outlined" label="Enter password" type="password" />
        <TextField required value={user.role} onChange={onChange} name="role" style={{width : width , margin : "5px" }} variant="outlined" label="Enter - admin or user" type="text" />
        <Button type = "submit" style={{width : width , margin : "5px" }} variant="contained" color="secondary">Sign Up</Button>
      </form>
      {message ? <Message message={message}/> : null}
      </Grid>
    </div>
  )
}