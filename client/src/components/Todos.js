import React , { useState , useContext , useEffect } from 'react';
import TodoService from '../services/TodoService';
import { AuthContext } from "../context/AuthContext";
import { List , OutlinedInput , InputAdornment , IconButton ,  Grid , TextField , Divider , Button ,useMediaQuery } from '@material-ui/core';
import { makeStyles , useTheme } from '@material-ui/core/styles';
import Message from "./Message";
import TodoItem from "./TodoItem";
import AddCircleIcon from '@material-ui/icons/AddCircle';

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

export default function Todos(props){

    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const width = matches ? "60vw" : "30vw" ;
    const [todo , setTodo] = useState({name : ""});
    const [todos , setTodos] = useState([]);
    const [hide , setHide] = useState(true);
    const [message , setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        TodoService.getTodos().then(data => {
            setTodos(data.todos);
            setMessage(message);
        })
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setHide(true) , 4000);
        return () => {
            clearInterval(interval);
            setHide(false);
        }
    } , [message])

    const submitHandler = e => {
        e.preventDefault();
        //if the client successfully creates a todo
        TodoService.postTodo(todo).then(data => {
            const {message} = data;
            resetForm();
            if(!message.msgError){
                TodoService.getTodos().then(data => {
                    setTodos(data.todos);
                    setMessage(message);
                })
            }//if the jwt token expires
            if(message.msgBody === "Unauthorized"){
                setMessage(message);
                authContext.setUser({username : "" , role : ""});
                authContext.setIsAuthenticated(false);
            }
            else setMessage(message);//An error message
        })
    }

    const delTodo = (todo) => {
        TodoService.removeTodo(todo).then(data => {
            const { message } = data;
            if(!message.msgError){
                TodoService.getTodos().then(data => {
                    setTodos(data.todos);
                    setMessage(message);
                })
            }
        })
    }
    
    const onChange = e => {
        setTodo({name : e.target.value});
    }

    const resetForm = () => {
        setTodo({name : ""});
    }


    return (
        <div className={classes.parentDiv}>
        <Grid style={{width : width }} container direction="column" justify="center">
            <List>
              {todos.map( todo => <TodoItem key={todo._id} todo={todo} delTodo={delTodo} />
              )}
            </List>
            <br />
            <form onSubmit = {submitHandler}>  
                <OutlinedInput autoFocus required value={todo.name} onChange={onChange} name="todo" 
                style={{width : width , margin : "5px" }} placeholder="Enter todo" 
                type= "text" 
                endAdornment={
                <InputAdornment position="end">
                    <IconButton type="submit">
                        <AddCircleIcon />
                    </IconButton>
                </InputAdornment>
                 }/>
            </form>
            {hide ? null : (message ? <Message message={message}/> : null)}
        </Grid>
        </div>
    )
}

//<Button type = "submit" style={{width : width , margin : "5px" }} variant="contained" color="primary">Add</Button>