import Navigation from "../Navigation"
// import bostonImg from './boston.png'
// import laPier from './laPier.png'
// import sunset from './sunset.png'
import './SplashPage.css'

const SplashPage = () => {


    // slideShow - source:  w3schools(https://www.w3schools.com/w3css/w3css_slideshow.asp)
    // let idx = 0;
    // slideShow();
    
    // const slideShow = () => {
    //     let showEle = document.getElementsByClassName("mySlides");
    //     for (let i = 0; i < showEle.length; i++ ) {
    //         showEle[i].style.display = "none";
    //     }
    //     idx++;
    //     if (idx > showEle.length) {idx = 1}
    //     showEle[idx-1].style.display = "block";
    //     setTimeout(slideShow, 3000);
    // }
    

    return (
        <div className="splashPage">
            <Navigation />
            <div className="info">
                <h1> Capture every moment.</h1>
                <br />
                <br />
                <h3> The momentCaptur community welcomes users to share their moments.</h3>
                <br />
                <br />
                <br />
                <a href="/sign-up"><button>Start for free</button></a>
            </div>
            {/* <div className="background">
                <img className="slidePics" src={ laPier } alt="Santa Monica Pier" />
                <img className="slidePics" src={ bostonImg } alt="Sunny day in Boston, MA" />
                <img className="slidePics" src={ reservoir } alt="reservoir and mountains" />
            </div> */}
        </div>
    );
};

export default SplashPage;