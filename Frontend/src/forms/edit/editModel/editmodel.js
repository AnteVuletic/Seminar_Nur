import React from 'react'
import Editmodelform from './editmodelform'

class editmodel extends React.Component{
    constructor(){
        super()
        this.state = {
            modelList : []
        }
        this.initiliazeModel()
    }
    initiliazeModel(){
        return fetch(`http://127.0.0.1:3001/api/all/Model`)
        .then(response => response.json()).then(data =>  data.map(arrayElement =>{
                this.setState(prevState => ({
                    modelList : [...prevState.modelList,arrayElement]
                }))
            })
        )
    }
    render(){
        console.log(this.state.modelList)
        return(
            <div>
                {this.state.modelList.map(element =>{
                    return <Editmodelform Model={element.Model} Marka={element.Marka}/>
                })}
            </div>
        )
    }
}
export default editmodel;