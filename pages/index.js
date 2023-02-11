import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address nr 20, 1234 Some City",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address nr 20, 1234 Some City",
    description: "This is a second meetup",
  },
];

export function IndexPage(props) {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  //has to be called getStaticProps() and only applys to pages in the pages folder

  //Fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    //revalidate: 10, //will be regenerated every 10 seconds on the server, replacing old generated pages
  };
}

export default IndexPage;
