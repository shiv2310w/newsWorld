import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
export default class NewsItems extends Component {

  // replace(/<[^>]*>?/g,'') -> for html tags remove from normal text

  render() {
    let { title, desc, pub, pubTime, url, urlImg } = this.props;
    return (
      <>
        <div className="text-center">
          <div className="news-box df">
            <div className="content-part df">
              <div className="news-title" id="news-title">{title}</div>
              <div className="description" id="description">{String(desc).replace(/<[^>]*>?/g,'')}...</div>
              <div className="name" id="name"><span className="pub-name">Name Published :</span> {pub}</div>
              <div className="publish" id="publish"><span className="pub-name">PublishedAt :</span> {pubTime}</div>
              <div className="btn" id="btn"><button type="button"><a href={url}>Read More</a></button></div>
            </div>
            <div className="img-part">
              <img src={urlImg} alt="Not Avilable" />
            </div>
          </div>
        </div>
      </>
    )
  }
}
