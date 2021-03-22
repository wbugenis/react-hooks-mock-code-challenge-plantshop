import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const API = "http://localhost:6001/plants"
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(plantFetch => setPlants(plantFetch))
  }, [])

  const addNewPlant = (newPlant) => {
    newPlant.stocked = true
    fetch(API, {
      method: 'POST', 
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify(newPlant)
    })
      .then(r => r.json())
      .then(plant => setPlants([...plants, plant]))
  }

  const updatePlant = (updatedPlant) => {
    const updatedPlants = plants.map(plant => {
      if(plant.id === updatedPlant.id) {
        return {...plant, stocked:updatedPlant.stocked, price:updatedPlant.price}
      }
      return plant
    })
    setPlants(updatedPlants)
  }

  const searchedPlants = () => {
    if(search === "") {
      return plants
    } else {
      return plants.filter(plant => plant.name.toLowerCase().includes(search.toLowerCase()))
    }
  }

  const dbUpdate = (plant) => {
    fetch(`${API}/${plant.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json',
                  Accept: 'application/json'
                },
      body: JSON.stringify({price:plant.price, stocked:plant.stocked})
    })
      .then(r => r.json())
      .then(plant => updatePlant(plant))
  }

  const deletePlant = (removedPlant) => {
    fetch(`${API}/${removedPlant.id}`, {
      method: 'DELETE'
    })
      .then(r => r.json())
      .then(() => setPlants(plants.filter(plant => plant.id !== removedPlant.id)))
  }
  

  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant} />
      <Search search={search} setSearch={setSearch} />
      <PlantList plants={searchedPlants()} dbUpdate={dbUpdate} deletePlant={deletePlant}/>
    </main>
  );
}

export default PlantPage;
