import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
const ShowProducts = () => {

    // 1 create useStae
    const [products, setProducts] = useState([])

    //2 call Api
    useEffect(() => {

        fetch("api/product/GetProducts")
            .then(response => { return response.json() })
            .then(responseJson => {

                setProducts(responseJson)
            })
    }, [])

    /*Add New Product*/

    const [modal, setModal] = useState(false);


    const [product, setProduct] = useState({ name: "", price: "" });
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Product added successfully');
                setModal(false)
                window.location.reload();
            })
            .catch(error => {
                console.error("NAVJOT ::::::: " + error + "\n " + JSON.stringify(product));
                setModal(false)
                window.location.reload();
            });
    };



    return (
        <div className="container">
            <h1>Products</h1>

             
            <button className='btn btn-success' onClick={() => setModal(true)}>Add New Product</button>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} size='lg'>
                <ModalHeader toggle={() => setModal(!modal)}>
                    Add New Product
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputProduct">Product</label>
                            <input type="text" className="form-control" id="inputProduct" name="Name" onChange={event => setProduct({ ...product, name: event.target.value })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputPrice">Price</label>
                            <input type="text" className="form-control" id="inputPrice" name="Price" onChange={event => setProduct({ ...product, price: event.target.value })} />
                        </div>
                       
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </ModalBody>

            </Modal>



            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {console.log(products)}
                                <th>Id </th>
                                <th>Name</th>
                                <th>Price </th>
                                <th colSpan={2} style={{ textAlign: "center" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                products.map((item) => (

                                    <tr key={item.id }><td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td><button onClick={() => setModal(true)} className="btn-primary">Edit </button></td>
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
    if (window.confirm("Are you sure to delete this Product?") == true) {
        /*alert(id)*/
        fetch('api/product/DeleteProduct?id='+id, {
            method: 'DELETE',
            header: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            }
        }).then(() => { window.location.reload(); })
        
    }

}

const handleEdit = () => {
 
}

export default ShowProducts