import "./header.css"

export default function Header({titleSm, titleLg, iconName}) {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">{titleSm}</span>
                <span className="headerTitleLg">{titleLg}</span>
            </div>
            <img className="headerImg"
                src={`${process.env.PUBLIC_URL}/assets/${iconName}.jpg`}
            />
        </div>
    )
} 
