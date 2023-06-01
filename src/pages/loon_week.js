import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap'
import "../CSS/loon_week.css"
import { Col } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function Loon_week() {

    const navigate = useNavigate();
    const lat_search = useRef(null);
    const lon_search = useRef(null);

    const [data, setData] = useState({})
    const [data_location, setData_location] = useState({})
    const [locationName, setLocationName] = useState('');
    const [showDiv, setShowDiv] = useState(false);
    const [showDiv1, setShowDiv1] = useState(false);
    const [hidebt, sethidebt] = useState(true);


    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')


    //Goto weekpage
    function handleClickBack() {
        navigate('/Colombo');

    }


    //API Key
    let key = 'a2d4fe79c26d0dfbd1a9683f60080247'
    let key1 = '1c170ee5952d24dd9d55cd8bf49a4e81'
    let dt = new Date((data.daily && (data.daily[0].dt) * 1000)); //timestamp * 1000 in java script
    let dt1 = new Date((data.daily && (data.daily[1].dt) * 1000));
    let dt2 = new Date((data.daily && (data.daily[2].dt) * 1000));
    let dt3 = new Date((data.daily && (data.daily[3].dt) * 1000));
    let dt4 = new Date((data.daily && (data.daily[4].dt) * 1000));
    let dt5 = new Date((data.daily && (data.daily[5].dt) * 1000));
    let dt6 = new Date((data.daily && (data.daily[6].dt) * 1000));


    //get inputs
    const handleClick = () => {
        setLat(lat_search.current.value);
        setLon(lon_search.current.value);
        setShowDiv(true);
        sethidebt(true);
    }

    const handleClickView = () => {
        setShowDiv1(true);
        sethidebt(false);
    }



    //API call with inputs
    useEffect(() => {
        if (lat && lon) {
            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=1c170ee5952d24dd9d55cd8bf49a4e81`
            const url_location = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1c170ee5952d24dd9d55cd8bf49a4e81`

            axios.all([axios.get(url), axios.get(url_location)])
                .then(axios.spread((response, response2) => {
                    setData(response.data);
                    setData_location(response2.data);
                    console.log(response.data);
                    console.log(response2.data);

                    // Access specific properties from response2.data
                    if (response2.data && response2.data.name) {
                        console.log(response2.data.name); // Access the name of the location. Just to check
                    }
                    // Extract and set the location name
                    if (response2.data && response2.data.name) {
                        setLocationName(response2.data.name);
                    }
                }))
                .catch(error => {
                    console.log(error);
                });
        }
    }, [lat, lon]);




    return (
        <div>
            <Container>
                <Row className="Row0">
                    <div className="search">
                        <Col>
                            <div class="row align-items-center py-2">
                                <div class="input-group col-sm">
                                    <span class="input-group-text" id="basic-addon1">Lat</span>
                                    <input
                                        ref={lat_search}
                                        type="text"
                                        class="form-control"
                                        inputmode="numeric"
                                        id="latitude"
                                        placeholder="Enter"
                                        aria-label="latitude"
                                        aria-describedby="basic-addon1"

                                    />
                                </div>
                                <div class="input-group col-sm">
                                    <span class="input-group-text" id="basic-addon1">Lon</span>
                                    <input
                                        ref={lon_search}
                                        type="text"
                                        class="form-control"
                                        inputmode="numeric"
                                        id="longitude"
                                        placeholder="Enter"
                                        aria-label="longitude"
                                        aria-describedby="basic-addon1"

                                    />
                                </div>
                            </div>
                        </Col>
                        <div class="row align-items-center py-2">

                            <div class="col-auto me-auto">
                                <Col className="d-flex align-items-center justify-content-center">
                                    <button id="btnGet" type="button" class="btn btn-primary mb-3 Search" onClick={handleClick}>
                                        Search
                                    </button>

                                    <button id="btnGet" type="button" class="btn btn-primary mb-3 back" onClick={handleClickBack}>
                                        Back
                                    </button>
                                </Col>
                            </div>

                        </div>

                    </div>
                </Row>

                <Row className='Row1'>
                    {showDiv && <Col className='day1'>
                        <Card className='card'>

                            <div className="container">
                                <div className="top">
                                    <div className="Date">
                                        <h3>{dt.toDateString()}</h3>
                                        <br></br>
                                    </div>
                                    <div className="location">
                                        {locationName && <h1>{locationName}</h1>}
                                    </div>
                                    <div className="temp">
                                        {data.daily && data.daily[0] && data.daily[0].temp && (
                                            <h1>{Math.round((data.daily[0].temp.day) - 273)}°C</h1>
                                        )}
                                    </div>
                                    <div className="description">
                                        {data.daily && data.daily[0] && data.daily[0].weather && data.daily[0].weather[0] && (
                                            <h2>{data.daily[0].weather[0].description}</h2>)}
                                    </div>
                                </div>


                                <div className="bottom">
                                    <div className="feels">
                                        {data.daily && data.daily[0] && data.daily[0].feels_like && (
                                            <h3>Feels : {Math.round((data.daily[0].feels_like.day) - 273)}°C</h3>)}

                                    </div>
                                    <div className="humidity">
                                        {data.daily ? <p>Humidity : {data.daily[0].humidity}%</p> : null}

                                    </div>
                                    <div className="wind">
                                        {data.daily ? <p><img src="https://cdn-icons-png.flaticon.com/512/54/54298.png" width="20" height="20" alt="Winds weather symbol free icon" title="Winds weather symbol free icon"/>&nbsp; :&nbsp; {data.daily[0].wind_speed} m/s W</p> : null}
                                    </div>
                                </div>

                                <div className="icon">
                                    <h1>
                                        {data.daily && data.daily[0] && data.daily[0].weather && data.daily[0].weather[0] && (
                                            <center><img
                                                src={`https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`}
                                                alt='Weather Icon'
                                            /></center>
                                        )}
                                    </h1>
                                </div>



                            </div>

                        </Card>
                    </Col>}
                    {showDiv && <Col className='day2'>
                        <Card className='card'>

                            <div className="container">
                                <div className="top">
                                    <div className="Date">
                                        <h3>{dt1.toDateString()}</h3>
                                        <br></br>
                                    </div>
                                    <div className="location">
                                        {locationName && <h1>{locationName}</h1>}
                                    </div>
                                    <div className="temp">
                                        {data.daily && data.daily[1] && data.daily[1].temp && (
                                            <h1>{Math.round((data.daily[1].temp.day) - 273)}°C</h1>
                                        )}
                                    </div>
                                    <div className="description">
                                        {data.daily && data.daily[1] && data.daily[1].weather && data.daily[1].weather[0] && (
                                            <h2>{data.daily[1].weather[0].description}</h2>)}
                                    </div>
                                </div>


                                <div className="bottom">
                                    <div className="feels">
                                        {data.daily && data.daily[1] && data.daily[1].feels_like && (
                                            <h3>Feels : {Math.round((data.daily[1].feels_like.day) - 273)}°C</h3>)}

                                    </div>
                                    <div className="humidity">
                                        {data.daily ? <p>Humidity : {data.daily[1].humidity}%</p> : null}

                                    </div>
                                    <div className="wind">
                                        {data.daily ? <p><img src="https://cdn-icons-png.flaticon.com/512/54/54298.png" width="20" height="20" alt="Winds weather symbol free icon" title="Winds weather symbol free icon"/>&nbsp; :&nbsp; {data.daily[1].wind_speed} m/s W</p> : null}
                                    </div>
                                </div>

                                <div className="icon">
                                    <h1>
                                        {data.daily && data.daily[1] && data.daily[1].weather && data.daily[1].weather[0] && (
                                            <center><img
                                                src={`https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`}
                                                alt='Weather Icon'
                                            /></center>
                                        )}
                                    </h1>
                                </div>


                            </div>

                        </Card>
                    </Col>}
                    {showDiv && <Col className='day3'>
                        <Card className='card'>

                            <div className="container">
                                <div className="top">
                                    <div className="Date">
                                        <h3>{dt2.toDateString()}</h3>
                                        <br></br>
                                    </div>
                                    <div className="location">
                                        {locationName && <h1>{locationName}</h1>}
                                    </div>
                                    <div className="temp">
                                        {data.daily && data.daily[2] && data.daily[2].temp && (
                                            <h1>{Math.round((data.daily[2].temp.day) - 273)}°C</h1>
                                        )}
                                    </div>
                                    <div className="description">
                                        {data.daily && data.daily[2] && data.daily[2].weather && data.daily[2].weather[0] && (
                                            <h2>{data.daily[2].weather[0].description}</h2>)}
                                    </div>
                                </div>


                                <div className="bottom">
                                    <div className="feels">
                                        {data.daily && data.daily[2] && data.daily[2].feels_like && (
                                            <h3>Feels : {Math.round((data.daily[2].feels_like.day) - 273)}°C</h3>)}

                                    </div>
                                    <div className="humidity">
                                        {data.daily ? <p>Humidity : {data.daily[2].humidity}%</p> : null}

                                    </div>
                                    <div className="wind">
                                        {data.daily ? <p><img src="https://cdn-icons-png.flaticon.com/512/54/54298.png" width="20" height="20" alt="Winds weather symbol free icon" title="Winds weather symbol free icon"/>&nbsp; :&nbsp; {data.daily[2].wind_speed} m/s W</p> : null}
                                    </div>
                                </div>

                                <div className="icon">
                                    <h1>
                                        {data.daily && data.daily[2] && data.daily[2].weather && data.daily[2].weather[0] && (
                                            <center><img
                                                src={`https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`}
                                                alt='Weather Icon'
                                            /></center>
                                        )}
                                    </h1>
                                </div>


                            </div>
                        </Card>
                        {hidebt && <div className='view_more'>
                            <button id="btnGet" type="button" class="btn btn-primary mb-3 back" onClick={handleClickView}>
                                View more
                            </button>
                        </div>}
                    </Col>}



                    {showDiv1 && <Col className='day4'>
                        <Card className='card'>

                            <div className="container">
                                <div className="top">
                                    <div className="Date">
                                        <h3>{dt3.toDateString()}</h3>
                                        <br></br>
                                    </div>
                                    <div className="location">
                                        {locationName && <h1>{locationName}</h1>}
                                    </div>
                                    <div className="temp">
                                        {data.daily && data.daily[3] && data.daily[3].temp && (
                                            <h1>{Math.round((data.daily[3].temp.day) - 273)}°C</h1>
                                        )}
                                    </div>
                                    <div className="description">
                                        {data.daily && data.daily[3] && data.daily[3].weather && data.daily[3].weather[0] && (
                                            <h2>{data.daily[3].weather[0].description}</h2>)}
                                    </div>
                                </div>


                                <div className="bottom">
                                    <div className="feels">
                                        {data.daily && data.daily[3] && data.daily[3].feels_like && (
                                            <h3>Feels : {Math.round((data.daily[3].feels_like.day) - 273)}°C</h3>)}

                                    </div>
                                    <div className="humidity">
                                        {data.daily ? <p>Humidity : {data.daily[3].humidity}%</p> : null}

                                    </div>
                                    <div className="wind">
                                        {data.daily ? <p><img src="https://cdn-icons-png.flaticon.com/512/54/54298.png" width="20" height="20" alt="Winds weather symbol free icon" title="Winds weather symbol free icon"/>&nbsp; :&nbsp; {data.daily[3].wind_speed} m/s W</p> : null}
                                    </div>
                                </div>

                                <div className="icon">
                                    <h1>
                                        {data.daily && data.daily[3] && data.daily[3].weather && data.daily[3].weather[0] && (
                                            <center><img
                                                src={`https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`}
                                                alt='Weather Icon'
                                            /></center>
                                        )}
                                    </h1>
                                </div>


                            </div>
                        </Card>
                    </Col>}
                </Row>
                {showDiv1 && <Row className='Row2'>
                    <Col className='day5'>
                        <Card className='card'>

                            <div className="container">
                                <div className="top">
                                    <div className="Date">
                                        <h3>{dt4.toDateString()}</h3>
                                        <br></br>
                                    </div>
                                    <div className="location">
                                        {locationName && <h1>{locationName}</h1>}
                                    </div>
                                    <div className="temp">
                                        {data.daily && data.daily[4] && data.daily[4].temp && (
                                            <h1>{Math.round((data.daily[4].temp.day) - 273)}°C</h1>
                                        )}
                                    </div>
                                    <div className="description">
                                        {data.daily && data.daily[4] && data.daily[4].weather && data.daily[4].weather[0] && (
                                            <h2>{data.daily[4].weather[0].description}</h2>)}
                                    </div>
                                </div>


                                <div className="bottom">
                                    <div className="feels">
                                        {data.daily && data.daily[4] && data.daily[4].feels_like && (
                                            <h3>Feels : {Math.round((data.daily[4].feels_like.day) - 273)}°C</h3>)}

                                    </div>
                                    <div className="humidity">
                                        {data.daily ? <p>Humidity : {data.daily[4].humidity}%</p> : null}

                                    </div>
                                    <div className="wind">
                                        {data.daily ? <p><img src="https://cdn-icons-png.flaticon.com/512/54/54298.png" width="20" height="20" alt="Winds weather symbol free icon" title="Winds weather symbol free icon"/>&nbsp; :&nbsp; {data.daily[4].wind_speed} m/s W</p> : null}
                                    </div>
                                </div>

                                <div className="icon">
                                    <h1>
                                        {data.daily && data.daily[4] && data.daily[4].weather && data.daily[4].weather[0] && (
                                            <center><img
                                                src={`https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`}
                                                alt='Weather Icon'
                                            /></center>
                                        )}
                                    </h1>
                                </div>  


                            </div>
                        </Card>
                    </Col>
                    <Col className='day6'>
                        <Card className='card'>

                            <div className="container">
                                <div className="top">
                                    <div className="Date">
                                        <h3>{dt5.toDateString()}</h3>
                                        <br></br>
                                    </div>
                                    <div className="location">
                                        {locationName && <h1>{locationName}</h1>}
                                    </div>
                                    <div className="temp">
                                        {data.daily && data.daily[5] && data.daily[5].temp && (
                                            <h1>{Math.round((data.daily[5].temp.day) - 273)}°C</h1>
                                        )}
                                    </div>
                                    <div className="description">
                                        {data.daily && data.daily[5] && data.daily[5].weather && data.daily[5].weather[0] && (
                                            <h2>{data.daily[5].weather[0].description}</h2>)}
                                    </div>
                                </div>


                                <div className="bottom">
                                    <div className="feels">
                                        {data.daily && data.daily[5] && data.daily[5].feels_like && (
                                            <h3>Feels : {Math.round((data.daily[5].feels_like.day) - 273)}°C</h3>)}

                                    </div>
                                    <div className="humidity">
                                        {data.daily ? <p>Humidity : {data.daily[5].humidity}%</p> : null}

                                    </div>
                                    <div className="wind">
                                        {data.daily ? <p><img src="https://cdn-icons-png.flaticon.com/512/54/54298.png" width="20" height="20" alt="Winds weather symbol free icon" title="Winds weather symbol free icon"/>&nbsp; :&nbsp; {data.daily[5].wind_speed} m/s W</p> : null}
                                    </div>
                                </div>

                                <div className="icon">
                                    <h1>
                                        {data.daily && data.daily[5] && data.daily[5].weather && data.daily[5].weather[0] && (
                                            <center><img
                                                src={`https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`}
                                                alt='Weather Icon'
                                            /></center>
                                        )}
                                    </h1>
                                </div>


                            </div>
                        </Card>
                    </Col>
                    <Col className='day7'>
                        <Card className='card'>

                            <div className="container">
                                <div className="top">
                                    <div className="Date">
                                        <h3>{dt6.toDateString()}</h3>
                                        <br></br>
                                    </div>
                                    <div className="location">
                                        {locationName && <h1>{locationName}</h1>}
                                    </div>
                                    <div className="temp">
                                        {data.daily && data.daily[6] && data.daily[5].temp && (
                                            <h1>{Math.round((data.daily[6].temp.day) - 273)}°C</h1>
                                        )}
                                    </div>
                                    <div className="description">
                                        {data.daily && data.daily[5] && data.daily[5].weather && data.daily[6].weather[0] && (
                                            <h2>{data.daily[6].weather[0].description}</h2>)}
                                    </div>
                                </div>


                                <div className="bottom">
                                    <div className="feels">
                                        {data.daily && data.daily[6] && data.daily[6].feels_like && (
                                            <h3>Feels : {Math.round((data.daily[6].feels_like.day) - 273)}°C</h3>)}

                                    </div>
                                    <div className="humidity">
                                        {data.daily ? <p>Humidity : {data.daily[6].humidity}%</p> : null}

                                    </div>
                                    <div className="wind">
                                        {data.daily ? <p><img src="https://cdn-icons-png.flaticon.com/512/54/54298.png" width="20" height="20" alt="Winds weather symbol free icon" title="Winds weather symbol free icon"/>&nbsp; :&nbsp; {data.daily[6].wind_speed} m/s W</p> : null}
                                    </div>
                                </div>

                                <div className="icon">
                                    <h1>
                                        {data.daily && data.daily[6] && data.daily[6].weather && data.daily[6].weather[0] && (
                                            <center><img
                                                src={`https://openweathermap.org/img/wn/${data.daily[6].weather[0].icon}@2x.png`}
                                                alt='Weather Icon'
                                            /></center>
                                        )}
                                    </h1>
                                </div>


                            </div>
                        </Card>
                    </Col>
                    <Col>
                    </Col>
                </Row>}


            </Container>
        </div >
    )
}
