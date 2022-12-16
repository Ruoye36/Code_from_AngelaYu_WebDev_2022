import React from "react";
import Card from "./Card.jsx";
import contacts from "../contacts.jsx"
import Avatar from "./Avatar.jsx";

function createCard(contact){
  return <Card
    //Put the HTML predetermined elements in the <tag attr="...">, not here. Here is for custom properties.
    id={contact.id}
    key={contact.id}
    name={contact.name}
    img={contact.imgURL}
    tel={contact.phone}
    email={contact.email}
  />;
}

function App() {
  return (
    <div>
    <h1 className="heading">My Contacts</h1>
    <Avatar img="https://backiee.com/static/wpdb/wallpapers/1920x1080/230014.jpg"/>
    {contacts.map(createCard)}
  </div>
  );
}

export default App;
