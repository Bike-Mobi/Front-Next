import axios from 'axios'
import React from 'react'


export default function deletes(data, url) {
    const id = data.id
    console.log(id)

    axios.delete(`http://localhost:8000/api/${url}/${id}`)

    setTimeout(() => {
      document.location.reload()
    }, 800);
}


