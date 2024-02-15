import React from 'react'

const NewsItems = (props) => {
  // replace(/<[^>]*>?/g,'') -> for html tags remove from normal text
  let { title, desc, pub, pubTime, url, urlImg } = props;
  return (
    <>
      <div className="text-center">
        <div className="news-box df">
          <div className="content-part df">
            <div className="news-title" id="news-title">{title}...</div>
            <div className="description" id="description">{String(desc).replace(/<[^>]*>?/g, '')}...</div>
            <div className="name" id="name"><span className="pub-name">Source Name :</span> {pub}</div>
            <div className="publish name" id="publish"><span className="pub-name">PublishedAt :</span> {new Date(pubTime).toLocaleString()}</div>
            <div className="btn" id="btn"><a href={url}><button type="button">Read More</button></a></div>
          </div>
          <div className="img-part">
            <img src={urlImg} alt="Not Avilable" />
          </div>
        </div>
      </div>
    </>
  )
}

  export default NewsItems;