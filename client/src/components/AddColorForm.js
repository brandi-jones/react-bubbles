import React, {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const AddColorForm = (props) => {

    const [newColor, setNewColor] = useState({
        color:'',
        code: {hex: ''}, 
        id: 0
    })


    const addColor = (event) => {
        event.preventDefault();
        axiosWithAuth()
        .post(`http://localhost:5000/api/colors/`, newColor)
        .then(response => {
            props.updateColors();

            //reset form values
            setNewColor({
                color:'',
                code: {hex: ''}, 
                id: 0
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleChanges = event => {
        //if editing color name
        if (event.target.name === "color") {
            setNewColor({
                ...newColor,
                id: props.colorList.length + 1,
                [event.target.name]: event.target.value
            })
        }
        //if editing color hex code
        else if (event.target.name === "code") {
            setNewColor({
                ...newColor,
                id: props.colorList.length + 1,
                [event.target.name]: {hex: event.target.value}
            })
        }
    
    }


    return(
        <div className="AddColorForm">
        <h1>Add a color!</h1>
  
        <form onSubmit={addColor}>
  
          <label htmlFor="color">Color Name:</label>
          <input
            type="text"
            name="color"
            value={newColor.color}
            onChange={handleChanges}
          />
  
          <label htmlFor="code">Hex Code:</label>
            <input
            type="text"
            name="code"
            value={newColor.code.hex}
            onChange={handleChanges}
          />
  
          <button>Add</button>
          
        </form>
      </div>
    );
}

export default AddColorForm