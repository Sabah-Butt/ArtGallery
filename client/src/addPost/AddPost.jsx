import "./AddPost.css"
import  {useContext} from "react";
import {Context} from "../context/Context";
import axios from "axios";
import { useState} from "react";
import Heading from "../Components/heading/Heading";
import Footer from "../Components/footer/Footer";


export default function AddPost() {
    const [title,setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const[file, setFile] = useState(null);
    const {user} = useContext(Context);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newPost = {
            username : user.username,
            title,
            desc,
        };
        console.log({newPost});
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try{
                await axios.post("/upload", data);
            }catch(err){

            }
        }
        try{
            const res = await axios.post("http://localhost:5000/api/posts/create", newPost);
            console.log({res});
            window.location.replace("/posts");
        }catch(err){
            
        }

    }
    
    
    return (
<>
        <Heading
                titleSm="Creavtive World"
                titleLg="Add a Post"
            />
        <div className="AddPost">
            
            {file && (
                <img
                className="image"
                src={URL.createObjectURL(file)}
            />
            )}
            
            <form className="addform" onSubmit={handleSubmit}>
                <div className="addformgroup">
                    
                    <input type="file" id="fileinput" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="addformgroup">
                <input type="text" placeholder="title" className="filetext" autoFocus={true} onChange={e=>setTitle(e.target.value)}/>
                </div>
                <div className="addformgroup">
                <textarea placeholder="description..." type="text" className="filetext textarea"  onChange={e=>setDesc(e.target.value)}></textarea>
                </div>

                <button className="postSubmit" type="submit">PUBLISH</button>
            </form>
            
        </div>
        <Footer/>
        </>
    )
}
