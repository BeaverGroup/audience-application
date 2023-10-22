import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./vertical_nav_icon.css";

function VerticalNavIcon(props) {
    const { navigate } = props;
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const element = document.getElementById(`${navigate.id}`);
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
    }, [navigate.id]);

    return (
        <li>
            <div className="image-icon">
                <Link to={navigate.to} id={navigate.id}>
                    <img src={navigate.icon} alt="" />
                    <span className={hovered ? "open" : ""}>{navigate.name}</span>
                </Link>
            </div>
        </li>
    );
}

export default VerticalNavIcon;
