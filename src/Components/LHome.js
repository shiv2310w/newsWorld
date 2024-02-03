import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HomeHeader from './HomeHeader';
import Spinner from './Spinner';
import NewsItems from './NewsItems';

export default class LHome extends Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      loading: true,
      page: 0,
      totalArticles: 0,
      prevPage: 0
    }
    // this.pageList = []
  }

  static defaultProps = {
    pageSize: 10,
    category: 'top',
    header: false
    // business
    // crime
    // domestic
    // education
    // entertainment
    // environment
    // food
    // health
    // lifestyle
    // other
    // politics
    // science
    // sports
    // technology
    // top
    // tourism
    // world
  }

  static propTypes = {
    // country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    header: PropTypes.bool
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = async () => {
    let url = `https://newsdata.io/api/1/news?apikey=pub_3685693ffa36955a16ca5338539d711b05025&q=india&category=${this.props.category}`;
    this.setState({ loading: true })
    let lData = await fetch(url);
    var liveData = await lData.json();
    this.setState({
      articles: liveData.results,
      page: liveData.nextPage,
      totalArticles: liveData.totalResults,
      loading: false
    })
    this.pageList = []
    console.log(this.pageList)
    this.pageList.push(this.state.page)

  }

  dataFetch = async () => {
    let url = `https://newsdata.io/api/1/news?apikey=pub_3685693ffa36955a16ca5338539d711b05025&q=india&page=${this.state.page}&category=${this.props.category}`;
    let lData = await fetch(url);
    var liveData = await lData.json();
    this.pageList.push(liveData.nextPage)
    this.setState({
      articles: liveData.results,
      page: this.pageList[this.pageList.length - 1],
      totalArticles: liveData.totalResults
    })
    // console.log(liveData)
    console.log(this.pageList)
  }

  handleNextPage = () => {
    window.scrollTo(0, 0);
    this.setState({ loading: true });
    this.dataFetch();
    this.setState({ loading: false })
  }

  handlePrevPage = () => {
    window.scrollTo(0, 0);
    this.setState({ loading: true, })
    if (this.pageList.length === 2) {
      this.pageList.pop();
      this.pageList.pop();
      this.fetch()
    }
    else {
      // this.setState({ page: this.pageList[this.pageList.length - 2] });
      this.pageList.pop();
      this.pageList.pop();
      this.setState({page:this.pageList[this.pageList.length-1]})
      this.dataFetch();
      this.setState({ loading: false })
    }
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="df loading">
            {this.state.loading && <Spinner />}
          </div>
          {this.props.header && !this.state.loading && <HomeHeader />}
          <div className='df main-news-box' id='main-news'>
            {
              this.state.articles ?
                !this.state.loading && this.state.articles.map((element) => {
                  if (element.url !== null && element.description !== null && element.image_url !== null) {
                    return <div key={element.url}>
                      <NewsItems title={element.title} desc={element.description.slice(0, 120)} url={element.link} urlImg={element.image_url} pub={element.source_id} pubTime={element.pubDate} />
                    </div>
                  } else {
                    return ''
                  }
                }) : ""
            }
          </div>
          {!this.state.loading &&
            <div className="footer df btn">
              <button disabled={this.pageList.length < 2} onClick={this.handlePrevPage}>&larr; Previous</button>
              <button disabled={this.pageList.length + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} onClick={this.handleNextPage}>Next &rarr;</button>
            </div>
          }
        </div>
      </>
    )
  }
}
