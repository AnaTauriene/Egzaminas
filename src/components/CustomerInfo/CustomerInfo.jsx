import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './CustomerInfo.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { withRouter } from 'react-router-dom';




class CustomerInfo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            dishes:[{
                frequency: "2",
                food: "višta"
            }, {
                frequency: "10",
                food: "kebabas"
            }, {
                frequency: "20",
                food: "cezario salotos"
            }, {
                frequency: "18",
                food: "sušiai"
            }, {
                frequency: "30",
                food: "pica"
            }],
            user:[{
                id: '1',
                Name: 'Ana',
                Surname: 'Taurienė',
                AllergicToNuts: 'Ne',
                AllergicToMilk: 'Ne',
                alcohol: 'oh yes',
                align: "center",
            }]
        }
    } 

    render() {
        const { SearchBar } = Search;
        const idStyle = {width: 300};
        const idStyle2 = {width: 600};

        const pageButtonRenderer = ({
            page,
            active,
            disable,
            title,
            onPageChange
            }) => {
            const handleClick = (e) => {
                e.preventDefault();
                onPageChange(page);
            };
            return (
                <li className="page-item">
                  <a href="#" style={{color: "#2e2e2e"}} onClick={ handleClick }>{ page }</a>
                </li>
            );
        };

        const options = {
            pageButtonRenderer
        };

        const selectRow = 
        {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.changeSelectStatus,
        };          
        
        const selectRow2 = 
        {
            clickToSelect: true,
        };         
     
        const columns = [
        {
            dataField: 'id',
            text: 'Nr.',
            sort: true,
            align: "center",
        }, {
            dataField: 'Name',
            text: 'Vardas',
            sort: true,
            align: "center",
            headerStyle: idStyle,
        }, {
            dataField: 'Surname',
            text: 'Pavardė',
            sort: true,
            align: "center",
            headerStyle: idStyle,
        }, {
            dataField: 'alcohol',
            text: 'Vartoja alkoholį',
            sort: true,
            align: "center",
            headerStyle: idStyle,
        }, {
            dataField: 'AllergicToNuts',
            text: 'Alergiškas riešutams',
            sort: true,
            align: "center",
            headerStyle: idStyle,
        }, {
            dataField: 'AllergicToMilk',
            text: 'Alergiškas pieno produktams',
            sort: true,
            align: "center",
            headerStyle: idStyle,
        }]; 

        const columnsFood = [
            { 
                dataField: 'frequency',
                text: 'Dažns',
                sort: true,
                align: "center",
                headerStyle: idStyle2,
                
            }, {
                dataField: 'food',
                text: 'Patiekalas',
                sort: true,
                align: "center", 
                headerStyle: idStyle2,              
            }]

        return (
            <div className="toolkit">
                <div>
                <ToolkitProvider
                    keyField="id"
                    data=  { this.state.user }
                    columns= { columns }
                    search
                    >                  
                    {
                        props => (
                            <div className="tableElem">                      
                            <BootstrapTable 
                                { ...props.baseProps }
                                filter={ filterFactory()}  
                            />                                            
                            </div>
                        )
                    }
                </ToolkitProvider>
                </div>
                <br/>
                <div className="toolkit2">
                    <ToolkitProvider
                        keyField="frequency"
                        data=  { this.state.dishes }
                        columns= { columnsFood }
                        search
                        >                  
                        {
                            props => (
                                <div className="tableElem">                      
                                <BootstrapTable 
                                    { ...props.baseProps }
                                    filter={ filterFactory()}
                                    selectRow={ selectRow2 }    
                                />                                            
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div> 
            </div>                       
        );
    }

    nextPath = (path)=>{
        this.props.history.push(path);
    }

    changeSelectStatus = (row, isSelected, e)=>{
        if(isSelected){
            window.setTimeout(
                function() {
                    this.setState({
                    selectedDocuments: row
                });
                    }.bind(this),
                0
            );        
        }
    }

    fetchUser = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8086/clients/id",
        {
          method: "GET",
          headers: { 
            "token": token,
            "content-type": "application/json"
          },
        })
        if (res.status > 300) {
            alert("Fail")
        }
        const json = await res.json();      
        this.setState({ 
            user: json
        });  
        return json;     
    }

    fetchDishes = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8086/orders/id",
        {
          method: "GET",
          headers: { 
            "token": token,
            "content-type": "application/json"
          },
        })
        if (res.status > 300) {
            alert("Fail")
        }
        const json = await res.json();      
        this.setState({ 
            dishes: json
        });  
        return json;     
    }
}

export default withRouter(CustomerInfo);