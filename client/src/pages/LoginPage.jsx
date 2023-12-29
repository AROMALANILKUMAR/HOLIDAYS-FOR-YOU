import {Link, Navigate, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import { login } from "../apiCalls/userApi";

export default function LoginPage() {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try{
      console.log("login api working");
      const res = await login({email,password})
      setUser(res.data.user)
      localStorage.setItem("userToken",res.data.token)
      alert(res.data.message)
      navigate('/')

  }catch(e){
      console.log("error",e);
      alert('Login Failed')
  }
}

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}