
 import './Landing.css';

const Landing = () => {
  return (
    <div>
      <div className="header">
        <div className="nav-links">
          <a href="#">Login</a>
          <a href="#">SignUp</a>
          <a href="#">About</a>
        </div>
        <div className="toggle-theme">
          <button>Toggle</button>
        </div>
      </div>

      <div className="main">
       
       <div className="h1">1</div>
       <div className="h2">1</div>

        {/* <div className="slider">
          <div
            className="slider-items"
            style={{
              transform: translateX(-${currentSlide * 100}%), // Shift slides horizontally
            }}
          >
            <div className="slider-item">Slide 1 Content</div>
            <div className="slider-item">Slide 2 Content</div>
            <div className="slider-item">Slide 3 Content</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Landing;