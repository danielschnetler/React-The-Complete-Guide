// our-domain.com/new-meetup

import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredMeetupData),
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>React NextJS Meetups</title>
        <meta
          name="New Meetup"
          content="Add your own meetups and create network opportunities!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />{" "}
    </>
  );
}

export default NewMeetupPage;
