import { useEffect, useState } from "react";
import { IPlace } from "../App.js";
import Places from "./Places.js";

interface IAvailablePlaces {
  onSelectPlace: (place: IPlace) => void;
}

const AvailablePlaces: React.FC<IAvailablePlaces> = ({ onSelectPlace }) => {
  const [availablePlaces, setAvailablePlaces] = useState<IPlace[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    };
    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};
export default AvailablePlaces;
