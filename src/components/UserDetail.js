import React, {useState, useEffect} from 'react';

function UserDetail({match}) {

    useEffect(()=>{
        fetchUser();

    console.log(match.params.id);
    });

    const [user, setUser] = useState({
        
    });
    const fetchUser = async() => {

        const data = await fetch("https://reqres.in/api/users/"+match.params.id);
        const user = await data.json();
        console.log(user.data);
        setUser(user.data);
    }

  return (
    <div>
        <h1 key={user.id}>
                {user.first_name}
        </h1>
        <img src={user.avatar} alt=""/>
    </div>
  );
}

export default UserDetail;
