import React from 'react'
import "../css/style.css"
import {useState} from "react";
import { Container, Row, Col, Form, FormGroup, Input, Button, Label,Table } from "reactstrap"
import * as AiIcons from "react-icons/ai"
import axios from 'axios';
import SideBar from './common/SideBar';
import * as BiIcons from "react-icons/bi";
import NavigationBar from './common/NavigationBar';

function Amenities() {

    const [state, setState] = React.useState({
        amenitiesName: ''
    })

    const handleChange = (e) => {
        setState(prevState => ({
            [e.target.name]: e.target.value
        }))
    }

    const handleSave = async (e)=>{
        e.preventDefault();
        let data = {
            amenitiesName: state.amenitiesName
      }
        let res = await axios.post(`http://localhost:8078/amenities/add`,data);
        console.log(res)
        fetchData();
      }

      const handleReset = async (e)=>{
        setState(prevState=>({
            ...prevState,
            role_name: ''
        }))
        fetchData();
      }
      
      const handleDelete = async (id)=>{
        
        let res = await axios.delete(`http://localhost:8078/amenities/delete/${id}`);
        console.log(res)
        fetchData();
      }

      const handleEdit = async (id)=>{
        let res = await axios.get(`http://localhost:8078/amenities/get/${id}`);
        console.log(res)
        // state.role_name = res.data.role_name;
        // handleChange.bind(state);
      }

    const fetchData = async () => {
        let res = await axios.get(`http://localhost:8078/amenities/get`);
        setData(res.data)
        console.log(res)
    }
    const [Data, setData] = useState([])
    React.useEffect(() => {
        fetchData();
    }, [])
  
    return (
        <React.Fragment>
            <SideBar/>
            <NavigationBar/>
            <main className='section-main'>
                <Container>
                    <Row className='input-panel'>
                        <h2 className='mb-4'><b>Amenties Details</b></h2> 
                        <hr/>
                        <Form>
                            <FormGroup>
                                <Col className='label-margin'><Label>Amenities Name</Label></Col> 
                                <Col><Input type="text" name="amenitiesName" value={state.amenitiesName} id="amenitiesName" onChange={handleChange} placeholder="Enter Amenities Name"/></Col>
                            </FormGroup>
                            <Button onClick={handleSave} className="button-save">Save</Button>
                            <Button onClick={handleReset} className="button-reset">Reset</Button>
                        </Form>
                    </Row>
                    <Row  className='input-panel'>
                    <Table className='table-data'>
                        <thead>
                            <tr>
                                <th>
                                    Amenities Name
                                </th>
                                <th>
                                  Edit
                                </th>
                                <th>
                                   Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                               Data.map(
                                   (item,index)=>(
                                    <tr key={index}>
                                    <td>{item.amenitiesName}</td>
                                    <td align='center'>
                                        <Button onClick={()=>handleEdit(item.amenitiesId)} className='button-edit'>
                                                <BiIcons.BiEdit size={20} style={{color:"white"}}/>
                                        </Button>
                                    </td>
                                    <td align='center'>
                                        <Button onClick={()=>handleDelete(item.amenitiesId)} className='button-delete'>
                                            <AiIcons.AiFillDelete size={20} style={{color:"white",margin:"5%"}}/>
                                        </Button>
                                    </td>
                                    </tr>
                                   )
                               )
                           }
                        </tbody>
                    </Table>
                    </Row>
                </Container>
            </main>
        </React.Fragment>
    )
}
export default Amenities