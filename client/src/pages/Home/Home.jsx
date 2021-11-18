import Header from "../../Components/header/Header";
import Footer from "../../Components/footer/Footer";
import {Context} from "../../context/Context";
import  {useContext} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import "./home.css";
import Post from "../../post/Post"


import axios from "axios";
import {useEffect, useState} from "react";

export default function Home() {
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
    console.log("hello");

    return (
        <>
        <div className="home">
            <Header 
                titleSm="Art"
                titleLg="Creative World"
                iconName="header2"            
            />
          
            <div className="feed">
               <h3 style={{marginBottom:'2%', fontWeight:'bold'}}>The Art Feed</h3>
               <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
                 >
                        <Masonry >
                    {user && posts && posts.map((p)=>(
                                //    <Col>  
        
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
 
                
            </div>
            <Footer/>
            </div>
        </>
    )
}
