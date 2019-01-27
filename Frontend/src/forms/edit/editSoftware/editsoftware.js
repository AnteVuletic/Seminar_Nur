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
        return fetch(`http://192.168.0.126:3001/api/all/Software`)
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
                    return <Editsoftwareform Os={element.OS} Licenca={element.Licenca} />
                })}
            </div>
        )
    }

}
export default editsoftware;