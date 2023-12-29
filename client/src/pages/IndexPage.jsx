import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    




<div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
  {places.length > 0 && places.map(place => (
    <Link to={'/place/'+place._id} key={place._id} className="rounded overflow-hidden shadow-lg bg-white">
      <div className="relative h-64">



        {place.photos[0] && (
          <Image className="w-full h-full object-cover" src={place.photos[0]} alt="" />
        )}





      </div>
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{place.address}</h2>
        <h3 className="text-sm text-gray-500 mb-2">{place.title}</h3>
        <div className="flex items-center justify-between">
          <span className="font-bold">${place.price}</span>
          <span className="text-gray-600 text-sm">per night</span>
        </div>
      </div>
    </Link>
  ))}
</div>


    
  );
}
