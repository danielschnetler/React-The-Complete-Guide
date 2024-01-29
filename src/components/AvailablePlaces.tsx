import { useState } from "react";
import Places, { IPlace } from "./Places";
import ErrorComponent from "./ErrorComponent";
import { sortPlacesByDistance } from "../loc";
import { fetchAvailablePlaces } from "../http";
import useCustomFetch from "../hooks/useFetch";

interface IAvailablePlaces {
  onSelectPlace: (place: IPlace) => void;
}

const fetchSortedPlaces = async () => {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places as IPlace[],
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
};

const AvailablePlaces: React.FC<IAvailablePlaces> = ({ onSelectPlace }) => {
  const [fallbackText, setFallbackText] = useState<string>(
    "No places available."
  );

  const {
    data: availablePlaces,
    error,
    isFetching,
  } = useCustomFetch({
    fetchFunction: fetchSortedPlaces,
    initialValue: [],
  });

  if (error) {
    return (
      <ErrorComponent
        message={error.message}
        onConfirm={() => {}}
        title="An Error Occured!"
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      fallbackText={fallbackText}
      onSelectPlace={onSelectPlace}
    />
  );
};
export default AvailablePlaces;
