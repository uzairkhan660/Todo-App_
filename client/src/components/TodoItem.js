import React , {useState} from 'react';
import { ListItem , ListItemText , ListItemAvatar , ListItemSecondaryAction , IconButton} from '@material-ui/core';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    strike : {
        textDecoration : "line-through",
    }
}));

export default function TodoItem(props){

    const classes = useStyles();
    const [done , setDone] = useState(false);

    return (
        <ListItem className={done ? classes.strike : null }>
            <ListItemAvatar>                
                <ArrowRightRoundedIcon />
            </ListItemAvatar>
            <ListItemText primary={props.todo.name} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="done" onClick={() => setDone(!done)} >
                    <DoneIcon />
                </IconButton>
                <IconButton  onClick={() => props.delTodo(props.todo)} edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}



