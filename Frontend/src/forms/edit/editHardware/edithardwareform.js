import React from 'react'
import '../../form.css'
import Dropdown from '../../dropdown/dropdown'


class edithardwareform extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            HardwareId : this.props.HardwareId, 
            KorisnikId : this.props.KorisnikId , 
            ProstorijaId: this.props.ProstorijaId,
            Model: this.props.Model,
            korisnikList : [],
            prostorijaList : [],
            modelList : []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.initializeListKorisnik()
        this.initializeListModel()
        this.initializeListProstorija()
        
    }
    initializeListKorisnik(){
        return fetch(`http://192.168.0.126:3001/api/all/Korisnik`)
            .then(response => response.json()).then(data => data.map(arrayElement =>{
                let tmpElement = {  [arrayElement.KorisnikId] : arrayElement.Prezime }
                this.setState(prevState => ({
                    korisnikList : [...prevState.korisnikList,tmpElement]
                 }))
            }))
    }
    initializeListProstorija(){
        return fetch(`http://192.168.0.126:3001/api/all/Prostorija`)
            .then(response => response.json()).then(data => data.map(arrayElement =>{
                let tmpElement = { [arrayElement.ProstorijaId] : arrayElement.Adresa}
                this.setState(prevState => ({
                    prostorijaList : [...prevState.prostorijaList,tmpElement]
                 }))
            }))
    }
    initializeListModel(){
        return fetch(`http://192.168.0.126:3001/api/all/Model`)
            .then(response => response.json()).then(data =>{ 
                let numberId = 0;
                data.map(arrayElement =>{
                    numberId++;
                    let tmpElement = { [numberId] : arrayElement.Model}
                    this.setState(prevState => ({
                        modelList : [...prevState.modelList,tmpElement]
                    }))
            })
        })
    }
    handleKorisnik = (korisnikValue) =>{
        this.setState({ KorisnikId : parseInt(korisnikValue)})
    }
    handleProstorija = (prostorijaValue) =>{
        this.setState({ ProstorijaId : parseInt(prostorijaValue)})
    }
    handleModel = (modelValue) =>{
        const modelValueInt = parseInt(modelValue)
        this.setState({ Model : this.state.modelList[modelValueInt-1]})
    }
    handleSubmit(event){
        const packData = JSON.stringify(this.state)
        fetch('http://192.168.0.126:3001/api/edit/hardware', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: packData
        }).then(response => console.log(response.json())).catch(err => console.log(err))
    }
    render(){
        let indexOfUser = this.state.korisnikList.findIndex((element => Object.keys(element) == this.state.KorisnikId ))
        let indexOfRoom = this.state.prostorijaList.findIndex((element => Object.keys(element) == this.state.ProstorijaId))
        if(this.state.korisnikList[indexOfUser] == undefined || this.state.prostorijaList[indexOfRoom] == undefined)
            return (<div></div>)
        else{
            return(
                <form className="form" onSubmit={this.handleSubmit} >
                    <p>Hardware</p>
                    <Dropdown title={Object.values(this.state.korisnikList[indexOfUser])}
                            list={this.state.korisnikList} 
                            selectedItem={this.handleKorisnik}/>
                    <Dropdown title={this.state.Model}
                            list={this.state.modelList}
                            selectedItem={this.handleModel}/> 
                    <Dropdown title={Object.values(this.state.prostorijaList[indexOfRoom]) }
                            list={this.state.prostorijaList}
                            selectedItem={this.handleProstorija}/>                 
                    <input className="button" type="submit" value="Confirm"></input>
                </form>
            )
        }
    }
}
export default edithardwareform;