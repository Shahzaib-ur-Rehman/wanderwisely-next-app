import Content from "../components/Content";
import { Inter } from "next/font/google";
import { Fragment, useEffect, useState } from "react";
import {
  FackBookSVG,
  TwitterSVG,
  InstagramSVG,
  LinkedinSVG,
  WhatsappSVG,
  Check,
} from "../../public/svgs/icons";

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
  const [ShowDetail, setShowDetail] = useState(false);
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

    setShowDetail(true);
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
      const day = {
        number: match[1],
        content: match[2].trim(),
        //? extractContent(matches):[],
      };
      days.push(day);
    }
    setDayWisePlace(days);
  }, [Result]);

  return (
    <Fragment>
      <header id="header" className="d-flex align-items-center">
        <div className="social-links text-left custom-links">
          <a href="#" className="twitter">
            <TwitterSVG />
          </a>
          <a href="#" className="facebook">
            <FackBookSVG />
          </a>
          <a href="#" className="instagram">
            <InstagramSVG />
          </a>
          <a href="#" className="linkedin">
            <LinkedinSVG />
          </a>
          <a href="#" className="whatsapp">
            <WhatsappSVG />
          </a>
        </div>

        <div className="social-links text-left custom-login">
          <button type="button" className="btn btn-danger mt-2">
            Login
          </button>
        </div>

        <div className="container d-flex flex-column align-items-center">
          <h1>Wander Wisely</h1>
          <h5>Your personal AI travel planner</h5>

          <div className="subscribe">
            <form onSubmit={generateResult} className="php-email-form">
              <div className="subscribe-form">
                <input
                  type="text"
                  value={Place}
                  onChange={(event) => {
                    setPlace(event.target.value);
                  }}
                  name="text"
                  placeholder="Where to?"
                />
                <input
                  type="text"
                  value={Days}
                  onChange={(event) => {
                    setDays(event.target.value);
                  }}
                  name="text"
                  placeholder="how many days you want to s?"
                />
                <input type="submit" value="Let's Go" />
              </div>
              <div className="mt-2">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">
                  Your notification request was sent. Thank you!
                </div>
              </div>
            </form>
            <h6>Hmm, you sure that is a real place?</h6>
          </div>
        </div>
      </header>
      {!ShowDetail && (
        <section id="about" className="about mt-2 mb-5">
          <div className="container">
            <div className="row content">
              <div className="col-lg-6">
                <h2>Recent Searches</h2>
                <h3>
                  Voluptatem dignissimos provident quasi corporis voluptates sit
                  assum perenda sruen jonee trave
                </h3>
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0">
                <ul>
                  <li>
                    <Check /> Azad Kashmir Tour{" "}
                  </li>
                  <li>
                    <Check /> Neelum Valley Azad Kashmir Tour{" "}
                  </li>
                  <li>
                    <Check /> THE 10 BEST Kashmir Tours
                  </li>
                  <li>
                    <Check /> Azad Kashmir Tour{" "}
                  </li>
                  <li>
                    <Check /> Neelum Valley Azad Kashmir Tour{" "}
                  </li>
                  <li>
                    <Check /> THE 10 BEST Kashmir Tours
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {ShowDetail && <Content DayWisePlace={DayWisePlace} />}

      {/* <header>
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
        <div id="about" className="about">
          {DayWisePlace.map((plan, index) => {
            const currentDate = new Date()+index+1;
            const options = { month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleString('en-US', options);

            return (
              <div className="wrapper" key={plan.number}>
                <h2 className="text-center">
                  <strong>DAY {plan.number} : </strong>
                  <small className="text-center">{formattedDate}</small>
                </h2>
                <br></br>
                <div className="col-8 mx-auto">
                  <p>
                    {plan.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <footer>Copyright © 2023 Wander Wisely.</footer> */}
    </Fragment>
  );
}
