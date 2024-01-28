export interface IPlace {
  id: string;
  title: string;
  image: {
    src: Image;
    alt: string;
  };
  lat: number;
  lon: number;
}

export interface IPlaces {
  title: string;
  places: IPlace[];
  fallbackText: string;
  isLoading: boolean;
  onSelectPlace: (place: IPlace) => void;
}

const Places: React.FC<IPlaces> = ({
  title,
  places,
  fallbackText,
  isLoading,
  onSelectPlace,
}) => {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className={"fallback-text"}>{fallbackText}</p>}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default Places;
