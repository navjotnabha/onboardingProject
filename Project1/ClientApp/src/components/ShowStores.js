import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
const ShowStores = () => {

    // 1 create useStae
    const [stores, setStores] = useState([])

    //2 call Api
    useEffect(() => {

        fetch("api/store/GetStores")
            .then(response => { return response.json() })
            .then(responseJson => {

                setStores(responseJson)
            })


    }, [])
    /*Add New Customer*/

    const [modal, setModal] = useState(false);


    const [store, setStore] = useState({ name: "", address: "" });
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/store', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(store)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('store added successfully');
                setModal(false)
                window.location.reload();
            })
            .catch(error => {
                console.error("NAVJOT ::::::: " + error + "\n " + JSON.stringify(store));
                setModal(false)
                window.location.reload();
            });
    };

    return (
        <div className="container">

            <button className='btn btn-success' onClick={() => setModal(true)}>Add New Store</button>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} size='lg'>
                <ModalHeader toggle={() => setModal(!modal)}>
                    Add New Customer
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputCustomer">Store</label>
                            <input type="text" className="form-control" id="inputStore" name="Name" onChange={event => setStore({ ...store, name: event.target.value })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input type="text" className="form-control" id="inputAddress" name="Address" onChange={event => setStore({ ...store, address: event.target.value })} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </ModalBody>

            </Modal>

            <h1>Stores</h1>
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                               
                                <th>Id </th>
                                <th>Name</th>
                                <th>Price </th>
                                <th colSpan={2} style={{ textAlign: "center" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                stores.map((item) => (

                                    <tr>  <td>{item.id}    </td>
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
    if (window.confirm("Are you sure to delete this Store?") == true) {
        /*alert(id)*/
        fetch('api/store/DeleteStore?id=' + id, {
            method: 'DELETE',
            header: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            }
        }).then(() => { window.location.reload(); })

    }

}
export default ShowStores