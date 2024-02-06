export class IError extends Error {
  code!: number;
  info!: {
    message: string;
  };
}

interface IFetchEvents {
  signal: AbortSignal;
  searchTerm?: string;
}

export async function fetchEvents({ signal, searchTerm }: IFetchEvents) {
  //console.log(searchTerm);
  let url = "http://localhost:3000/events";
  if (searchTerm) url += `?search=${searchTerm}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new IError("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
