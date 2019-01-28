import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../home/home'
import Add from '../add/add'
import './navbar.css'
import EditSoftware from '../forms/edit/editSoftware/editsoftware'
import EditHardware from '../forms/edit/editHardware/edithardware'
import EditSoftwareOnHardware from '../forms/edit/eidtSoftwareOnHardware/editsoftwareonhardware'
import EditKorisnik from '../forms/edit/eidtKorisnik/editkorisnik'
import EditModel from '../forms/edit/editModel/editmodel'
import EditProstorija from '../forms/edit/editProstorija/editprostorija'
import ProstorijaDetails from '../details/prostorijadetails'

class navbar extends React.Component{
    constructor(){
        super()
        this.state = {
            subMenu : false
        }
    }
    render(){
        return(
            <Router>
                <div>
                    <nav className="container">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/add">Add</Link>
                            </li>
                            <li>
                                <a onClick={() => this.setState(prevState => ({ subMenu : !prevState.subMenu}))}>Edit</a>
                                    {this.state.subMenu && <ul className="container">
                                        <li><Link to="/edit/software">Software</Link></li>
                                        <li><Link to="/edit/hardware">Hardware</Link></li>
                                        <li><Link to="/edit/softwareonhardware">Software on hardware</Link></li>
                                        <li><Link to="/edit/korisnik/">Korisnik</Link></li>
                                        <li><Link to="/edit/model/">Model</Link></li>
                                        <li><Link to="/edit/prostorija">Prostorija</Link></li>
                                    </ul> }
                            </li>
                            <li>
                                <Link to="/view/prostorija">Prostorija details</Link>
                            </li>
                        </ul>
                    </nav>
                    <Route path="/" exact component={Home} />
                    <Route path="/add/" component={Add} />
                    <Route path="/edit/software" component={EditSoftware} />
                    <Route path="/edit/hardware" component={EditHardware} />
                    <Route path="/edit/softwareonhardware" component={EditSoftwareOnHardware}/>
                    <Route path="/edit/korisnik" component={EditKorisnik}/>
                    <Route path="/edit/model" component={EditModel}/>
                    <Route path="/edit/prostorija" component={EditProstorija}/>
                    <Route path="/view/prostorija" component={ProstorijaDetails}/>
                </div>
            </Router>
        )
    }
}
export default navbar;