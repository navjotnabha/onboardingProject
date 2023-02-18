import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
 
const ShowSales = () => {

    // 1 create useStae
    const [sales, setSales] = useState([])

    //2 call Api
    useEffect(() => {

        fetch("api/sale/GetSales")
            .then(response => { return response.json() })
            .then(responseJson => {

                setSales(responseJson)
            })  
    }, [])
    /*Add New sale*/

    const [modal, setModal] = useState(false);


    const [sale, setSale] = useState({ CustomerId: "", StoreId: "" ,ProductId :""});
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/sale', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sale)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('sale added successfully');
                setModal(false)
                window.location.reload();
            })
            .catch(error => {
                console.error("NAVJOT ::::::: " + error + "\n " + JSON.stringify(sale));
                setModal(false)
                window.location.reload();
            });
    };


    return (
        <div className="container">

            <button className='btn btn-success' onClick={() => setModal(true)}>Add New Sale</button>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} size='lg'>
                <ModalHeader toggle={() => setModal(!modal)}>
                    Add New Product
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="inputProduct">Product</label>*/}
                        {/*    <input type="text" className="form-control" id="inputProduct" name="Name" onChange={event => setSale({ ...sale, customerId: event.target.value })} />*/}
                        {/*</div>*/}

                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="inputPrice">Price</label>*/}
                        {/*    <input type="text" className="form-control" id="inputPrice" name="Price" onChange={event => setSale({ ...sale, productId: event.target.value })} />*/}
                        {/*</div>*/}

                             
                          
                                
                        <select name="ProductId" onChange={event => setSale({ ...sale, ProductId: event.target.value })}>
                                                              <option>Select Product</option>
                                       {sales.map((item) => ( <option key={item.id} value={item.prodId}>{item.productName}</option>) ) }
                                     </select>  <br></br>
                               
                            
                          
                              
                        <select name="CustomerId" onChange={event => setSale({ ...sale, CustomerId: event.target.value })}>
                                                          <option>Select Customer</option>
                                    {sales.map((item) => (<option key={item.id} value={item.custId}> {item.customerName}</option>))    }
                        </select><br></br>
                                
                                        
                                   
                        <select name="StoreId" onChange={event => setSale({ ...sale, StoreId: event.target.value })}>
                                                              <option>Select Store</option>
                                        {sales.map((item) => (<option key={item.id} value={item.stoId}>{item.storeName}</option>))}
                        </select><br></br><br></br>
                            
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </ModalBody>

            </Modal>

            <h1>Sales</h1>
             <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>

                                <th>Id </th>
                                <th>Customer </th>
                                <th>Product</th>
                                <th>Store </th>
                                <th>Date </th>
                                <th colSpan={2} style={{ textAlign: "center" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                sales.map((item) => (

                                    <tr key={item.id }>
                                        <td>{item.id}    </td>
                                        <td>{item.customerName}    </td>
                                        <td>{item.productName}  </td>
                                        <td>{item.storeName}  </td>
                                        <td>{item.dateSold}  </td>
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
    if (window.confirm("Are you sure to delete this Sale?") == true) {
        /*alert(id)*/
        fetch('api/sale/DeleteSale?id=' + id, {
            method: 'DELETE',
            header: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            }
        }).then(() => { window.location.reload(); })

    }

}
export default ShowSales