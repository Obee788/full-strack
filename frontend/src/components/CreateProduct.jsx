import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function CreateProduct() {

    const navigate = useNavigate();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [image, setImage] = useState();
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [validationError, setValidationError] = useState({});

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    }

    const createProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('image', image);
        formData.append('date', date);
        formData.append('address', address);
        formData.append('gender', gender);

        await axios.post(`http://localhost:8000/api/products`, formData).then(({data}) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/");
        }).catch(({response}) => {
            if (response.status === 422) {
                setValidationError(response.data.errors);
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

  return (
    <div className="container bg-success">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">ເພີ່ມຂໍ້ມູນ</h4>
                        <hr />
                        <div className="form-wrapper">
                            {Object.keys(validationError).length > 0 && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="alert alert-danger">
                                            <ul className="mb-0">
                                                {Object.entries(validationError).map(([key, value]) => (
                                                    <li key={key}>{value}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Form onSubmit={createProduct}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Name">
                                            <Form.Label>ຊື່</Form.Label>
                                            <Form.Control type="text" value={fname} onChange={(event) => {
                                                setFname(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>    
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Name">
                                            <Form.Label>ນາມສະກຸນ</Form.Label>
                                            <Form.Control type="text"  value={lname} onChange={(event) => {
                                                setLname(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>      
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Image">
                                            <Form.Label>ຮູບພາບ</Form.Label>
                                            <Form.Control type="file" onChange={changeHandler} />
                                        </Form.Group>
                                    </Col>
                                </Row>   
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Description">
                                            <Form.Label>ວັນເດືອນປີເກີດ</Form.Label>
                                            <Form.Control type="date" value={date} onChange={(event) => {
                                                setDate(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>  
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Description">
                                            <Form.Label>ທີ່ຢູ່</Form.Label>
                                            <Form.Control type="text" value={address} onChange={(event) => {
                                                setAddress(event.target.value)
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>    
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Description" className='mb-4 '>
                                            <Form.Label>ເພດ:</Form.Label> <br/>
                                            <input type="radio" name="gender" value="ຊາຍ" onChange={(event) => {
                                                setGender(event.target.value)
                                            }} />ຊາຍ
                                            <input type="radio" name="gender" value="ຍີງ" onChange={(event) => {
                                                setGender(event.target.value)
                                            }} />ຍີງ
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="success" className="mt-2" size="lg" block="block" type="submit">
                                    ບັນທືກ
                                </Button>  
                                <Link to={"/"} className='btn btn-danger mb-2 float-end' size="lg" >
                                    ກັບຄືນ
                                </Link>       
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateProduct