import React from 'react'
import '../../form.css'

class editprostorijaform extends React.Component{
    constructor(props){
        super(props)
        this.state = { ProstorijaId: this.props.ProstorijaId , Adresa: this.props.Adresa}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeAdresa = this.handleChangeAdresa.bind(this)
    }
    handleSubmit(event){
        fetch('http://192.168.0.126:3001/api/edit/prostorija', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(this.state)
        }).then(response => console.log(response.json()))
    }
    handleChangeAdresa(event){
        this.setState({Adresa : event.target.value})
    }
    render(){
        return(
            <form className="form" onSubmit={this.handleSubmit} >
                <p>Prostorija</p>
                <label>Adresa:</label>
                <input type="text" value={this.state.Adresa} onChange={this.handleChangeAdresa}></input>
                <input className="button" type="submit" value="Confirm"></input>
            </form>
        )
    }
}
export default editprostorijaform;