import { useEffect } from 'react'
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router'
export default function ScrollToTop({ confirm }) {
  Swal.fire({
    position: 'center',
    icon: 'question',
    title: 'Para realizar esta accion es necesario estar logeado',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Iniciar sesion',
    denyButtonText: 'Continuar sin sesion',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      confirm()
    }
  })
}
