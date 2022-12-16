import React from "react";
import ReactDOM from "react-dom";

function Footer(){
    const currentYear=new Date().getFullYear();
    return <footer>
               <p>Copyright ⓒ {currentYear}</p>
           </footer>;
}

export default Footer;