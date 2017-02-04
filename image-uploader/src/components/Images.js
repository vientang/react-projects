/* eslint-disable no-console */
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import CloudinaryKeys from '../apikeys/keys'

let CloudinaryConfig = {
	cloudName: 'asyncingfeeling',
	url: `https://api.cloudinary.com/v1_1/asyncingfeeling/image/upload`,
	uploadPreset: CloudinaryKeys.uploadPreset
}

class Images extends Component {
	constructor(props) {
		super(props)
		this.uploadFile = this.uploadFile.bind(this)
	}
	uploadFile(files) {
		console.log("We are going to upload a file")
		const image = files[0]
		const cloudName = CloudinaryConfig.cloudName
		const url = CloudinaryConfig.url
		const timestamp = Date.now()/1000
		const uploadPreset = CloudinaryConfig.uploadPreset
	}
	render() {
		return (
			<div>
				This is the Image component
				<Dropzone onDrop={this.uploadFile}/>
			</div>
		)
	}
}

export default Images