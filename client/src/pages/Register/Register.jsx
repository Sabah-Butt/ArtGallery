import "./register.css"
import axios from "axios";
import {useState} from "react";
import Footer from "../../Components/footer/Footer";

export default function Register() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError(false);
            try{
                const res = await axios.post("http://localhost:5000/api/auth/register",{
                    username,
                    email,
                    password,
                });
                res.data && window.location.replace("/login");
            }catch(err){
                setError(true);
                console.error(err);
        
            }
            
        }
    
    
        

    return (
        <>
        <div className="register">
            <span className="registerTitle">REGISTER</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>USERNAME</label>
                <input type="text" className="registerInput" placeholder="Enter your username"
                    onChange={e=>setUsername(e.target.value)}
                    />
                <label>EMAIL</label>
                <input type="text" className="registerInput" placeholder="Enter your email"
                    onChange={e=>setEmail(e.target.value)}
                    />
                <label>PASSWORD</label>
                <input type="password" className="registerInput" placeholder="Enter your password"
                    onChange={e=>setPassword(e.target.value)}
                    />
                <button className="registerButton" type="submit">REGISTER</button>
                <p style={{marginTop:"10%", fontSize:"15px",marginBottom:"1%"}}>If you have an account, log in now!</p>

                <button className="RegisterloginButton">LOG-IN</button>

            </form>
            {error && <span>Something went Wring!</span>}
        </div>
        <Footer/>
        </>
    )
}
