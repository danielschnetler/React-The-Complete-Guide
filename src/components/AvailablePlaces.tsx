import { useEffect, useState } from "react";
import { IPlace } from "../App.js";
import Places from "./Places.js";
enum LocalStorageKeys {
  PLACES,
}

interface IAvailablePlaces {
  onSelectPlace: (place: IPlace) => void;
}

const AvailablePlaces: React.FC<IAvailablePlaces> = ({ onSelectPlace }) => {
  const [availablePlaces, setAvailablePlaces] = useState<IPlace[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => setAvailablePlaces(resData.places));
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
