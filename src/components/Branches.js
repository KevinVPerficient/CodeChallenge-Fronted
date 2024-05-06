import React, { useState, useEffect } from 'react'
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


export const Branches = () => {

    const url = 'https://localhost:7277/api/Branches'
    const [filterById, setFilterById] = useState('');
    const [branches, setBranches] = useState([]);
    const [operation, setOperation] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [docDisabled, setDocDisabled] = useState(false);
    const [title, setTitle] = useState('Nueva sucursal');
    const [hidden, setHidden] = useState(false);

    const [docNumber, setDocNumber] = useState('');
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
        getBranches();
    }, []);

  


    const getBranches = async () => {
        const response = await axios.get(url);
        setBranches(response.data);
    }

    const clearStates = () => {
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

    const filter = (docNumber) => {
        if(docNumber.trim() === '') {
            getBranches();
            return;
        }
        getBranchesByClientDoc(docNumber);
    } 

    const getBranchesByClientDoc = async (docNumber) => {
        await axios(
            {
                method: 'GET',
                url: url,
                params: {
                ClientDoc: docNumber
                }
            })
            .then(function(response){
                setBranches(response.data);
            }).catch(function(error){
                show_alert('No se encontraron registros', 'error');
                console.log(error);
            });
        
    }

    const createRequest = async (method, data = {}, params = {}) => {
        await axios(
            {
                method:method,
                url:url,
                headers:{
                    'Content-Type': 'application/json',
                },
                data:data,
                params:params})
            .then(function(response){
                var type = response.status;
                show_alert('¡Tarea completada!',type);
                document.getElementById('btn-close').click();
                if(type >= 200 && type <= 299){
                    getBranches();
                    clearStates();
                }
            })
            .catch(function(error){
                show_alert('Error en la solicitud', 'error');
                console.log(error);
            })
    }

    const deleteBranch = (branch) => {
        
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
                var params= {
                                Code: branch.code,
                                ClientDoc: branch.docNumber
                            }
                createRequest('DELETE',{},params);
            }
        })
        .catch(function(error){
            console.log(error);
        }
        );
    }

    const createNewBranch = () => {
        setOperation(0);
        setDisabled(false);
        setDocDisabled(false);
        setHidden(false);
        clearStates();
        setTitle('Nueva sucursal');
    }

    const branchDetails = (branch) => {
        setDisabled(true);
        setDocDisabled(true);
        setHidden(false);
        clearStates();
        setTitle('Detalles de la sucursal');
        setDocNumber(branch.docNumber);
        setAddressBranch(branch.address);
        setCityBranch(branch.city);
        setCountryBranch(branch.country);
        setPhoneNumberBranch(branch.phoneNumber);
        setCellPhoneNumberBranch(branch.cellPhoneNumber);
        setEmailBranch(branch.email);
        setCodeBranch(branch.code);
        setNameBranch(branch.name);
        setSellerCodeBranch(branch.sellerCode);
        setCreditBranch(branch.credit);
    }

    const branchUpdate = (branch) => {
        setDisabled(false);
        setDocDisabled(true);
        setHidden(true);
        clearStates();
        setTitle('Actualizar sucursal');
        setOperation(1);
        setDocNumber(branch.docNumber);
        setAddressBranch(branch.address);
        setCityBranch(branch.city);
        setCountryBranch(branch.country);
        setPhoneNumberBranch(branch.phoneNumber);
        setCellPhoneNumberBranch(branch.cellPhoneNumber);
        setEmailBranch(branch.email);
        setCodeBranch(branch.code);
        setNameBranch(branch.name);
        setSellerCodeBranch(branch.sellerCode);
        setCreditBranch(branch.credit);
    }

    const sellerCodeUpdate = (branch) => {
        
        setDisabled(false);
        setDocDisabled(false);
        setHidden(false);
        clearStates();
        setTitle('Actualizar código de vendedor');
        setOperation(2);
        setSellerCodeBranch(branch.sellerCode);
        setDocNumber(branch.docNumber);
        setCodeBranch(branch.code);
    }

    const validate = () => {
        if (operation === 0){
            if(docNumber.trim() === ''){
                show_alert('Documento del cliente obligatorio', 'warning');
                return;
            }
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

            var data = {
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
            };
            var params = {
                Doc: docNumber,
            }
            createRequest('POST',data,params);
        }else if (operation === 1){
            if(nameBranch.trim() === ''){
                show_alert('Nombre de la sucursal obligatorio', 'warning');
                return;
            }
            if(addressBranch.trim() === '' || cityBranch.trim() === '' || countryBranch.trim() === ''){
                show_alert('Datos de ubicación de la sucursal obligatorios', 'warning');
                return;
            }
            if(creditBranch < 1){
                show_alert('Credito de la sucursal inválido', 'warning'); 
                return;
            }
            var data = {
                docNumber: '',
                address: addressBranch,
                city: cityBranch,
                country: countryBranch,
                phoneNumber: phoneNumberBranch,
                cellPhoneNumber: cellPhoneNumberBranch,
                email: emailBranch,
                code: codeBranch,
                name: nameBranch,
                sellerCode: '',
                credit: creditBranch                
            };
            var params = {
                ClientDoc: docNumber,
                Code: codeBranch
            }
            createRequest('PUT',data,params);
        }else{
            if(sellerCodeBranch.trim() === ''){
                show_alert('Código de la sucursal obligatorio', 'warning'); 
                return;
            }
            var data = {
                sellerCode: sellerCodeBranch          
            };
            console.log(docNumber);
            console.log(codeBranch);
            var params = {
                clientDoc: docNumber,
                code: codeBranch
            }
            createRequest('PATCH',data,params);
        }
    }

    return (
        <div className="App">
        <Navbar/>
        <h1 className='title'>Listado sucursales</h1>
        <div className='container-fluid'>
                <div>
                    <div className='row mt-3'>
                        <div className='col-md-4 offset-md-4'>
                            <div className='d-grid mx-auto'>
                                <input type='text' id='filterByDoc' className='form-control' placeholder='Buscar por documento de cliente' value={filterById} onChange={((e) => setFilterById(e.target.value))}/>   
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => filter(filterById)}>Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>   
                            <button className='btn-min' onClick={() => createNewBranch()} data-bs-toggle='modal' data-bs-target='#modalCreateBranch'>
                                <FontAwesomeIcon icon={faCirclePlus} /> Nueva sucursal
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
                                        <th>DIRECCIÓN</th>
                                        <th>CIUDAD</th>
                                        <th>COD. VENDEDOR</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {
                                        branches.map((branch, i) => (
                                            <tr key={branch.code}>
                                                <td>{branch.name}</td>
                                                <td>{branch.address}</td>
                                                <td>{branch.city}</td>
                                                <td>{branch.sellerCode}</td>
                                                <td>
                                                    <button className='btn-min' onClick={() => branchDetails(branch)} title='Detalles' data-bs-toggle='modal' data-bs-target='#modalCreateBranch'>
                                                        <FontAwesomeIcon icon={faCircleInfo} />
                                                    </button>
                                                    <button  className='btn-min' title='Editar' onClick={() => branchUpdate(branch)} data-bs-toggle='modal' data-bs-target='#modalCreateBranch'>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                    <button  className='btn-min' title='Cambiar vendedor' onClick={() => sellerCodeUpdate(branch)} data-bs-toggle='modal' data-bs-target='#modalUpdateSellerCode'>  
                                                        <FontAwesomeIcon icon={faPerson} />
                                                    </button>
                                                    <button  className='btn-min' title='Eliminar' onClick={() => deleteBranch(branch)}>
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
            <div id='modalCreateBranch' className='modal fade' aria-hidden='true' aria-modal="true">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'> {title} </label>
                            <button id='btn-close' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faIdBadge} />
                                </span>
                                <input disabled={docDisabled} type='text' id='docNumber' className='form-control' placeholder='Número de documento del cliente' value={docNumber} onChange={((e) => setDocNumber(e.target.value))}></input>
                            </div>
                            <hr/>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faBuilding} /> 
                                </span>
                                <input disabled={disabled} type='text' id='nameBranch' className='form-control' placeholder='Nombre de sucursal' value={nameBranch} onChange={((e) => setNameBranch(e.target.value))}></input>
                            </div>
                            <div hidden={hidden} className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faBuilding} /> 
                                </span>
                                <input disabled={disabled} type='text' id='codeBranch' className='form-control' placeholder='Codigo de sucursal' value={codeBranch} onChange={((e) => setCodeBranch(e.target.value))}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faMapPin} /> 
                                </span>
                                <input disabled={disabled} type='text' id='addressBranch' className='form-control' placeholder='Dirección' value={addressBranch} onChange={((e) => setAddressBranch(e.target.value))}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </span>
                                <input disabled={disabled} type='text' id='cityBranch' className='form-control' placeholder='Ciudad' value={cityBranch} onChange={((e) => setCityBranch(e.target.value))}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </span>
                                <input disabled={disabled} type='text' id='countryBranch' className='form-control' placeholder='Pais' value={countryBranch} onChange={((e) => setCountryBranch(e.target.value))}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                <input disabled={disabled} type='text' id='phoneNumberBranch' className='form-control' placeholder='Teléfono fijo' value={phoneNumberBranch} onChange={((e) => setPhoneNumberBranch(e.target.value))}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                <input disabled={disabled} type='text' id='cellPhoneNumberBranch' className='form-control' placeholder='Número de celular' value={cellPhoneNumberBranch} onChange={((e) => setCellPhoneNumberBranch(e.target.value))}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input disabled={disabled} type='text' id='emailBranch' className='form-control' placeholder='Correo electrónico' value={emailBranch} onChange={((e) => setEmailBranch(e.target.value))}></input>
                            </div>
                            <div hidden={hidden} className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faPerson} />
                                </span>
                                <input disabled={disabled || hidden} hidden={hidden} type='text' id='sellerCodeBranch' className='form-control' placeholder='Código del vendedor' value={sellerCodeBranch} onChange={((e) => setSellerCodeBranch(e.target.value))}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </span>
                                <input disabled={disabled} type='text' id='creditBranch' className='form-control' placeholder='Credito para la sucursal' value={creditBranch} onChange={((e) => setCreditBranch(e.target.value))}></input>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                    <button hidden={disabled} className='btn btn-success' onClick={() => validate()}>
                                        <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
                                    </button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div id='modalUpdateSellerCode' className='modal fade' aria-hidden='true' aria-modal="true">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'> {title} </label>
                            <button id='btn-close' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div hidden={hidden} className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <FontAwesomeIcon icon={faPerson} />
                                </span>
                                <input disabled={disabled || hidden} hidden={hidden} type='text' id='sellerCodeBranch' className='form-control' placeholder='Código del vendedor' value={sellerCodeBranch} onChange={((e) => setSellerCodeBranch(e.target.value))}></input>
                            </div>
                            
                            <div className='d-grid col-6 mx-auto'>
                                    <button hidden={disabled} className='btn btn-success' onClick={() => validate()}>
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

export default Branches;
