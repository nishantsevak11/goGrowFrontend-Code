import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
    
    const [loginPageSelected, setloginPageSelected] = useState(true);



    return (
    <div>
       {loginPageSelected ? 
        <div>
          <Login setloginPageSelected = {setloginPageSelected}/>
        </div>:
        <div>
          <Register setloginPageSelected= {setloginPageSelected}/>
        </div>
      }
    </div>
    // <Register/>
  )
}

export default AuthPage