import MeetupDetail from "@/components/meetups/MeetupDetail";

function MeetupDetailsPage(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  //fetch data for single meetup
  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        title: "A first meetup",
        address: "Some street 5, some city",
        description: "The meetup description",
      },
    },
  };
}

export default MeetupDetailsPage;
