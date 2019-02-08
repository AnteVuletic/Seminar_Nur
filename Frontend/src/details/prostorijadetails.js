import React from 'react'
import Prostorijadetailgraphic from './prostorijadetail'
import './details.css'

class prostorijadetails extends React.Component{
    constructor(){
        super()
        this.state={
            prostorijaDetailList : []
        }
        let promise = fetch(`http://127.0.0.1:3001/api/sorted/prostorija`)
        .then(response => response.json()).then(data => data.map(arrayElement =>{
            let tmpElement = { [arrayElement.Adresa] : arrayElement}
            this.state.prostorijaDetailList = [...this.state.prostorijaDetailList,tmpElement]}))
    }
    toRender= () =>{
        let prostorijaDetailList = this.state.prostorijaDetailList
        let prostorije = []
        for(let index = 0; index < prostorijaDetailList.length; index++) 
        {
            let specificAddressList = prostorijaDetailList.filter(elementInQuestion => Object.keys(elementInQuestion).toString() === Object.keys(prostorijaDetailList[index]).toString())
            index = prostorijaDetailList.findIndex(findthis => findthis == specificAddressList[specificAddressList.length-1])
            prostorije.push(<Prostorijadetailgraphic Adresa={Object.keys(specificAddressList[0]).toString()} ProstorijaDetails={specificAddressList}/>)
        }
        return prostorije;
    }
    render(){
        return(
            <div>
                {this.toRender()}
            </div>
        )
    }
}
export default prostorijadetails;