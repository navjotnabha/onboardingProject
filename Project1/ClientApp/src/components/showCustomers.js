 import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ShowCustomers = () => {

    // 1 create useStae
    const [customers, setCustomers] = useState([])

    //2 call Api
    useEffect(() => {

        fetch("api/customer/GetCustomers")
            .then(response => { return response.json() })
            .then(responseJson => {

                setCustomers(responseJson)
            })


    }, [])

    /*Add New Customer*/

    const [modal, setModal] = useState(false);


    const [customer, setCustomer] = useState({ name: "", address: "" });
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('customer added successfully');
                setModal(false)
                window.location.reload();
            })
            .catch(error => {
                console.error("NAVJOT ::::::: " + error + "\n " + JSON.stringify(customer));
                setModal(false)
                window.location.reload();
            });
    };

    return (
        <div className="container">

            <button className='btn btn-success' onClick={() => setModal(true)}>Add New Customer</button>
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

            <h1>Customers</h1>
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {console.log(customers)}
                                <th>Id </th>
                                <th>Name</th>
                                <th>Address </th>
                                <th colSpan={2} style={{ textAlign: "center" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                customers.map((item) => (

                                    <tr key={item.id }><td>{item.id}    </td>
                                        <td>{item.name}  </td>
                                        <td>{item.address}  </td>
                                        <td><button className="btn-primary">Edit </button></td>
                                        <td><button onClick={() => handleDelete(item.id)} className="btn-danger">Delete </button> </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )

}
const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this Customer?") == true) {
        /*alert(id)*/
        fetch('api/customer/DeleteCustomer?id=' + id, {
            method: 'DELETE',
            header: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            }
        }).then(() => { window.location.reload(); })

    }

}
export default ShowCustomers