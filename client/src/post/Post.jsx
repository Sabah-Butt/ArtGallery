import axios from "axios"
import "./post.css"

import {Context} from "../context/Context";
import  {useContext} from "react";
import {useState} from "react";
import { Card } from "react-bootstrap";


export default function Post({iconName, title, description, username, id}) {
    const {user} = useContext(Context);
    const [updateMode, setUpdateMode] = useState(false);
    const [tit, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleDelete = async()=>{
        try{
            await axios.delete(`http://localhost:5000/api/posts/${id}`, {
            data: { username: user.username },
        });
        window.location.replace("/");
    }catch(err){

        }
    }

    const handleUpdate = async()=>{
        console.log(user.username);

        try{
            await axios.put(`http://localhost:5000/api/posts/${id}`, {
             username: user.username,
             tit,
             desc,
          
            
        });
        setUpdateMode(false)
        window.location.replace("/posts");

    }catch(err){

        }
    }
    console.log(username);
    console.log(tit);
    console.log(desc);
    return (
        <div className="post">
          <Card style={{width:'auto', height:'auto'}}>
            <Card.Img variant="top" src={iconName}  />
              <Card.Body>
              {updateMode ?(
                <div>
                  <input
                    type="text"
                    value={tit}
                    className="card-title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              ):(
                <Card.Title className="card-title">{title}</Card.Title>
              )}
              {updateMode ? (
                <div>
                  <textarea
                    className="card-text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              ):(
                <Card.Text className="card-text">{description}</Card.Text>
              )}
              {updateMode ? (
                (updateMode && (
                  <div className="card-button">
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                    <button className="singlePostButton" onClick={() => setUpdateMode(false)}>Cancel</button>
                  </div>

                ))
              ):(
                (username && 
                  <div className="singlePostEdit d-flex justify-content-between">
                    <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)} ></i>
                    <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                  </div>)
              )}
              
            
              

              
            </Card.Body>
          </Card>
        </div>
    )
}
