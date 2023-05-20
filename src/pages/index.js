import { Inter } from "next/font/google";
import { Fragment, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [Place, setPlace] = useState("");
  const [Days, setDays] = useState("");

  const [Result, setResult] = useState("");
  const generateResult = async (event) => {
    event.preventDefault();
    setResult("");
    const content = `
    Generate a plan of ${Days} days of tour to ${Place}, also give me website links of each place for guide`;

    const response = await fetch("/api/gptapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResult((prev) => prev + chunkValue);
    }
  };
  return (
    <Fragment>
      <header>
        <div id="background" className="background">
          <video autoPlay loop muted playsinline>
            <source src="images/ww-720p.mp4" type="video/mp4" />
          </video>
        </div>
        <div id="logo" className="logo">
          Wander Wisely
        </div>
        <form id="form" onSubmit={generateResult}>
          <input
            type="text"
            value={Place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
            id="place"
            placeholder="Where are you going?"
          />
          <input
            type="text"
            value={Days}
            onChange={(e) => {
              setDays(e.target.value);
            }}
            id="days"
            placeholder="For how many days?"
          />
          <button type="submit">
            <span className="icon-write"></span>Create Itinerary
          </button>
        </form>
      </header>
      <section id="itinerary">{Result}</section>
      <footer>Copyright © 2023 Wander Wisely.</footer>
    </Fragment>
  );
}
