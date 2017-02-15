import React, { Component, PropTypes } from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

class Map extends Component {
	constructor(props) {
		super(props)		
	}

	render() {		
		const mapContainer = <div className="map-container"></div>
		const markers = this.props.markers.map((marker, i) => {
			const place = {
				position: {
					lat: marker.location.lat,
					lng: marker.location.lng
				}
			}
			return <Marker key={i} {...place} />
		})
		return (
			<GoogleMapLoader
				containerElement={mapContainer}
				googleMapElement={
					<GoogleMap
						defaultZoom={15}
						defaultCenter={this.props.center}
						options={{streetViewController: false, mapTypeControl: false}}>
						{ markers }
					</GoogleMap>
				} />
		)
	}
}

Map.propTypes = {
	center: PropTypes.object.isRequired,
	markers: PropTypes.array.isRequired
};

export default Map