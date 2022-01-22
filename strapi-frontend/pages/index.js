import React, { useContext, useReducer, useState } from 'react'
import { Button } from 'react-bootstrap'
import Header from '@/components/Header'
import reducer from '@/reducers/index'
import AuthContext from '@/context/AuthContext'
const Dashboard = () => {
  let initialState = {
    sum: 0, sub: 0
  }
  // const [state, setState] = useState(initialState);

  const { user, logout } = useContext(AuthContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(`calling: ${user}`)
  console.log(initialState)

  return (
    <>


      <Header />
      <div className="container">
        This is Dashboard Page.
        Addition: {state.sum}
        Subtraction: {state.sub}
        <Button onClick={() => dispatch({ type: 'ADD' })}>Add</Button>
        <Button onClick={() => dispatch({ type: 'SUB' })}>Sub</Button>
      </div>
    </>
  )
}

export default Dashboard
