import "./heading.css"

export default function Header({titleLg}) {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleLg">{titleLg}</span>
            </div>
            <hr className="line"></hr>
        </div>
    )
} 
