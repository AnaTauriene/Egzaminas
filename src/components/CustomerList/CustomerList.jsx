import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './CustomerList.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { withRouter } from 'react-router-dom';




class CustomerList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users:[],
            user:[{
                id: '1',
                Name: 'Ana',
                Surname: 'Taurienė',
                AllergicToNuts: 'Ne',
                AllergicToMilk: 'Ne',
                alcohol: 'oh yes',
                align: "center",
            }, {id: '2',
                Name: 'Dalia',
                Surname: 'Krunglevičiūtė',
                AllergicToNuts: 'Ne',
                AllergicToMilk: 'Ne',
                alcohol: 'oh yes',
                align: "center",
            }, {id: '3',
                Name: 'Marius',
                Surname: 'Pašakinskas',
                AllergicToNuts: 'Ne',
                AllergicToMilk: 'Ne',
                alcohol: 'oh yes',
                align: "center",
            }, {
                id: '4',
                Name: 'Vytautas',
                Surname: 'Gerdžiūnas',
                AllergicToNuts: 'Yes',
                AllergicToMilk: 'Ne',
                alcohol: 'oh yes',
                align: "center",
            }, {id: '5',
                Name: 'Kristina',
                Surname: 'Dubikovienė',
                AllergicToNuts: 'Ne',
                AllergicToMilk: 'YEs',
                alcohol: 'noooo',
                align: "center",
            }, {id: '6',
                Name: 'Aurimas',
                Surname: 'Vasauskas',
                AllergicToNuts: 'Yes',
                AllergicToMilk: 'Yes',
                alcohol: 'noooo',
                align: "center",
            } ],

        }
    } 

    render() {
        const { SearchBar } = Search;
        const idStyle = {width: 300};

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


                return (
            <div className="toolkit">
                <ToolkitProvider
                    keyField="id"
                    data=  { this.state.user }
                    columns= { columns }
                    search
                    >
                    {
                        props => (
                            <div className="tableElem">                      
                            <SearchBar 
                                { ...props.searchProps } 
                                placeholder='Paieška...' 
                            />
                                <br/>
                            <BootstrapTable 
                                { ...props.baseProps }
                                filter={ filterFactory()}
                                selectRow={ selectRow }    
                            />                                            
                            </div>
                        )
                    }
                </ToolkitProvider>
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

    fetchUsers= async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8086/clients",
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
            users: json
        });  
        return json;     
    }
}

export default withRouter(CustomerList);