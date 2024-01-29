import React, { useCallback, useEffect, useRef, useState } from "react";

import Places, { IPlace } from "./components/Places.tsx";
import Modal from "./components/Modal.tsx";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import logoImg from "./assets/logo.png";
import { fetchUserPlaces, updateUserPlaces } from "./http.ts";
import ErrorComponent from "./components/ErrorComponent.tsx";
import useCustomFetch from "./hooks/useFetch.ts";
import AvailablePlaces from "./components/AvailablePlaces.tsx";

const App: React.FC = () => {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [fallbackText, setFallbackText] = useState<string>(
    "Select the places you would like to visit below."
  );

  const {
    data: pickedPlaces,
    error,
    isFetching,
    setData: setPickedPlaces,
  } = useCustomFetch({
    fetchFunction: fetchUserPlaces,
    initialValue: [],
  });

  useEffect(() => {
    if (pickedPlaces.length === 0) {
      setFallbackText("Select the places you would like to visit below.");
    }
  }, [pickedPlaces]);

  useEffect(() => {
    setFallbackText("Fetching saved places");
  }, []);

  function handleStartRemovePlace(place: IPlace) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace: IPlace) {
    setPickedPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await updateUserPlaces([selectedPlace, ...pickedPlaces]);
    } catch (error: Error) {
      setPickedPlaces(pickedPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to save picked places",
        error: true,
      });
    }
  }

  const handleRemovePlace = useCallback(async () => {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter(
        (place: { id: string }) => place.id !== selectedPlace.current.id
      )
    );
    setModalIsOpen(false);
    try {
      await updateUserPlaces(
        pickedPlaces.filter(
          (place: { id: string }) => place.id !== selectedPlace.current.id
        )
      );
    } catch (error: Error) {
      setPickedPlaces(pickedPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to save deleted place",
        error: true,
      });
    }
  }, [pickedPlaces, setPickedPlaces]);

  const handleErrorClose = () => {
    error?.error ? (error.error = false) : undefined;
    error?.message ? (error.message = "") : error?.message;
  };

  return (
    <>
      <Modal open={error?.error ?? false} onClose={handleErrorClose}>
        {error?.message.trim() !== "" && (
          <ErrorComponent
            title="An error occured!"
            message={error?.message ?? "An error occured"}
            onConfirm={handleErrorClose}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={() => {
            setModalIsOpen(false);
          }}
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
        {error?.error && (
          <ErrorComponent
            title={"An error has occured"}
            message={error.message}
            onConfirm={handleErrorClose}
          />
        )}
        <Places
          isLoading={isFetching}
          title="I'd like to visit ..."
          fallbackText={fallbackText}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
};

export default App;
