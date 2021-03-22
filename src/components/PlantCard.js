import React, {useState} from "react";

function PlantCard({plant, dbUpdate, deletePlant}) {
  const {name, image, price, stocked} = plant
  const [newPrice, setNewPrice] = useState(0)

  const handleStockClick = () => {
    plant.stocked = !stocked
    dbUpdate(plant)
  }

  const handlePriceChange = (event) => {
    event.preventDefault()
    plant.price = newPrice
    dbUpdate(plant)
    setNewPrice(0)
  }

  const handleDelete = (event) => {
    deletePlant(plant)
  }

  return (
    <li className="card">
      <img src={image} alt={"plant name"} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {stocked? (
        <button className="primary" onClick={handleStockClick}>In Stock</button>
      ) : (
        <button onClick={handleStockClick}>Out of Stock</button>
      )}
      <form onSubmit={handlePriceChange}>
        <input type="number" name="price" step="0.01" placeholder="Price" value={newPrice} onChange={event=>setNewPrice(event.target.value)}/>
        <button type="submit">Change Price</button>
      </form>
      <button className="delete-button" onClick={handleDelete}> Delete Me :(</button>
    </li>
  );
}

export default PlantCard;
