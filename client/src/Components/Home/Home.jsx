import React from "react";
import Card from "../Card/Card";
export default function Home() {
  return <div>Este es el home
      <Card
    image="https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
    name="Affenpinscher"
    temperament="Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
    weightMin={3}
    weightMax={6}
  />;
  </div>;

}
