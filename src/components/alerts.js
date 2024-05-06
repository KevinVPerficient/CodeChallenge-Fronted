import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function show_alert(message = '', icon, focus=''){
    onFocus(focus);
    const MySwal= withReactContent(Swal);
    if(icon === 200 || icon === 201 || icon === 204) icon = 'success'
    MySwal.fire({
        title: message,
        icon: icon
    })
}


function onFocus(focus){
    if(focus !== ''){
        document.getElementById(focus).focus();
    }
}
