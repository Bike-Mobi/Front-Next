import axios from 'axios'

export default function updates(data, url) {

    const id = data.id

    axios.put(`http://localhost:8000/api/${url}/${id}`,
        data
    )
    
    setTimeout(() => {
        document.location.reload()
      }, 800);
}



