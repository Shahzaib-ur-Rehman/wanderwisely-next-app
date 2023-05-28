import { Inter } from "next/font/google";
import { Fragment, useEffect, useState } from "react";
import parse from "html-react-parser";
const options = {
  replace: (domNode) => {
    if (domNode.attribs && domNode.attribs.class === "remove") {
      return <></>;
    }
  },
};
const regex = /Day (\d+):([\s\S]*?)(?=Day \d+:|$)/g;
const regexConetnt =
  /(Morning|Afternoon|Night)\s*-\s*([\s\S]*?)(?=(Morning|Afternoon|Night)|$)/g;
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [Place, setPlace] = useState("");
  const [Days, setDays] = useState("");

  const [Result, setResult] = useState("");
  const [DayWisePlace, setDayWisePlace] = useState([]);
  const generateResult = async (event) => {
    event.preventDefault();
    setResult("");
    const content = `${Days} days trip plan for ${Place} morning , afternoon and night `;
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

  const extractContent = (matches) => {
    const sections = [];
    for (const match of matches) {
      const section = {
        time: match[1],
        content: match[2].trim(),
      };
      sections.push(section);
    }
    return sections;
  };

  useEffect(() => {
    const matches = Result.matchAll(regex);
    const days = [];
    for (const match of matches) {
      let matches = match[2].trim().matchAll(regexConetnt);
      console.log(matches);
      const day = {
        number: match[1],
        content: match[2].trim(),
        //? extractContent(matches):[],
      };
      days.push(day);
    }
    setDayWisePlace(days);
  }, [Result]);

  console.log(DayWisePlace);

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
      <section id="itinerary">
        <div id="about" class="about">
          {DayWisePlace.map((plan) => {
            const currentDate = new Date();
            const options = { month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleString('en-US', options);

            return (
              <div className="wrapper" key={plan.number}>
                <h2 class="text-center">
                  <strong>DAY {plan.number} : </strong>
                  <small class="text-center">{formattedDate}</small>
                </h2>
                <br></br>
                <div class="col-8 mx-auto">
                  <p>
                    {plan.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <footer>Copyright © 2023 Wander Wisely.</footer>
    </Fragment>
  );
}
