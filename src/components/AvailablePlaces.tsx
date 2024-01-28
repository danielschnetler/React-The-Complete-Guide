import { useEffect, useState } from "react";
import Places, { IPlace } from "./Places";
import ErrorComponent from "./ErrorComponent";

interface IAvailablePlaces {
  onSelectPlace: (place: IPlace) => void;
}

const AvailablePlaces: React.FC<IAvailablePlaces> = ({ onSelectPlace }) => {
  const [availablePlaces, setAvailablePlaces] = useState<IPlace[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [appError, setAppError] = useState<{}>();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setAppError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
      }
      setIsFetching(false);
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
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};
export default AvailablePlaces;
