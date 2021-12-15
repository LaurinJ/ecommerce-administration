import React from 'react'
import PaymentForm from '../components/PaymentForm'

function AddPayment() {
    return (
        <React.Fragment>
      <h1 className="text-2xl">Nový způsob platby</h1>
      <div className="mt-5">
        <PaymentForm />
      </div>
    </React.Fragment>
    )
}

export default AddPayment
