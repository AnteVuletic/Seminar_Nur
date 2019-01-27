import React from 'react'
import Software from '../forms/software/software'
import Korisnik from '../forms/korisnik/korisnik'
import Model from '../forms/model/model'
import Prostorija from '../forms/prostorija/prostorija'
import Hardware from '../forms/hardware/hardware'
import Hardware_Software from '../forms/software_hardware/software_hardware'

class add extends React.Component{
    render(){
        return(
            <div className="container">
                <Software></Software>
                <Korisnik></Korisnik>
                <Model></Model>
                <Prostorija></Prostorija>
                <Hardware></Hardware>
                <Hardware_Software></Hardware_Software>
            </div>
        )
    }
}
export default add;