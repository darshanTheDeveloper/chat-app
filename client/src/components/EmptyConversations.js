import React from 'react'
import './styles.css'
import emptyConversation from '../assets/dab.png'

export default function EmptyConversations() {
  return (
    <div className='EmptyConversations'>
        <img src={emptyConversation} alt='' width="200px"/>
        <h1>NO<span>CONVERSATIONS</span>SELECTED</h1>
    </div>
  )
}
