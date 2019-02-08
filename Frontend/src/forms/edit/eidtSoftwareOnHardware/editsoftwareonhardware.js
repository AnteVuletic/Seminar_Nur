import React from 'react'
import Editsoftwareonhardwareform from './editsoftwareonhardwareform'

class editsoftwareonhardware extends React.Component{
    constructor(){
        super()
        this.state = {
            softwareOnHardwareList: []
        }
        this.initializeSoftwareOnHardware()
    }
    initializeSoftwareOnHardware(){
        return fetch(`http://127.0.0.1:3001/api/all/Software_Hardware`)
        .then(response => response.json()).then(data => data.map(arrayElement =>{    
            this.setState(prevState => ({
                softwareOnHardwareList : [...prevState.softwareOnHardwareList,arrayElement]
             }))
        }))
    }
    render(){
        return(
            <div>
                {this.state.softwareOnHardwareList.map(element =>{
                    return <Editsoftwareonhardwareform HardwareId={element.HardwareId} SoftwareId={element.SoftwareId} Azurirano={element.Azurirano} Namjena={element.Namjena}/>
                })}
            </div>
        )
    }
}
export default editsoftwareonhardware;