import React from 'react'
import '../form.css'

class software extends React.Component{
    constructor(){
        super()
        this.state = { Os : '' , Licenca: ''}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeOs = this.handleChangeOs.bind(this)
        this.handleChangeLicense = this.handleChangeLicense.bind(this)
    }
    handleSubmit(event){
        fetch('http://127.0.0.1:3001/api/add/software', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(this.state)
        }).then(response => console.log(response.json()))
    }
    handleChangeOs(event){
        this.setState({Os : event.target.value})
    }
    handleChangeLicense(event){
        this.setState({Licenca : event.target.value})
    }
    render(){
        return(
            <form className="form" onSubmit={this.handleSubmit} >
                <p>Software</p>
                <label>OS:</label>
                <input type="text" value={this.state.Os} onChange={this.handleChangeOs}></input>
                <label>Licenca:</label>
                <input type="text" value={this.state.Licenca} onChange={this.handleChangeLicense}></input>
                <input className="button" type="submit" value="Confirm"></input>
            </form>
        )
    }
}
export default software;