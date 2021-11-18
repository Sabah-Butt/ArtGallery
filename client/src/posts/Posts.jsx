import Post from "../post/Post"
import "./posts.css"
import axios from "axios";
import {useEffect, useState} from "react";
import {Context} from "../context/Context";
import  {useContext} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Heading from "../Components/heading/Heading";
import Footer from "../Components/footer/Footer";

export default function Posts() {
    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context);

    const [posts,setPosts] = useState([]);
    const fetchPosts = async()=>{
        if(posts === null){
            return <p>Loading progile...</p>
        }
        const res = await axios.get("http://localhost:5000/api/posts");
        console.log("hello");
        setPosts(res.data);
    };
    useEffect(() => {
        
        console.log("CHCK CHCK");
        fetchPosts();
    }, []);
    
    
    return (
        
        <>
        <Heading
            titleSm="Creavtive World"
            titleLg="Explore Page"
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
            {!user && posts && posts.map((p)=>(
                
                <Post
                    iconName={PF+ p.photo}
                    title={p.title}
                    description={p.desc}
                    id={p._id}
                />
                
            ))}
            
            </Masonry>
            </ResponsiveMasonry>
            <Footer/>
</>           
        
    )
}
