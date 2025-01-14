//Some authservices which fetches the endpoints in the backend
export default {
    login : user => {
        return fetch('/user/login' , {
            method:"post",
            body:JSON.stringify(user),
            headers:{
                'Content-type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated : false , user : {username : "" , role : "" }};
        })
    },
    register : user => {
        return fetch('/user/register' , {
            method:"post",
            body:JSON.stringify(user),
            headers:{
                'Content-type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    logout : () => {
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated : () => {
        return fetch('/user/authenticated')
                .then(res => {
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated : false , user : {username : "" , role : "" }};
                })
    }
    //syncing the backend and the frontend together so that the application persists even if the react application is closed
}