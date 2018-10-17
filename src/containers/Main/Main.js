import React, {Component} from 'react';
import Logo from '../../components/Logo/Logo';
import StatusInfo from '../../components/StatusInfo/StatusInfo';
import Form from '../../components/Form/Form';
import Image from '../../components/Image/Image';

const initState = {
    input: '',
    url: '',
    entries: 0,
    boxes: []
}

class Main extends Component{
    constructor(props){
        super(props);
        this.state = initState;
        this.state.entries = this.props.user.entries;
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onDetect = () => {
        this.setState({url: this.state.input, boxes: []})
        fetch('http://localhost:3000/clarifai', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({url: this.state.input})
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                this.showBox(this.caclBox(data));
            }
        })
        .then(() => {
            return fetch('http://localhost:3000/entry', {
                        method: 'put',
                        headers: {"Content-Type": "application/json"},
                        body:JSON.stringify({id: this.props.user.id})
                    })
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            this.setState({entries: data})
        })
        .catch(err => console.log(err))
    }

    caclBox = (data) => {
        if(!data.outputs[0].data.regions)
        {
            return []
        }
        return data.outputs[0].data.regions.map((item) => {
            const clarifaiFace = item.region_info.bounding_box;
            const image = document.getElementById(`target-image`);
            const width = Number(image.width);
            const height = Number(image.height);
            return {
              leftCol: clarifaiFace.left_col * width,
              topRow: clarifaiFace.top_row * height,
              rightCol: width - (clarifaiFace.right_col * width),
              bottomRow: height - (clarifaiFace.bottom_row * height)
            }
        })
      }

    showBox(boxes){
        this.setState({boxes: boxes});
    }

    render(){
        const {url, boxes} = this.state;
        return (
            <div>
                <Logo />
                <StatusInfo name={this.props.user.name} entries={this.state.entries}/>
                <Form onChange={this.onInputChange} onDetect={this.onDetect} />
                <Image url={url} boxes={boxes} />
            </div>
        )
    }
}

export default Main;