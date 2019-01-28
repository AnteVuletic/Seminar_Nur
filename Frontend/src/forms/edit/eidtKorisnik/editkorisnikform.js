import React from 'react'
import '../../form.css'

class editkorisnikform extends React.Component{
    constructor(props){
        super(props)
        this.state = {KorisnikId: this.props.KorisnikId, Oib : this.props.Oib , Ime: this.props.Ime , Prezime : this.props.Prezime}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeOib = this.handleChangeOib.bind(this)
        this.handleChangeIme = this.handleChangeIme.bind(this)
        this.handleChangePrezime = this.handleChangePrezime.bind(this)
    }
    handleSubmit(event){
        fetch('http://192.168.0.126:3001/api/edit/user', {
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
export default editkorisnikform;