import React, { useEffect, useRef, useState } from "react";

import Places from "./components/Places.tsx";
import { AVAILABLE_PLACES, IPlace } from "./data.ts";
import Modal from "./components/Modal.js";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.ts";

enum LocalStorageKeys {
  SELECTED_PLACES = "Selected_Places",
}

const App: React.FC = () => {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState<IPlace[]>([]);
  const [availablePlaces, setAvailablePlaces] = useState<IPlace[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id: string) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id: string) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds: string[] =
      JSON.parse(localStorage.getItem(LocalStorageKeys.SELECTED_PLACES)) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        LocalStorageKeys.SELECTED_PLACES,
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
    const storedIds: string[] =
      JSON.parse(localStorage.getItem(LocalStorageKeys.SELECTED_PLACES)) || [];
    localStorage.setItem(
      LocalStorageKeys.SELECTED_PLACES,
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
          fallbackText="Sorting places by distance..."
        />
      </main>
    </>
  );
};

export default App;
