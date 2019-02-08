import React from 'react'
import Editsoftwareform from './editsoftwareform'

class editsoftware extends React.Component{
    constructor(){
        super()
        this.state = {
            softwareList: []
        }
        this.initializeList()
    }
    initializeList(event){
        return fetch(`http://127.0.0.1:3001/api/sorted/Software`)
            .then(response => response.json()).then(data => data.map(arrayElement =>{
                this.setState(prevState => ({
                    softwareList : [...prevState.softwareList,arrayElement]
                    }))
            }))
    }
    render(){
        return(
            <div>
                {this.state.softwareList.map(element => {
                    return <Editsoftwareform SoftwareId={element.SoftwareId} Os={element.OS} Licenca={element.Licenca}/>
                })}
            </div>
        )
    }

}
export default editsoftware;