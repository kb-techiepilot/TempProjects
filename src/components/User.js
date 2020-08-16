import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

function User() {

    useEffect(()=>{
        fetchUsers();
    },[]);

    const [users, setUsers] = useState([]);
    const fetchUsers = async() => {

        const data = await fetch("https://reqres.in/api/users?page=1");
        const users = await data.json();
        console.log(users.data);
        setUsers(users.data);
    }

  return (
    <div>
      {users.map(user => (
            <h1 key={user.id}>
                <Link to={`/user/${user.id}`}>
                    {user.first_name}
                </Link>
            </h1>
      ))}
    </div>
  );
}

export default User;
