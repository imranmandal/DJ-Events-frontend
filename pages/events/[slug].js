import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/component/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Events.module.css";

const EventPage = ({ evt }) => {
  // console.log(evt);

  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  console.log(evt);
  return (
    <>
      <Layout>
        <ToastContainer />
        <div className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${evt.id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            <a href="#" className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>

          <span>
            {new Date(evt.date).toLocaleDateString("en-IN")} at {evt.time}
          </span>
          <h1>{evt.name}</h1>
          {evt.image && (
            <div className={styles.image}>
              <Image
                src={evt.image.formats.medium.url}
                width={960}
                height={600}
              />
            </div>
          )}

          <h3>Performers</h3>
          <p>{evt.performers}</p>
          <h3>Description</h3>
          <p>{evt.description}</p>
          <h3>Venue: {evt.venue}</h3>
          <p>{evt.address}</p>

          <Link href="/events">
            <a className={styles.back}>Back</a>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default EventPage;

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events/`);
//   const events = await res.json();

//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
  };
}
