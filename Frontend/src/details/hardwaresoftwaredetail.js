import React from 'react'
import './details.css'

class hardwaresoftwaredetail extends React.Component{
    constructor(props){
        super(props)
        this.render()
    }
    render(){
        console.log(this.props.Model)
        return(
            <section className="hardwaresoftwaredetail">
                <p>{this.props.Model}</p>
                <p>{this.props.OS}</p>
            </section>
        )
    }
}
export default hardwaresoftwaredetail;