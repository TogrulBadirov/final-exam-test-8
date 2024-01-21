import "./index.scss";

const AboutTasty = () => {
  return (
    <section id="AboutTasty">
      <div className="container ">
        <div className="row">

        <div className="col-lg-6 col-md-6 col-12 left-side">
          <img
            src="https://preview.colorlib.com/theme/tasty/images/about-2.jpg"
            alt=""
          />
        </div>
        <div className="col-lg-6 col-md-6 col-12 right-side">
          <div className="container">
            <span>ABOUT TASTY</span>

            <h3>Our chef cooks the most delicious food for you</h3>

            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>

            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>

          </div>
        </div>
        </div>

      </div>
    </section>
  );
};

export default AboutTasty;
