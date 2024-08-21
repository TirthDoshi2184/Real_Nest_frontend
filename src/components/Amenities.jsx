import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Amenities = () => {
    const [amenities, setAmenities] = useState([]) // Initialize as an empty array

    const getAllAmenities = async () => {
        try {
            const response = await axios.get("http://localhost:3000/amenities/getamenities")
            setAmenities(response.data.data) // Assuming response.data.data is an array
            console.log(response.data.data[0]);
        } catch (error) {
            console.error("Error fetching amenities:", error);
        }
    }

    useEffect(() => {
        getAllAmenities()
    }, [])

    return (
        <div>
            {amenities.map((a) => (
                <h1>{a[0]?.name} </h1> // Assuming each amenity has a unique 'id'
            ))}
        </div>
    )
}
