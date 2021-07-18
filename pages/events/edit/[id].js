import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaImage } from "react-icons/fa";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/component/Layout";
import ImageUpload from "@/component/ImageUpload";
import Modal from "@/component/Modal";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

const EditEventPage = ({ evt }) => {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      return toast.error("Please fill in all fields.");
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();
      console.log(evt);
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <>
      <Layout title="Add New Events">
        <ToastContainer />
        <Link href="/events">Go Back</Link>
        <h1>Edit Event</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div>
              <label htmlFor="name">Event Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="performers">Event Performers</label>
              <input
                type="text"
                id="performers"
                name="performers"
                value={values.performers}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="venue">Event Venue</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={values.venue}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="address">Event Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={values.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="date">Event Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={moment(values.date).format("yyyy-MM-DD")}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="time">Event Time</label>
              <input
                type="text"
                id="time"
                name="time"
                value={values.time}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <input type="submit" value="Update Event" className="btn" />
        </form>

        <h2>Event Image</h2>
        {imagePreview ? (
          <Image src={imagePreview} height={100} width={170} />
        ) : (
          <div>
            <p>No image uploaded</p>
          </div>
        )}

        <div>
          <button className="btn-secondary" onClick={() => setShowModal(true)}>
            <FaImage /> Set Image
          </button>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
        </Modal>
      </Layout>
    </>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evt,
    },
  };
}
