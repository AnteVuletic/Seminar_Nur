import React from 'react'
import reactdom from 'react-dom'
import './dropdown.css'

class dropdown extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listOpen : false,
            headerTittle : this.props.title,
            selectedItem : ''
        }
        this.toggleList = this.toggleList.bind(this)
        this.clickInside = this.clickInside.bind(this)
    }
      toggleList(){
        this.setState(prevState => ({
          listOpen: !prevState.listOpen
        }))
      }
      clickInside(item){
            this.setState({
                headerTittle : item[Object.keys(item)],
            })
            this.props.selectedItem(Object.keys(item))

      }
    render(){
        const list = this.props.list
            return(                
                <div className="dd-wrapper">
                    <div className="dd-header" onClick={this.toggleList}>
                        <div className="dd-header-title">{this.state.headerTittle}</div>
                    </div>
                    {this.state.listOpen && <ul className="dd-list">
                        {list.map((item,i) => {
                            console.log()
                             return <li className="dd-list-item" key={i} onClick={() => this.clickInside(item)}>{item[Object.keys(item)]}</li>
                        })}
                    </ul>}
                </div>
            )
    }
}
export default dropdown;