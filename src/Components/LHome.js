import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import NewsItems from './NewsItems';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class LHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
      prevPage: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsWorld`
    this.notpage = 'Page Not Avialable'
    this.pageList = []
  }

  capitalizeFirstLetter = (str) => { return str.charAt(0).toUpperCase() + str.slice(1); }

  static defaultProps = {
    pageSize: 10,
    category: 'top',
    header: false
  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    header: PropTypes.bool
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = async () => {
    this.props.setProgress(10)
    let url = `https://newsdata.io/api/1/news?apikey=${this.props.apikey}&q=india&category=${this.props.category}`;
    this.setState({ loading: true })
    let lData = await fetch(url);
    this.props.setProgress(40)
    var liveData = await lData.json();
    if (liveData.status !== 'error') {
      this.setState({
        articles: liveData.results,
        totalArticles: liveData.totalResults,
        loading: false,
        page: liveData.nextPage
      })
      this.pageList.push(liveData.nextPage)
    } else {
      this.setState({
        articles: [],
        page: 0,
        totalArticles: 0,
        loading: false
      })
    }
    if (this.pageList.length === 2) {
      this.pageList.pop();
    }
    this.props.setProgress(100)
  }

  // -------------*********** this code for button system
  // dataFetch = async (page) => {
  //   let url = `https://newsdata.io/api/1/news?apikey=pub_368561fcb5a6ee1fa488588ba438a2882bcb3&q=india&page=${page}&category=${this.props.category}`;
  //   let lData = await fetch(url);
  //   var liveData = await lData.json();
  //   if (liveData.status !== 'error') {
  //     this.pageList.push(liveData.nextPage)
  //     this.setState({
  //       articles: liveData.results,
  //       totalArticles: liveData.totalResults
  //     })
  //   } else {
  //     this.setState({
  //       articles: null,
  //       page: 0,
  //       totalArticles: 0
  //     })
  //   }
  // }

  // handleNextPage = () => {
  //   window.scrollTo(0, 0);
  //   this.setState({ loading: true });
  //   this.dataFetch(this.pageList[this.pageList.length - 1]);
  //   this.setState({ loading: false })
  // }

  // handlePrevPage = () => {
  //   window.scrollTo(0, 0);
  //   this.pageList.pop();
  //   this.pageList.pop();
  //   this.setState({ loading: true, })
  //   if (this.pageList.length === 0) {
  //     this.fetch()
  //   }
  //   else {
  //     this.dataFetch(this.pageList[this.pageList.length - 1]);
  //   }
  //   this.setState({ loading: false })
  // }
  // ---------------------***************************************------------------------------------

  fetchMoreData = async () => {
    let url = `https://newsdata.io/api/1/news?apikey=${this.props.apikey}&q=india&page=${this.pageList[this.pageList.length - 1]}&category=${this.props.category}`;
    let data = await fetch(url);
    let jsonData = await data.json();
    if (jsonData.status !== 'error') {
      this.setState({
        articles: this.state.articles.concat(jsonData.results),
        totalArticles: jsonData.totalResults,
      })
      this.pageList.push(jsonData.nextPage);
    }
  }


  render() {
    return (
      <>
        <div className="container">
          <div className="df loading">
            {this.state.loading && this.state.articles && <Spinner />}
          </div>
          {!this.props.header && !this.state.loading && <div className="header">Top News Headlines - {this.capitalizeFirstLetter(this.props.category)}</div>}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalArticles}
            loader={<div style={{ textAlign: 'center', margin: '2rem 0rem' }}>{<Spinner />}</div>}
          >
            <div className='df main-news-box' id='main-news'>
              {
                this.state.articles ?
                  !this.state.loading && this.state.articles.map((element) => {
                    if (element.title !== null && element.description !== null && element.image_url !== null) {
                      return <div key={element.url+element.pubDate}>
                        <NewsItems title={element.title.slice(0, 60)} desc={element.description.slice(0, 100)} url={element.link} urlImg={element.image_url} pub={element.source_id} pubTime={element.pubDate} />
                      </div>
                    }
                    else {
                      return ''
                    }
                  }) : <div className='not-found'>{this.state.loading ? <Spinner /> : this.notpage}</div>
              }
            </div>
          </InfiniteScroll>
          {!this.state.loading && <div className="uparrow btn" onClick={() => {window.scrollTo(0, 0) }}><button>&uarr; Go to Top</button></div>}
          {/* // ---------------------***************************************------------------------------------ */}
          {/* {!this.state.loading &&
            <div className="footer df btn">
              <button disabled={this.pageList.length < 2} onClick={this.handlePrevPage}>&larr; Previous</button>
              <button disabled={this.pageList.length + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} onClick={this.handleNextPage}>Next &rarr;</button>
            </div>
          } 
          // ---------------------***************************************------------------------------------
          */}
        </div>
      </>
    )
  }
}
