import { IPlace } from "./components/Places";

export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resData.places;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "GET",
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to user fetch places");
  }
  return resData.places;
}

export async function updateUserPlaces(places: IPlace[]) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places: places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update places");
  }
  return resData.message;
}
