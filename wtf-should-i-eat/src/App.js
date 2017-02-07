import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import Places from './components/Places'
import Keys from './apiKeys'
import superagent from 'superagent'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			location: {
				lat: 37.7749,
				lng: -122.4194
			},
			venues: []
		}
	}
	
	// call componentWillMount to get the geolocation lat and lng
	// setState on location.lat and location.lng
	componentDidMount() {		
		const url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll=37.7749%2C-122.4194&client_id='+Keys.fsqr.client_id+'&client_secret='+Keys.fsqr.client_secret
		const urlEncoded = encodeURIComponent(url)
		superagent
			.get(url)
			.query(null)
			.set('Accept', 'text/json')
			.end((error, response) => {
				const venues = response.body.response.venues				
				this.setState({venues: venues})
			})
	}

	render() {
		const markers = [
			{
				location: {
					lat: this.state.location.lat,
					lng: this.state.location.lng
				}
			}
		]
		
		return (
			<div>
				<h1>wtf should I eat</h1>
				<div className="map">
					<Map center={this.state.location} markers={markers}/>
					<Places venues={this.state.venues} />
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))