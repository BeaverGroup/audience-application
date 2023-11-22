import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./vertical_nav_icon.css";

function VerticalNavIcon(props) {
    const { navigate: content } = props;
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        // add mouseove and mouseout to check hover
        const element = document.getElementById(`${content.id}`);
        function handleMouseOver() {
            setHovered(true);
        }

        function handleMouseOut() {
            setHovered(false);
        }

        element.addEventListener("mouseover", handleMouseOver);
        element.addEventListener("mouseout", handleMouseOut);

        return () => {
            element.removeEventListener("mouseover", handleMouseOver);
            element.removeEventListener("mouseout", handleMouseOut);
        };
    }, [content.id]);

    const handleScroll = () => {
        const element = document.getElementById("sprots-scroll");
        element.scrollIntoView();
    }

    return (
        <li>
            <div className="image-icon">
                <Link to={content.to} id={content.id} onClick={handleScroll}>
                    <img src={content.icon} alt="" />
                    <span className={hovered ? "open" : ""}>{content.name}</span>
                </Link>
            </div>
        </li>
    );
}

export default VerticalNavIcon;
