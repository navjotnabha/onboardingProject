import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
 
function Modal() { 

    return (   
        <div>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} size='lg'>
                <ModalHeader toggle={() => setModal(!modal)}>
                    Add New Customer
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputCustomer">Customer</label>
                            <input type="text" className="form-control" id="inputCustomer" name="Name" onChange={event => setCustomer({ ...customer, name: event.target.value })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input type="text" className="form-control" id="inputAddress" name="Address" onChange={event => setCustomer({ ...customer, address: event.target.value })} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </ModalBody>

            </Modal>
        </div>
        )
}
export default Modal;