import { useEffect, useState } from 'react'

export default function useFetch() {
   const [users,setUsers] = useState(null)
   useEffect(()=>{
       fetch('/api/users')
       .then(res=>res.json())
       .then(data=>setUsers(data))
   },[])
   return [users]
}
