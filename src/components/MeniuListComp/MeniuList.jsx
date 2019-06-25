import React, { Component } from 'react'
import './MeniuList.css';

class MeniuList extends Component {
    componentDidUpdate() {
        this.props.inputElement.current.focus()
      }
      render() {
        return (
          <div className="todoListMain">
            <div className="header">
              <form onSubmit={this.props.addItem}>
                <input
                  placeholder="Task"
                  ref={this.props.inputElement}
                  value={this.props.currentItem.text}
                  onChange={this.props.handleInput}
                />
                <button type="submit"> Pridėti patiekalą </button>
              </form>
            </div>
          </div>
        )
    }
    
    handleInput = e => {
        const itemText = e.target.value
        const currentItem = { text: itemText, key: Date.now() }
        this.setState({
          currentItem,
        })
    }
    
    addItem = e => {
        e.preventDefault()
        const newItem = this.state.currentItem
        if (newItem.text !== '') {
          console.log(newItem)
          const items = [...this.state.items, newItem]
          this.setState({
            items: items,
            currentItem: { text: '', key: '' },
          })
        }
      }
    
    createTasks = item => {
        return (
          <li key={item.key} onClick={() => this.props.deleteItem(item.key)}>
            {item.text}
          </li>
        )
      }
}



export default MeniuList