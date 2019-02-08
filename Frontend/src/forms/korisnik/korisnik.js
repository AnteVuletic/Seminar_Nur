import React from 'react'
import '../form.css'

class korisnik extends React.Component{
    constructor(){
        super()
        this.state = { Oib : '' , Ime: '', Prezime : ''}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeOib = this.handleChangeOib.bind(this)
        this.handleChangeIme = this.handleChangeIme.bind(this)
        this.handleChangePrezime = this.handleChangePrezime.bind(this)
    }
    handleSubmit(event){
        fetch('http://127.0.0.1:3001/api/add/user', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(this.state)
        }).then(response => console.log(response.json()))
    }
    handleChangeOib(event){
        this.setState({Oib : event.target.value})
    }
    handleChangeIme(event){
        this.setState({Ime : event.target.value})
    }
    handleChangePrezime(event){
        this.setState({Prezime : event.target.value})
    }
    render(){
        return(
            <form className="form" onSubmit={this.handleSubmit} >
                <p>Korisnik</p>
                <label>OIB:</label>
                <input type="text" value={this.state.Oib} onChange={this.handleChangeOib}></input>
                <label>Ime:</label>
                <input type="text" value={this.state.Ime} onChange={this.handleChangeIme}></input>
                <label>Prezime:</label>
                <input type="text" value={this.state.Prezime} onChange={this.handleChangePrezime}></input>
                <input className="button" type="submit" value="Confirm"></input>
            </form>
        )
    }
}
export default korisnik;