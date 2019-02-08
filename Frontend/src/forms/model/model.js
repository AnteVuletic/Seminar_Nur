import React from 'react'
import '../form.css'

class model extends React.Component{
    constructor(){
        super()
        this.state = { Model: '',Marka: ''}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeModel = this.handleChangeModel.bind(this)
        this.handleChangeMarka = this.handleChangeMarka.bind(this)
    }
    handleSubmit(event){
        fetch('http://127.0.0.1:3001/api/add/model', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(this.state)
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
export default model;