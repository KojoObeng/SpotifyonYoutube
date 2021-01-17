import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import PlaylistButton from "../components/PlaylistButton"
import "../css/pickPlaylist.css"
import PlaylistNavigation from "../components/PlaylistNavBar"

const spotifyWebApi = new Spotify();

class PickPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
        }
        this.getPlaylists = this.getPlaylists.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        spotifyWebApi.setAccessToken(localStorage.getItem("access_token"))
        
    }
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentDidMount() {
        this.getPlaylists()
    }
    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll (e) {
        let lastScrollTop = 0;
        const currentScrollTop = PlaylistNavigation.scrollTop;

        if (!this.state.hidden && currentScrollTop > lastScrollTop) {
          this.setState({ hidden: true });
        } else if(this.state.hidden) {
          this.setState({ hidden: false });
        }
        lastScrollTop = currentScrollTop;
    }
    getPlaylists () {
        spotifyWebApi.getUserPlaylists()
        .then((response) => {
            this.setState({playlists: response.items})})
        .catch((error) => {
            console.log(error)
        });
    }
    render() {
        return(
            <div className="playlist-page">
                <PlaylistNavigation id="navbar" hidden={this.state.hidden}></PlaylistNavigation>
                {/* <div className="pick-a-playlist-text">
                    Pick a playlist
                </div> */}
                <div className="playlists-container">
                    {this.state.playlists.map((playlist, index) => (
                        <PlaylistButton key={playlist.name} id={playlist.id} index={index} name={playlist.name} image={playlist.images[0].url}></PlaylistButton>
                        ))}
                </div>
            </div>
        )
    }
}

export default PickPlaylist;