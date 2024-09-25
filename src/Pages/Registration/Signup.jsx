import React, { useContext, useState } from "react";
import { NavLink, useNavigate,  } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { Context } from "../../Context/ContextApi";
import Loader from "../../Components/Loader/Loader";

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { loading, setLoading} = useContext(Context);

  const navigate = useNavigate();

const signup = async () => {
 setLoading(true)
  if(name === "" || email === "" || password == ""){
    return toast.error("All fields are require");
  }

  try {
    
    const users = await createUserWithEmailAndPassword(auth, email, password);
    console.log(users);
    const user = {
      name: name,
      uid: users.user.uid,
      email: email,
      time: Timestamp.now()
    }
    const useRef = collection(fireDB, "users");
    await addDoc(useRef, user)
    setEmail("")
    setName("")
    setPassword("")
    toast.success("Signup Successfully")
    setLoading(false)
    navigate('/login')
  } catch (error) {
    toast.error("All ready signup this email");
    setLoading(false);
  }

}

  return (
    <div className="h-[90vh] flex items-center justify-center ">
      { loading && <Loader/>}
      <div className="flex flex-col  bg-black text-white p-[44px] rounded-[10px] gap-6  items-center justify-center">
        <p className="text-xl font-bold">Signup</p>
        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
          className="px-4 rounded-md  bg-white/[0.3] p-1 w-full"
          type="text"
          placeholder="Name"
        />
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
        <button className="bg-red-500 px-4 py-1 w-full rounded-md" onClick={signup}>
          Signup
        </button>
        <p>
          Have An Account {" "}
          <NavLink to="/login" className=" text-red-500 font-extrabold">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
