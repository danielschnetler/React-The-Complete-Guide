import React, { useCallback, useEffect, useRef, useState } from "react";

import Places, { IPlace } from "./components/Places.tsx";
import Modal from "./components/Modal.js";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.tsx";
import { fetchAvailablePlaces, updateUserPlaces } from "./http.ts";
import ErrorComponent from "./components/ErrorComponent.tsx";

const App: React.FC = () => {
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState<IPlace[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState<{
    message: string;
    error: boolean;
  }>({ message: "", error: false });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const places = await fetchAvailablePlaces();
        setPickedPlaces(places);
      } catch (error) {
        setErrorUpdatingPlaces({
          message: error.message || "Failed to load saved places.",
          error: true,
        });
      }
    };
    fetchPlaces();
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
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    setModalIsOpen(false);
    try {
      await updateUserPlaces(
        pickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    } catch (error: Error) {
      setPickedPlaces(pickedPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to save deleted place",
        error: true,
      });
    }
  }, []);

  const handleErrorClose = () => {
    setErrorUpdatingPlaces({
      message: "",
      error: false,
    });
  };

  return (
    <>
      <Modal open={errorUpdatingPlaces.error} onClose={handleErrorClose}>
        {errorUpdatingPlaces.message.trim() !== "" && (
          <ErrorComponent
            title="An error occured!"
            message={errorUpdatingPlaces.message}
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
        <Places
          isLoading={false}
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
};

export default App;
