import React from 'react'

class hardwaresoftwaredetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Model : this.props.Model,
            OS : this.props.OS
        }
    }
    render(){
        return(<div>
                <h1>{this.state.Model}</h1>
                <h2>{this.state.OS}</h2>
            </div>)
    }
}
export default hardwaresoftwaredetail;