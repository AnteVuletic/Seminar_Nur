import React from 'react'
import Prostorijadetailgraphic from './prostorijadetail'

class prostorijadetails extends React.Component{
    constructor(){
        super()
        this.state={
            prostorijaDetailList : []
        }
        this.initializeProstorija()
    }
    initializeProstorija(){
     return fetch(`http://192.168.0.126:3001/api/sorted/prostorija`)
        .then(response => response.json()).then(data => data.map(arrayElement =>{
            let tmpElement = { [arrayElement.Adresa] : arrayElement}
            this.setState(prevState =>{
                let isSame = -1
                for (let index = 0; index < prevState.prostorijaDetailList.length; index++) {
                    const element = prevState.prostorijaDetailList[index];
                    if(element.Adresa == tmpElement.Adresa)
                        isSame = index
                }
                if(isSame === -1)
                 {
                   this.setState({prostorijaDetailList : [...prevState.prostorijaDetailList,tmpElement]})
                 }
                 else
                 {
                    this.setState({
                        prostorijaDetailList : [prevState.prostorijaDetailList.insert(isSame,...Object.values(tmpElement))]
                    })
                 }
            })}))
    }
    render(){
        return(
            <div>
                {this.state.prostorijaDetailList.forEach(element => {
                    console.log(element)
                    return <Prostorijadetailgraphic Adresa={Object.keys(element)} Details={element} />
                })}
            </div>
        )
    }
}
export default prostorijadetails;