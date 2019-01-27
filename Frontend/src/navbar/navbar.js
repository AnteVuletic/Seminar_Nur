import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../home/home'
import Add from '../add/add'
import './navbar.css'
import EditSoftware from '../forms/edit/editSoftware/editsoftware'
import EditHardware from '../forms/edit/editHardware/edithardware'

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
                                        <Link to="/edit/software">Software</Link>
                                        <Link to="/edit/hardware">Hardware</Link>
                                        <li>Software on hardware</li>
                                        <li>Korisnik</li>
                                        <li>Model</li>
                                        <li>Prostorija</li>
                                    </ul> }
                            </li>
                        </ul>
                    </nav>
                    <Route path="/" exact component={Home} />
                    <Route path="/add/" component={Add} />
                    <Route path="/edit/software" component={EditSoftware} />
                    <Route path="/edit/hardware" component={EditHardware} />
                </div>
            </Router>
        )
    }
}
export default navbar;