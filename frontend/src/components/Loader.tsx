import React from 'react'
import { PuffLoader } from 'react-spinners'
export default function Loader() {
    return (
        <section className='loader-container'> <PuffLoader color='#f78c48' size={100} /></section>
    )
}
