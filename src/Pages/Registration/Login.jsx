import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../Context/ContextApi";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import Loader from "../../Components/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {loading, setLoading} = useContext(Context);
  // const navigate = useNavigate();


  const login = async () => {
  setLoading(true)
   if(email === "" || password === ""){
    toast.error("All fields are requires")
   }
   try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user", JSON.stringify(result) )
    toast.success("Signin Successfully");
    // navigate('/');
    window.location.href = "/"
    setLoading(false)
   } catch (error) {
    toast.error("invalid-credential");
    setLoading(false)
   }
  }
  return (
    <div className="h-[90vh] flex items-center justify-center ">
      { loading && <Loader/>}
      <div className="flex flex-col  bg-black text-white p-[44px] rounded-[10px] gap-6  items-center justify-center">
        <p className="text-xl font-bold">Login</p>
        <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
          className="px-4 rounded-md  bg-white/[0.3] p-1 w-full"
          type="text"
          placeholder="Email"
        />
        <input
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
          className="px-4 rounded-md bg-white/[0.3]  p-1 w-full"
          type="password"
          placeholder="Password"
        />
        <button className="bg-yellow-600 px-4 py-1 w-full rounded-md" onClick={login}>
          Submit
        </button>
        <p>
          Don`t Have An Account{" "}
          <NavLink to="/signup" className="text-yellow-600 font-extrabold">
            Signup
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
