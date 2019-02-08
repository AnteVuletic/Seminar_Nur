import React from 'react'
import Editprostorijaform from './editprostorijaform'

class editprostorija extends React.Component{
    constructor(){
        super()
        this.state ={
            prostorijaList : []
        }
        this.initializeProstorija()
    }
    initializeProstorija(){
        return fetch(`http://127.0.0.1:3001/api/all/Prostorija`)
        .then(response => response.json()).then(data => data.map(arrayElement =>{
            this.setState(prevState => ({
                prostorijaList : [...prevState.prostorijaList,arrayElement]
             }))
        }))
    }
    render(){
        return(
            <div>
                {this.state.prostorijaList.map(element=>{
                    return <Editprostorijaform Adresa={element.Adresa} ProstorijaId={element.ProstorijaId}/>
                })}
            </div>
        )
    }
}
export default editprostorija;