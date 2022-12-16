import React from "react";
import Term from "./Term.jsx";
import emojipedia from "../emojipedia.js";

function Dictionary(props){
    return <dl className="dictionary">
    {emojipedia.map(emoji => <Term 
        id={emoji.id}
        key={emoji.id}
        emoji={emoji.emoji}
        name={emoji.name}
        meaning={emoji.meaning}
    />)}
  </dl>
}

export default Dictionary;