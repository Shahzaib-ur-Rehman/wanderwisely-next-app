import Image from "next/image";
import React, { Fragment } from "react";

const Content = ({ DayWisePlace }) => {
  return (
    <main id="main">
      <section id="contact" className="contact info-wrap mb-5">
        <div className="container">
          <div className="row justify-content-top">
            <div className="col-lg-12 itinerary-title">
              <Image
                width="100"
                height={100}
                src="https://www.roamaround.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdefaultCity.550aadc2.png&w=1920&q=75"
                className="blogimg img-fluid mx-auto d-block"
                alt=" pic 2"
              />
              <div className="upper_text">
                <h2>Eum ipsam laborum deleniti velitena</h2>
                <button className="header-itineraries-share">
                  <i className="bi bi-share-fill"></i>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
          <div id="about" className="about">
            {DayWisePlace.map((plan, index) => {
              const currentDate = new Date();
              currentDate.setDate(currentDate.getDate() + index);
              const options = { month: "long", day: "numeric" };
              const formattedDate = currentDate.toLocaleString(
                "en-US",
                options
              );
              return (
                <Fragment key={index}>
                  <h2 className="text-center">
                    <strong>DAY {plan.number} :</strong>
                    <small className="text-center">{formattedDate}</small>
                  </h2>
                  <br />
                  <div className="col-lg-12 moredetils">
                    <p>{plan.content}</p>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Content;
