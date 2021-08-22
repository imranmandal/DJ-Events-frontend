import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/component/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

const AddEventPage = () => {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  // console.log(values);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      return toast.error("Please fill in all fields.");
    }

    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
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
        <h1>Add Event</h1>

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
              <label htmlFor="performers">Event Performer</label>
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
                value={values.date}
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

          <input type="submit" value="Add Event" className="btn" />
        </form>
      </Layout>
    </>
  );
};

export default AddEventPage;
