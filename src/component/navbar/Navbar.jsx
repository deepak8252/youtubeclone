import React from 'react'
import "./navbar.css"
import Menu_icon from "../../assets/menu.png";
import Logo from "../../assets/logo.png";
import searchicon from "../../assets/search.png";
import uploadicon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification from "../../assets/notification.png";
import profile from "../../assets/jack.png"
import { Link } from 'react-router-dom';
const Navbar = ({setSidebar}) => {
  return (
<>
<nav className="flex-div">
    <div className="nav-left flex-div">
<img src={Menu_icon} alt="menu" className='menu-icon' onClick={()=>setSidebar(prev=>prev===false?true:false)} />
<Link to="/">
<img src={Logo} alt="logo" className='logo'/>
</Link>
    </div>
    <div className="nav-middle flex-div">
        <div className="search-box flex-div">
        <input type="text" placeholder='search' />
<img src={searchicon} alt="" />
        </div>
    </div>
    <div className="nav-right flex-div">
<img src={uploadicon} alt="" />
<img src={more_icon} alt="" />
<img src={notification} alt="" />
<img src={profile} alt="" className='user-icon' />
    </div>
</nav>
</>
  )
}

export default Navbar