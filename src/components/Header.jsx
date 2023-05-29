import React from "react";

const Header = () => {
  return (
    <header id="header" className="d-flex align-items-center">
      <div className="social-links text-left custom-links">
        <a href="#" className="twitter">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="#" className="facebook">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="#" className="instagram">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="#" className="linkedin">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="#" className="whatsapp">
          <i className="bi bi-whatsapp"></i>
        </a>
        <a href="#" className="facebook">
          <i className="bi bi-envelope"></i>
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
          <form
            action="forms/notify.php"
            method="post"
            role="form"
            className="php-email-form"
          >
            <div className="subscribe-form">
              <input type="text" name="text" placeholder="Where to?" />
              <input type="text" name="text" placeholder="how may days you want to s?" />
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
          <h6>
            Hmm, you sure that is a real place?
          </h6>
        </div>
      </div>
    </header>
  );
};

export default Header;
