import React from 'react'
import Edithardwareform from './edithardwareform'

class edithardware extends React.Component{
    constructor(){
        super()
        this.state = {
            hardwareList: []
        }
        this.initializeHardware()
    }
    initializeHardware(){
        return fetch(`http://192.168.0.126:3001/api/all/Hardware`)
        .then(response => response.json()).then(data => data.map(arrayElement =>{    
            this.setState(prevState => ({
                hardwareList : [...prevState.hardwareList,arrayElement]
             }))
        }))
    }
    render(){
        return(
            <div>
                {this.state.hardwareList.map(element =>{
                    return <Edithardwareform KorisnikId={element.KorisnikId} ProstorijaId={element.ProstorijaId} Model={element.Model} />
                })}
            </div>
        )
    }
}
export default edithardware;