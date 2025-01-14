export default  {
    getTodos : () => {
        return fetch('/user/todos')
                .then(res => {
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return {message : {msgBody : "Unauthorized" , msgError : true}};
                });
    },
    postTodo : todo => {
        return fetch('/user/todo' , {
            method : "post",
            body: JSON.stringify(todo),
            headers:{
                'Content-type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401)
                return res.json().then(data => data);
            else
                return {message : {msgBody : "Unauthorized" , msgError : true}};
        });
    },
    removeTodo : todo => {
        return fetch('/user/removeTodo',{
                method:"delete",
                body: JSON.stringify(todo),
                headers:{
                    'Content-type': 'application/json'
                }
            }).then(res => {
                if(res.status !== 401)
                       return res.json().then(data => data);
                else
                       return {message : {msgBody : "Unauthorized" , msgError : true}};
            });
    }
}
        