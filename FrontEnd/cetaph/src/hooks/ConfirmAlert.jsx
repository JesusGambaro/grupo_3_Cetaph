import { useEffect } from 'react'
import Swal from 'sweetalert2'

export default function ConfirmAlert({ confirm, cancel }) {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Desea confirmar esta accion?',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    denyButtonText: 'Cancelar',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      confirm()
    } else {
      cancel()
    }
  })
}
