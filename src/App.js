import React, {Component} from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import Header from './Components/Header';
import Books from './Components/Books';
import SearchInput from './Components/SearchInput';
import './App.css';

class App extends Component {
    // Set state
    constructor(props){
        super(props)
        this.state = {
            books: [],
            text: 'Harry Potter'
        }
    }
    // Call the books function in lifecycle method
    componentWillMount(){
        this.getBooks();
    }
    // Get the books
    getBooks(){
        axios.request({
            method: 'get',
            url: 'https://www.googleapis.com/books/v1/volumes?q=' + this.state.text // Pull data from books API and concat text state
        }).then((response) => {
            this.setState({books: response.data.items}, () => {
                console.log(this.state);
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    handleChange(text){
        this.setState({text: text}, this.getBooks());
    }
    render() {
        return (
            <div className="App">
                <Header/>
                <Grid>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <SearchInput onChange={this.handleChange.bind(this)} value={this.state.text} />
                            <Books books={this.state.books} />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
