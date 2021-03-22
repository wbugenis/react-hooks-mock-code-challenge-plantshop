import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, dbUpdate, deletePlant}) {
  const plantCards = plants.map(plant => <PlantCard key={plant.id} plant={plant} dbUpdate={dbUpdate} deletePlant={deletePlant}/>)
  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
