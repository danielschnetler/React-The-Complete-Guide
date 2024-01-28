import { useEffect, useState } from "react";
import Places, { IPlace } from "./Places";
import ErrorComponent from "./ErrorComponent";
import { sortPlacesByDistance } from "../loc";

interface IAvailablePlaces {
  onSelectPlace: (place: IPlace) => void;
}

const AvailablePlaces: React.FC<IAvailablePlaces> = ({ onSelectPlace }) => {
  const [availablePlaces, setAvailablePlaces] = useState<IPlace[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [appError, setAppError] = useState<{}>();
  const [fallbackText, setFallbackText] = useState<string>(
    "No places available."
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      setFallbackText("Fetching place data...");

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        setFallbackText("Sorting places by distance...");
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setAppError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
        setIsFetching(false);
      }
    };
    fetchPlaces();
  }, []);

  if (appError) {
    return (
      <ErrorComponent
        message={appError.message}
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
