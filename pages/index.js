import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

export function IndexPage(props) {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  //has to be called getStaticProps() and only applys to pages in the pages folder
  const client = await MongoClient.connect(
    "mongodb+srv://meetupAPI:TyWphpzxKF6Pl5bR@cluster0.l6so0lf.mongodb.net/meetups"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  //Fetch data from an API
  return {
    props: {
      meetups: meetups.map((object) => ({
        title: object.title,
        address: object.address,
        image: object.image,
        id: object._id.toString(),
      })),
    },
    revalidate: 3600, //will be regenerated every 10 seconds on the server, replacing old generated pages
  };
}

export default IndexPage;
