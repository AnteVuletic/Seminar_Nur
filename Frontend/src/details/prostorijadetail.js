import React from 'react'
import Hardwaresoftwaredetail from './hardwaresoftwaredetail'
import './details.css'

class prostorijadetail extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <section className="prostorijadetails">
                <p className="title">{this.props.Adresa}</p>
                {this.props.ProstorijaDetails.map(element =>{
                    return <Hardwaresoftwaredetail Model={Object.values(element)[0].Model} OS={Object.values(element)[0].OS} />
                })}
            </section>
        )
    }
}
export default prostorijadetail;