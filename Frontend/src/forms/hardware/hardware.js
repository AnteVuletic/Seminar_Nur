import React from 'react'
import '../form.css'
import Dropdown from '../dropdown/dropdown'


class hardware extends React.Component{
    constructor(){
        super()
        this.state = { 
            KorisnikId : 0 , 
            ProstorijaId: 0,
            Model: '',
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
        return fetch(`http://127.0.0.1:3001/api/all/Korisnik`)
            .then(response => response.json()).then(data => data.map(arrayElement =>{
                let tmpElement = {  [arrayElement.KorisnikId] : arrayElement.Prezime }
                this.setState(prevState => ({
                    korisnikList : [...prevState.korisnikList,tmpElement]
                 }))
            }))
    }
    initializeListProstorija(){
        return fetch(`http://127.0.0.1:3001/api/all/Prostorija`)
            .then(response => response.json()).then(data => data.map(arrayElement =>{
                let tmpElement = { [arrayElement.ProstorijaId] : arrayElement.Adresa}
                this.setState(prevState => ({
                    prostorijaList : [...prevState.prostorijaList,tmpElement]
                 }))
            }))
    }
    initializeListModel(){
        return fetch(`http://127.0.0.1:3001/api/all/Model`)
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
        this.setState({ KorisnikId : korisnikValue})
    }
    handleProstorija = (prostorijaValue) =>{
        this.setState({ ProstorijaId : prostorijaValue})
    }
    handleModel = (modelValue) =>{
        const modelValueInt = parseInt(modelValue)
        this.setState({ Model : this.state.modelList[modelValueInt-1]})
    }
    handleSubmit(event){
        const packData = JSON.stringify(this.state)
        fetch('http://127.0.0.1:3001/api/add/hardware', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: packData
        }).then(response => console.log(response.json())).catch(err => console.log(err))
    }
    render(){
        return(
            <form className="form" onSubmit={this.handleSubmit} >
                <p>Hardware</p>
                <Dropdown title="Korisnik"
                        list={this.state.korisnikList} 
                        selectedItem={this.handleKorisnik}/>
                <Dropdown title="Model"
                        list={this.state.modelList}
                        selectedItem={this.handleModel}/> 
                <Dropdown title="Prostorija"
                        list={this.state.prostorijaList}
                        selectedItem={this.handleProstorija}/>                 
                <input className="button" type="submit" value="Confirm"></input>
            </form>
        )
    }
}
export default hardware;