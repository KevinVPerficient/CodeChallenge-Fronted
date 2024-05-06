import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { 
    faCircleInfo,
    faPerson,
    faPenToSquare,
    faTrash,
    faCirclePlus,
    faLocationDot,
    faMapPin,
    faPhone,
    faEnvelope,
    faUser,
    faBuilding,
    faIdBadge,
    faArrowRight,
    faDollarSign,
    faFloppyDisk } from '@fortawesome/free-solid-svg-icons'; 
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { show_alert } from './alerts';
import Swal from 'sweetalert2'


//TODO: Probar metodo POST 

export const Clients = () => {
    const url = 'https://localhost:7277/api/Clients'
    const [clients, setClients] = useState([]);
    const [operation, setOperation] = useState(0);
    const [cityFilter, setCityFilter] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState('Nuevo cliente');
    const [hidden, setHidden] = useState(false);

    //Client params
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cellPhoneNumber, setCellPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [clientType, setClientType] = useState(0);
    const [companyName, setCompanyName] = useState('');
    const [docType, setDocType] = useState(0);
    const [docNumber, setDocNumber] = useState('');

    //Branch params
    const [addressBranch, setAddressBranch] = useState('');
    const [cityBranch, setCityBranch] = useState('');
    const [countryBranch, setCountryBranch] = useState('');
    const [phoneNumberBranch, setPhoneNumberBranch] = useState('');
    const [cellPhoneNumberBranch, setCellPhoneNumberBranch] = useState('');
    const [emailBranch, setEmailBranch] = useState('');
    const [codeBranch, setCodeBranch] = useState('');
    const [nameBranch, setNameBranch] = useState('');
    const [sellerCodeBranch, setSellerCodeBranch] = useState('');
    const [creditBranch, setCreditBranch] = useState(0);

    useEffect(() => {
        getClients();
    }, [])

    const getClients = async () => {
        const response = await axios.get(url);
        setClients(response.data);
    }

    const clearStates = () => {
        setFullName('');
        setAddress('');
        setCity('');
        setCountry('');
        setPhoneNumber('');
        setCellPhoneNumber('');
        setEmail('');
        setClientType(0);
        setCompanyName('');
        setDocType(0);
        setDocNumber('');
        setAddressBranch('');
        setCityBranch('');
        setCountryBranch('');
        setPhoneNumberBranch('');
        setCellPhoneNumberBranch('');
        setEmailBranch('');
        setCodeBranch('');
        setNameBranch('');
        setSellerCodeBranch('');
        setCreditBranch(0);
    }

    const validate = () => {
        var params;
        var method;
        //Client Validations
        if(fullName.trim() === ''){
            show_alert('Nombre completo del cliente obligatorio', 'warning'); 
            return;
        }
        if(address.trim() === '' || city.trim() === '' || country.trim() === ''){
            show_alert('Datos de ubicación del cliente obligatorios', 'warning');
            return;
        }
        if(companyName.trim() === ''){
            show_alert('Nombre empresa obligatorio', 'warning');
            return;
        }
        if(docNumber.trim() === ''){
            show_alert('Número de identificación obligatorio', 'warning');
            return;
        }
        //Branch validations
        if(nameBranch.trim() === ''){
            show_alert('Nombre de la sucursal obligatorio', 'warning');
            return;
        }
        if(codeBranch.trim() === ''){
            show_alert('Código de la sucursal obligatorio', 'warning'); 
            return;
        }
        if(codeBranch.length > 5){
            show_alert('Código de la sucursal no debe ser mayor a 5 dígitos', 'warning');
            return;
        }
        if(addressBranch.trim() === '' || cityBranch.trim() === '' || countryBranch.trim() === ''){
            show_alert('Datos de ubicación de la sucursal obligatorios', 'warning');
            return;
        }
        if(sellerCodeBranch.trim() === ''){
            show_alert('Código del vendedor obligatorio', 'warning');
            return;
        } 
        if(creditBranch < 1){
            show_alert('Credito de la sucursal inválido', 'warning'); 
            return;
        }

        params = {
            address: address,
            city: city,
            country: country,
            phoneNumber: phoneNumber,
            cellPhoneNumber: cellPhoneNumber,
            email: email,
            clientType: clientType,
            fullName: fullName,
            companyName: companyName,
            docType: docType,
            docNumber: docNumber,
            branches: [
                {
                    docNumber: '',
                    address: addressBranch,
                    city: cityBranch,
                    country: countryBranch,
                    phoneNumber: phoneNumberBranch,
                    cellPhoneNumber: cellPhoneNumberBranch,
                    email: emailBranch,
                    code: codeBranch,
                    name: nameBranch,
                    sellerCode: sellerCodeBranch,
                    credit: creditBranch
                }
            ]
        }        
        createRequest('POST', params);
    }

    const createRequest = async (method, params, otherParams = {}) => {
        await axios(
            {
                method:method,
                url:url,
                headers:{
                    'Content-Type': 'application/json',
                },
                data:params,
                params:otherParams})
            .then(function(response){
                var type = response.status;
                show_alert('¡Tarea completada!',type);
                if(type >= 200 && type <= 299){
                    document.getElementById('btn-close').click();
                    getClients();
                    clearStates();
                }
            })
            .catch(function(error){
                show_alert('Error en la solicitud', 'error');
                console.log(error);
            })
    }
    
    const deleteClient = (docNumber) => {
        Swal.fire({
            title: "¿Está seguro de eliminar?",
            text: "Esta acción no se podrá revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, elimínalo"
          }).then(async (result) => {
            if(result.isConfirmed){
                await axios(
                    {
                        method: 'DELETE',
                        url: url,
                        params: {
                            Doc: docNumber
                        }
                    })
                    .then(function(response){
                        var type = response.status;
                        show_alert('¡Tarea completada!',type);
                        getClients();
                    }).catch(function(error){
                        show_alert('Error en la solicitud', 'error');
                        console.log(error);
                    });
                }
            })
            .catch(function(error){
                console.log(error);
            }
        );
    }

    const filter = (city) => {
        if(city.trim() === '') {
            getClients();
            return;
        }
        getClientsByCity(city);
    }

    const getClientsByCity = async (city) => {
        await axios(
            {
                method: 'GET',
                url: url,
                params: {
                    City: city
                }
            })
            .then(function(response){
                setClients(response.data);
            }).catch(function(error){
                show_alert('No se encontraron registros', 'error');
                console.log(error);
            });
        
    }

    const createNewClient = () => {
        setOperation(0);
        setDisabled(false);
        setHidden(false);
        clearStates();
        setTitle('Nuevo cliente')
    }

    const clientDetails = (client) => {
        setDisabled(true);
        setHidden(false);
        setTitle('Detalles de cliente');
        setFullName(client.fullName);
        setAddress(client.address);
        setCity(client.city);
        setCountry(client.country);
        setPhoneNumber(client.phoneNumber);
        setCellPhoneNumber(client.cellPhoneNumber);
        setEmail(client.email);
        setClientType(client.clientType);
        setCompanyName(client.companyName);
        setDocType(client.docType);
        setDocNumber(client.docNumber);
    }

    const clientUpdate = (client) => {
        setDisabled(false);
        setHidden(true);
        setTitle('Actualizar cliente');
        setOperation(1);
        setFullName(client.fullName);
        setAddress(client.address);
        setCity(client.city);
        setCountry(client.country);
        setPhoneNumber(client.phoneNumber);
        setCellPhoneNumber(client.cellPhoneNumber);
        setEmail(client.email);
        setClientType(client.clientType);
        setCompanyName(client.companyName);
        setDocType(client.docType);
        setDocNumber(client.docNumber);
    }

    const validateUpdate = () => {
        var params;
        var method;
        //Client Validations
        if(fullName.trim() === ''){
            show_alert('Nombre completo del cliente obligatorio', 'warning'); 
            return;
        }
        if(address.trim() === '' || city.trim() === '' || country.trim() === ''){
            show_alert('Datos de ubicación del cliente obligatorios', 'warning');
            return;
        }
        if(companyName.trim() === ''){
            show_alert('Nombre empresa obligatorio', 'warning');
            return;
        }
        if(docNumber.trim() === ''){
            show_alert('Número de identificación obligatorio', 'warning');
            return;
        }
        
        params = {
            address: address,
            city: city,
            country: country,
            phoneNumber: phoneNumber,
            cellPhoneNumber: cellPhoneNumber,
            email: email,
            clientType: clientType,
            fullName: fullName,
            companyName: companyName,
            docType: docType,
            docNumber: docNumber,
            branches: []
        };
        method = 'PUT';
        var otherParams = {
            Doc:docNumber
        }

        
        createRequest(method, params, otherParams);
        clearStates();
        document.getElementById('btnClose')
    }

    var button = 
            <button hidden={disabled} className='btn btn-success' data-bs-dismiss='modal' data-bs-toggle='modal' data-bs-target='#modalCreateBranch'>
                Siguiente <FontAwesomeIcon icon={faArrowRight} />
            </button>; 
    
    if(operation === 1){
        button = 
            <button hidden={disabled} className='btn btn-success' onClick={() => validateUpdate()}>
                <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
            </button>
    }
    

    

  return (
    <div className="App">
        <Navbar/>  
        <h1 className='title'>Listado clientes</h1>
        <div className='container-fluid'>
            <div>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <input type='text' id='filterByCity' className='form-control' placeholder='Buscar por ciudad' value={cityFilter} onChange={((e) => setCityFilter(e.target.value))}/>   
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={() => filter(cityFilter)}>Buscar</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>   
                        <button className='btn-min' data-bs-toggle='modal' data-bs-target='#modalCreateClient' onClick={() => createNewClient(0)}>
                            <FontAwesomeIcon icon={faCirclePlus} /> Nuevo cliente
                        </button>
                    </div>
                </div>
            </div> 
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>NOMBRE</th>
                                    <th>EMAIL</th>
                                    <th>DIRECCIÓN</th>
                                    <th>COMPAÑIA</th>
                                    <th>CIUDAD</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    clients.map((client, i) => (
                                        <tr key={client.docNumber}>
                                            <td className='table-row'>{client.fullName}</td>
                                            <td>{client.email}</td>
                                            <td>{client.address}</td>
                                            <td>{client.companyName}</td>
                                            <td>{client.city}</td>
                                            <td>
                                                <button className='btn-min' title='Detalles' onClick={() => clientDetails(client)} data-bs-toggle='modal' data-bs-target='#modalCreateClient'>
                                                    <FontAwesomeIcon icon={faCircleInfo} />
                                                </button>
                                                <button  className='btn-min' title='Editar' onClick={() => clientUpdate(client)} data-bs-toggle='modal' data-bs-target='#modalCreateClient'>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <button  className='btn-min' title='Eliminar' onClick={() => deleteClient(client.docNumber)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody> 
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalCreateClient' className='modal fade' aria-hidden='true' aria-modal="true">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'> {title} </label>
                        <button id='btn-close' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faPerson} />
                            </span>
                            <input disabled={disabled} type='text' id='fullName' className='form-control' placeholder='Nombre completo' value={fullName} onChange={((e) => setFullName(e.target.value))}></input>
                        </div>
                        <div hidden={hidden} className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <select disabled={disabled} id="docType" className="form-select" aria-label="Default select example" onChange={((e) => setDocType(e.target.value))} value={docType}>
                                <option value='0'>Cédula</option>
                                <option value='1'>NIT</option>
                            </select>
                        </div>
                        <div hidden={hidden} className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faIdBadge} />
                            </span>
                            <input disabled={disabled} type='text' id='docNumber' className='form-control' placeholder='Número de documento' value={docNumber} onChange={((e) => setDocNumber(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faMapPin} /> 
                            </span>
                            <input disabled={disabled} type='text' id='address' className='form-control' placeholder='Dirección' value={address} onChange={((e) => setAddress(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            <input disabled={disabled} type='text' id='city' className='form-control' placeholder='Ciudad' value={city} onChange={((e) => setCity(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            <input disabled={disabled} type='text' id='country' className='form-control' placeholder='Pais' value={country} onChange={((e) => setCountry(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <input disabled={disabled} type='text' id='phoneNumber' className='form-control' placeholder='Teléfono fijo' value={phoneNumber} onChange={((e) => setPhoneNumber(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <input disabled={disabled} type='text' id='cellPhoneNumber' className='form-control' placeholder='Número de celular' value={cellPhoneNumber} onChange={((e) => setCellPhoneNumber(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input disabled={disabled} type='text' id='email' className='form-control' placeholder='Correo electrónico' value={email} onChange={((e) => setEmail(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <select disabled={disabled} id="clientType" className="form-select" aria-label="Default select example" onChange={((e) => setClientType(e.target.value))} value={clientType}>
                                <option value='0'>Persona natural</option>
                                <option value='1'>Persona juridica</option>
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faBuilding} />
                            </span>
                            <input disabled={disabled} type='text' id='companyName' className='form-control' placeholder='Nombre de empresa' value={companyName} onChange={((e) => setCompanyName(e.target.value))}></input>
                        </div>
                        <div className='d-grid col-6 mx-auto'>
                                {button}
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        <div id='modalCreateBranch' className='modal fade' aria-hidden='true' aria-modal="true">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>Registra la primer sucursal</label>
                        <button type='button' id='btnCerrar' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faBuilding} /> 
                            </span>
                            <input type='text' id='nameBranch' className='form-control' placeholder='Nombre de sucursal' value={nameBranch} onChange={((e) => setNameBranch(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faBuilding} /> 
                            </span>
                            <input type='text' id='codeBranch' className='form-control' placeholder='Codigo de sucursal' value={codeBranch} onChange={((e) => setCodeBranch(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faMapPin} /> 
                            </span>
                            <input type='text' id='addressBranch' className='form-control' placeholder='Dirección' value={addressBranch} onChange={((e) => setAddressBranch(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            <input type='text' id='cityBranch' className='form-control' placeholder='Ciudad' value={cityBranch} onChange={((e) => setCityBranch(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            <input type='text' id='countryBranch' className='form-control' placeholder='Pais' value={countryBranch} onChange={((e) => setCountryBranch(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <input type='text' id='phoneNumberBranch' className='form-control' placeholder='Teléfono fijo' value={phoneNumberBranch} onChange={((e) => setPhoneNumberBranch(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <input type='text' id='cellPhoneNumberBranch' className='form-control' placeholder='Número de celular' value={cellPhoneNumberBranch} onChange={((e) => setCellPhoneNumberBranch(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input type='text' id='emailBranch' className='form-control' placeholder='Correo electrónico' value={emailBranch} onChange={((e) => setEmailBranch(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faPerson} />
                            </span>
                            <input type='text' id='sellerCodeBranch' className='form-control' placeholder='Código del vendedor' value={sellerCodeBranch} onChange={((e) => setSellerCodeBranch(e.target.value))}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={faDollarSign} />
                            </span>
                            <input type='text' id='creditBranch' className='form-control' placeholder='Credito para la sucursal' value={creditBranch} onChange={((e) => setCreditBranch(e.target.value))}></input>
                        </div>
                        <div className='d-grid col-6 mx-auto'>
                                <button className='btn btn-success' onClick={() => validate()}>
                                    <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
                                </button>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Clients;