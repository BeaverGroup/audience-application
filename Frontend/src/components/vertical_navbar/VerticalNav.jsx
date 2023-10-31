import "./vertical_nav.css";
import VerticalNavIcon from "../vertical_nav_icon/VerticalNavIcon";
import contents from "../../data/navbarContent";

function VerticalNav() {

    return (
        <div>
            <nav className="vertical-nav">
                <ul className="navigate">
                    {contents.map((content, index) => {
                        return <VerticalNavIcon navigate={content} key={index} />;
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default VerticalNav;
