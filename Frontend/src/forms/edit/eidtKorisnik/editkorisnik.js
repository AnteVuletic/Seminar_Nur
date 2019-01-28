import React from 'react'
import Editkorisnikform from './editkorisnikform'

class editkorisnik extends React.Component{
    constructor(){
        super()
        this.state = {
            korisnikList : []
        }
        this.initializeListKorisnik()
    }
    initializeListKorisnik(){
        return fetch(`http://192.168.0.126:3001/api/all/Korisnik`)
            .then(response => response.json()).then(data => data.map(arrayElement =>{
                this.setState(prevState => ({
                    korisnikList : [...prevState.korisnikList,arrayElement]
                 }))
            }))
    }
    render(){
        return(
            <div>
                {this.state.korisnikList.map(element=>{
                    return <Editkorisnikform Oib={element.Oib} Ime={element.Ime} Prezime={element.Prezime} KorisnikId={element.KorisnikId} />
                })}
            </div>
        )
    }
}
export default editkorisnik;