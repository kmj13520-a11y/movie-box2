import { Link, NavLink } from "react-router-dom";
import Fire from "../../assets/fire.png";
import Star from "../../assets/glowing-star.png";
import Party from "../../assets/partying-face.png";
import DarkMode from "../DarkMode/DarkMode";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>🎥영화상자🎬</h1>

      <div className="navbar_links">
        <DarkMode />
        <NavLink to="/">
          인기작품
          <img className="navbar_emoji" src={Fire} alt="fire emoji" />
        </NavLink>
        <NavLink to="/top_rated">
          최고평점
          <img className="navbar_emoji" src={Star} alt="star emoji" />
        </NavLink>
        <NavLink to="/upcoming">
          예정작품
          <img className="navbar_emoji" src={Party} alt="party emoji" />
        </NavLink>
      </div>
    </nav>
  );
}
