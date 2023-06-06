import axios from 'axios'

export default function creates(data, url){

    console.log(data)

    axios.post(`http://localhost:8000/api/${url}`,
    data
    )
    
    setTimeout(() => {
        document.location.reload()
    }, 800);

}