import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap'
import "../CSS/Colombo.css"
import { Col } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function Colombo() {

    const navigate = useNavigate();

    const lat_search = useRef(null);
    const lon_search = useRef(null);

    const [data, setData] = useState({})
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')

    //API Key
    let key = '1c170ee5952d24dd9d55cd8bf49a4e81'


    //API call with inputs
    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=6.9271&lon=79.8612&appid=${key}`
        axios.get(url).then((response) => {
            setData(response.data);
            console.log(response.data);
        });
    }, []);


    //Goto weekpage
    function handleButton() {
        navigate('/week');
    
      }


    return (
        <div>
            <Container>

                <Row className='Row'>
                    <Col></Col>
                    <div className='colombo'>
                        <Row>
                            <Col className='d-flex align-items-center justify-content-center col_main'>
                                <div className="top">
                                    <div className="location">
                                        <h1>{data.name}</h1>
                                    </div>
                                    <div className="temp">
                                        {data.main ? <h1>{Math.round((data.main.temp) - 273)}°C</h1> : null}
                                    </div>
                                    <div className="description">
                                        {data.main ? <h2>{data.weather[0].description}</h2> : null}
                                    </div>




                                    <div className="feels">
                                        {data.main ? <p>Feels Like : {Math.round((data.main.feels_like) - 273.15)}°C</p> : null}
                                    </div>
                                    <div className="humidity">
                                        {data.main ? <p>Humidity : {data.main.humidity}</p> : null}

                                    </div>
                                    <div className="wind">
                                        {data.main ? <p>Wind Speed : {data.wind.speed}</p> : null}
                                    </div>
                                </div>


                            </Col>
                            <Col className="d-flex align-items-center justify-content-center col_icon2">
                                <div className="icon">
                                    <h1>
                                        {data.weather ? (
                                            <img
                                                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                                                alt='Weather Icon'
                                            />
                                        ) : null}
                                    </h1>
                                </div>
                            </Col>
                            <Row>
                                <Col>
                                    <Button variant="primary" type="submit" className='sign_btn' onClick={handleButton}>
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    </div>
                    <Col></Col>
                </Row>


            </Container>
        </div >
    )
}
