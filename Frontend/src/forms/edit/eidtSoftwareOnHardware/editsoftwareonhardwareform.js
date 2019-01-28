import React from 'react'
import '../../form.css'
import Dropdown from '../../dropdown/dropdown'


class hardwareonsoftwareform extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            HardwareId : this.props.HardwareId , 
            SoftwareId: this.props.SoftwareId,
            Azurirano :  this.props.Azurirano,
            Namjena: this.props.Namjena,
            hardwareList : [],
            softwareList : [],
            korisnikList : []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAzurirano = this.handleAzurirano.bind(this)
        this.handleChangeNamjena = this.handleChangeNamjena.bind(this)
        this.initializeListSoftware()  
        var promise = this.initializeListKorisnik()
        promise.then(() => this.initializeListHardware())
    }
    initializeListKorisnik(){
        return fetch(`http://192.168.0.126:3001/api/all/Korisnik`)
            .then(response => response.json()).then(data => data.map(arrayElement =>{
                let tmpElement = {  [arrayElement.KorisnikId] : arrayElement.Ime + " " + arrayElement.Prezime }
                this.setState(prevState => ({
                    korisnikList : [...prevState.korisnikList,tmpElement]
                 }))
            }))

    }
    initializeListHardware(){
        return fetch(`http://192.168.0.126:3001/api/all/Hardware`)
            .then(response => response.json()).then(data => data.map(arrayElement =>{    
                let tmpElement = {  [arrayElement.HardwareId] : this.state.korisnikList[this.state.korisnikList.findIndex((element => Object.keys(element) == arrayElement.KorisnikId ))][arrayElement.KorisnikId] + " " + arrayElement.Model }
                this.setState(prevState => ({
                    hardwareList : [...prevState.hardwareList,tmpElement]
                 }))
            }))
    }
    initializeListSoftware(){
        return fetch(`http://192.168.0.126:3001/api/all/Software`)
            .then(response => response.json()).then(data => data.map(arrayElement =>{
                let tmpElement = { [arrayElement.SoftwareId] : arrayElement.OS}
                this.setState(prevState => ({
                    softwareList : [...prevState.softwareList,tmpElement]
                 }))
            }))
    }
    handleHardware = (hardwareValue) =>{
        this.setState({ HardwareId : parseInt(hardwareValue)})
    }
    handleSoftware= (softwareValue) =>{
        this.setState({ SoftwareId : parseInt(softwareValue)})
    }
    handleAzurirano(event){
        this.setState(prevState => ({
            Azurirano : !prevState.Azurirano
        }))
    }
    handleChangeNamjena(event){
        this.setState({
            Namjena : event.target.value
        })
    }
    handleSubmit(event){
        const packData = JSON.stringify([this.state,this.props])
        console.log(packData)
        fetch('http://192.168.0.126:3001/api/edit/relation', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: packData
        }).then(response => console.log(response.json())).catch(err => console.log(err))
    }
    render(){
        let indexOfHardware = this.state.hardwareList.findIndex((element => Object.keys(element) == this.state.HardwareId));
        let indexOfSoftware = this.state.softwareList.findIndex((element => Object.keys(element) == this.state.SoftwareId));
        if(this.state.hardwareList[indexOfHardware] == undefined || this.state.softwareList[indexOfSoftware] == undefined)
            return(<div></div>)
        else{
            return(
                <form className="form" onSubmit={this.handleSubmit} >
                    <p>Edit software on hardware</p>
                    <Dropdown title={Object.values(this.state.hardwareList[indexOfHardware])}
                            list={this.state.hardwareList} 
                            selectedItem={this.handleHardware}/>
                    <Dropdown title={Object.values(this.state.softwareList[indexOfSoftware])}
                            list={this.state.softwareList}
                            selectedItem={this.handleSoftware}/> 
                    <label>Azuriranio</label>
                    <input className="checkBox" name='Ažurirano' type='checkbox' defaultChecked={this.state.Azurirano} value={this.state.Azurirano} onChange={this.handleAzurirano} /> 
                    <label>Namjena:</label>
                    <input type="text" value={this.state.Namjena} onChange={this.handleChangeNamjena}></input>               
                    <input className="button" type="submit" value="Confirm"></input>
                </form>
            )
        }
    }
}
export default hardwareonsoftwareform;