import React from 'react'
import '../../form.css'

class editmodelform extends React.Component{
    constructor(props){
        super(props)
        this.state = { Model: this.props.Model,Marka: this.props.Marka}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeModel = this.handleChangeModel.bind(this)
        this.handleChangeMarka = this.handleChangeMarka.bind(this)
    }
    handleSubmit(event){
        let payload = JSON.stringify([this.state,this.props])
        fetch('http://192.168.0.126:3001/api/edit/model', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: payload
        }).then(response => console.log(response.json()))
    }
    handleChangeModel(event){
        this.setState({Model : event.target.value})
    }
    handleChangeMarka(event){
        this.setState({Marka : event.target.value})
    }
    render(){
        return(
            <form className="form" onSubmit={this.handleSubmit} >
                <p>Model</p>
                <label>Model:</label>
                <input type="text" value={this.state.Model} onChange={this.handleChangeModel}></input>
                <label>Marka:</label>
                <input type="text" value={this.state.Marka} onChange={this.handleChangeMarka}></input>
                <input className="button" type="submit" value="Confirm"></input>
            </form>
        )
    }
}
export default editmodelform;