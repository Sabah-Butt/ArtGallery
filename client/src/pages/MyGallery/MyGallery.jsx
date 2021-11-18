import "./mygallery.css";
import Heading from "../../Components/heading/Heading";

import React from 'react'
import Post from "../../post/Post"
import axios from "axios";
import {useEffect, useState} from "react";
import {Context} from "../../context/Context";
import  {useContext} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Footer from "../../Components/footer/Footer";


export default function MyGallery() {
    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context);

    const [posts,setPosts] = useState([]);
    const fetchPosts = async()=>{
        
        if(posts === null){
            return <p>Loading progile...</p>
        }
        try{
            const res = await axios.get(`http://localhost:5000/api/posts/myposts/${user.username}`);
            
            console.log("hello",res.data);
            setPosts(res.data);
        }catch(err){
            console.log("nope");
        }
       

    };
    console.log(user._id);
    console.log(user.username);
    useEffect(() => {
        
        console.log("CHCK CHCK");
        fetchPosts();
    }, []);


    return (
        <>
        <div>
           
            <Heading
                titleLg="MY ART COLLECTION"
            />
            <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
    >
                <Masonry >

                {user && posts && posts.map((p)=>(

                    <Post
                        iconName={PF+ p.photo}
                        title={p.title}
                        description={p.desc}
                        username = {p.username === user.username}
                        id={p._id}
                    />
                ))}

        </Masonry>
        </ResponsiveMasonry>
        </div>
        <Footer/>
        </>
    )
}
