import React from 'react'
import newsimg from './img/about.gif'
import R1 from './img/R1.png'
export default function About() {
    document.title = 'About us'

  return (
    <>
    <div className="container dffcntr">
        <div className="aboutHeading df">
            <p className="df">About Us</p>
            <img src={R1} alt="" className="newsimg"/>
        </div>
        <div className="aboutContent df">
            <div className="df aboutC">
                <p>
                I created this web-site for latest news. This website created using basic html , css and react js
                (javascript library). In this website everyday latest news and world news are available . All news
                data
                are fetching from api (application programming interface) and two api's are using for fetching data
                of
                everyday of latest news. This is fetching latest news of the India and the World with some
                categories
                such as health , entertainment, sports, business, science, technology. With this all newses are
                available for you in free.
                </p>
                <div className="imgs">
                    <img src={newsimg} alt="" className="newsImg"/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
