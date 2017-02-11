/* eslint-disable no-console */
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import CloudinaryKeys from '../apikeys/keys'
import sha1 from 'sha1'
import superagent from 'superagent'

let CloudinaryConfig = {
	cloudName: 'asyncing-feeling',
	url: 'https://api.cloudinary.com/v1_1/asyncing-feeling/image/upload',
	uploadPreset: CloudinaryKeys.uploadPreset,
	apiKey: CloudinaryKeys.apiKey,
	secret: CloudinaryKeys.apiSecret
}

class Images extends Component {
	constructor(props) {
		super(props)
		this.state = { images: [], hover: false, gallery: [] }
		this.uploadFile = this.uploadFile.bind(this)
		this.removeImage = this.removeImage.bind(this)
		this.toggleHover = this.toggleHover.bind(this)
	}

	componentDidMount() {
		superagent.get('http://res.cloudinary.com/asyncing-feeling/image/upload/v1486280456/ni8xz91hweae244fbaqw.jpg')
			.then(res => {
        const updatedGallery = this.state.gallery
        updatedGallery.push(res.req.url);
        
        console.log(updatedGallery);
        this.setState({gallery: updatedGallery});
	    });
	}

	uploadFile(files) {		
		const image = files[0]
		const cloudName = CloudinaryConfig.cloudName
		const url = CloudinaryConfig.url
		const timestamp = Date.now()/1000
		const uploadPreset = CloudinaryConfig.uploadPreset
		const secret = CloudinaryConfig.secret
		const paramStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}${secret}`
		const signature = sha1(paramStr);
		const params = {
			'api_key': CloudinaryConfig.apiKey,
			'timestamp': timestamp,
			'upload_preset': uploadPreset,
			'signature': signature
		}

		let uploadRequest = superagent.post(url)
		uploadRequest.attach('file',image)

		Object.keys(params).forEach((key) => {
			uploadRequest.field(key, params[key])
		})

		uploadRequest.end((err, res) => {			
			if (err) {
				console.log(err)
				return
			}
			const uploaded = res.body;
			let updatedImages = Object.assign([], this.state.images);
			updatedImages.push(uploaded)
			this.setState({
				images: updatedImages
			})
		})
	}

	removeImage(event) {
		event.preventDefault()
		let id = event.target.id		
		this.state.images.splice(id, 1)
		let updatedImages = Object.assign([], this.state.images)
		this.setState({
			images: updatedImages
		})
	}

	toggleHover() {
		this.setState({hover: !this.state.hover})
	}

	render() {
		let dzStyle;
		this.state.hover ? dzStyle = {cursor: 'pointer'} : dzStyle = {cursor: 'default'}
		const list = this.state.images.map((image,i) => {
			return (
				<li key={i}>
					<img src={image.secure_url} />
					<a className="remove-text" onClick={this.removeImage} href="#" id={i}>Remove</a>
				</li>
			)
		})
		const gallery = this.state.gallery.map((image, i) => {
			return (
				<li key={i}>
					<img src={image} />					
				</li>
			)
		})
		return (
			<div >
				<p>Upload an image</p>
				<div style={dzStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
					<Dropzone
						onDrop={this.uploadFile}
						multiple={false}
			      accept="image/*">			      
			      <p className="dz-text">Drag or click to upload an image</p>
			    </Dropzone>
				</div>
					<ul>
						{ list }
					</ul>
					<ul>
						{ gallery }
					</ul>
			</div>
		)
	}
}

export default Images