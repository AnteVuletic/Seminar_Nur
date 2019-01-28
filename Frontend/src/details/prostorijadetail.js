import React from 'react'
import Hardwaresoftwaredetail from './hardwaresoftwaredetail'

class prostorijadetail extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            Adresa : this.props.Adresa,
            ProstorijaDetails : this.props.Details          
        }
    }

    render(){
        return(
            <section>
                <h1>{this.state.nazivProstorije}</h1>
                {this.ProstorijaDetails.foreach(element =>{
                    console.log(element)
                    //return <Hardwaresoftwaredetail Model={element.Model} OS={model.Os} />
                })}
            </section>
        )
    }
}
export default prostorijadetail;