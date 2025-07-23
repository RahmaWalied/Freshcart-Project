import React, { useContext } from 'react'
import { authContext } from '../../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function LoginProtected({children}) {

    let {token} = useContext(authContext)
  return (
    <>
    {!token ? children: <Navigate to={'/home'}/>}
    </>
  )
}
