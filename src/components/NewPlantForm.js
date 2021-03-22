import React, {useState} from "react";

function NewPlantForm({addNewPlant}) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0.00)

  const handlePlantSubmission = (event) => {
    event.preventDefault()
    const newPlant = {name, image, price}
    addNewPlant(newPlant)
    setName("")
    setImage("")
    setPrice(0)
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handlePlantSubmission} >
        <input type="text" name="name" placeholder="Plant name" value={name} onChange={event=>setName(event.target.value)} />
        <input type="text" name="image" placeholder="Image URL" value={image} onChange={event=>setImage(event.target.value)}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={price} onChange={event=>setPrice(event.target.value)}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
