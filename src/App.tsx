import React, { useCallback, useEffect, useRef, useState } from "react";

import Places, { IPlace } from "./components/Places.tsx";
import Modal from "./components/Modal.js";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.tsx";
import { fetchUserPlaces, updateUserPlaces } from "./http.ts";
import ErrorComponent from "./components/ErrorComponent.tsx";

const App: React.FC = () => {
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState<IPlace[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [fallbackText, setFallbackText] = useState<string>(
    "Select the places you would like to visit below."
  );
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState<{
    message: string;
    error: boolean;
  }>({ message: "", error: false });

  useEffect(() => {
    if (pickedPlaces.length === 0) {
      setFallbackText("Select the places you would like to visit below.");
    }
  }, [pickedPlaces]);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      setFallbackText("Fetching saved places");
      try {
        const places = await fetchUserPlaces();
        console.log(places);
        setPickedPlaces(places);
      } catch (error: any) {
        setErrorUpdatingPlaces({
          message: error.message || "Failed to load saved places.",
          error: true,
        });
      }
      setIsFetching(false);
      setFallbackText("");
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
        {errorUpdatingPlaces.error && (
          <ErrorComponent
            title={"An error has occured"}
            message={errorUpdatingPlaces.message}
            onConfirm={function (): void {
              setErrorUpdatingPlaces({ message: "", error: false });
            }}
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
