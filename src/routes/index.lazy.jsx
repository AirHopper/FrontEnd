import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import Navbar from '../components/Buyer/NavBar'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar/>
    </>
  )
}
