import './App.css';
import React from 'react'
import AnimeDetail from './components/AnimeDetail.jsx'
import SearchForm from './components/SearchForm.jsx'
import { Button, Container } from 'react-bootstrap';


class App extends React.Component {
  constructor () {
    super ()
    
    this.state = {
      defaultURL: 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=12',
      baseURL: 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=12',
      animeList: [],
      page: {}
    }

  }

  search = async (search) => {
    if (search) {
      const keywords = search.split(' ').join('%20')
      const url = `https://kitsu.io/api/edge/anime?filter[text]=${keywords}`;
  
      await this.setState({
        ...this.state,
        baseURL: url
      })
    } else {
      await this.setState({
        ...this.state,
        baseURL: this.state.defaultURL
      })
    }
    this.fetchData()
  }

  fetchData = () => {
    fetch(`${this.state.baseURL}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          ...this.state,
          animeList: res.data,
          page: res.links
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  changePage = async (page) => {
    switch (page) {
      case 'first':
        if (!this.state.page.first) console.log(`Page Doesn't Exist`);
        else {
          await this.setState({
            ...this.state,
            baseURL: this.state.page.first
          })
          this.fetchData()
        }
        break;
      case 'prev':
        if (!this.state.page.prev) console.log(`Page Doesn't Exist`);
        else {
          await this.setState({
            ...this.state,
            baseURL: this.state.page.prev
          })
          this.fetchData()
        }
        break;
      case 'next':
        if (!this.state.page.next) console.log(`Page Doesn't Exist`);
        else {
          await this.setState({
            ...this.state,
            baseURL: this.state.page.next
          })
          this.fetchData()
        }
        break;
      case 'last':
        if (!this.state.page.last) console.log(`Page Doesn't Exist`);
        else {
          await this.setState({
            ...this.state,
            baseURL: this.state.page.last
          })
          this.fetchData()
        }
        break;
      default:
        break;
    }
  }

  componentDidMount () {
    this.fetchData ()
  }
 
  render () {
    const { animeList } = this.state;
    return (
      <div>
        <h1 className="page-title text-center">OnioNime</h1>
        <Container className="text-center">
          <center>
            <SearchForm search={this.search}/>
          </center>
          {/* tombol page ini nanti sepertinya bisa dipecah jadi component */}
          <div className="btn-group">
            <Button style={{"fontSize":"10px"}} variant="secondary" onClick={() => this.changePage('first')}>First</Button>
            <Button style={{"fontSize":"10px"}} variant="secondary" onClick={() => this.changePage('prev')}>&lt;&lt; Prev</Button>
            <Button style={{"fontSize":"10px"}} variant="secondary" onClick={() => this.changePage('next')}>Next &gt;&gt;</Button>
            <Button style={{"fontSize":"10px"}} variant="secondary" onClick={() => this.changePage('last')}>Last</Button>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            {
              animeList.map(anime => {
                return (
                  <AnimeDetail
                    anime={anime}
                    key={anime.id}
                  />
                )
              })
            }
          </div>
          <div className="btn-group">
            <Button style={{"fontSize":"10px"}} variant="secondary" onClick={() => this.changePage('first')}>First</Button>
            <Button style={{"fontSize":"10px"}} variant="secondary" onClick={() => this.changePage('prev')}>&lt;&lt; Prev</Button>
            <Button style={{"fontSize":"10px"}} variant="secondary" onClick={() => this.changePage('next')}>Next &gt;&gt;</Button>
            <Button style={{"fontSize":"10px"}} variant="secondary" onClick={() => this.changePage('last')}>Last</Button>
          </div>
          </Container>
      </div>
    )
  }
}

export default App;
