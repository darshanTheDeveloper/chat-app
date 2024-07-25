import { useEffect, useState } from 'react'
import {useUser} from '../components/context/UserContext'
import useFetch from './useFetch'

export default function useConversations() {
    const {currentUser} = useUser()
    const [users] = useFetch()
    const [conversations,setConversations] = useState([])

    useEffect(()=>{
        if(currentUser && users){
            const filteredUsers = users.filter(user=>user.username!==currentUser.username)
            setConversations(filteredUsers)
        }
    },[currentUser,users])
    return [conversations]
}
