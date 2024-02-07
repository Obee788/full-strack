import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        await axios.get(`http://localhost:8000/api/products`).then(({data}) => {
            setProducts(data);
        })
    }

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: "ເຈົ້າໝັ້ນໃຈບໍ?",
            text: "ຂໍ້ມູນຂອງເຈົ້າຈະຖືກລົບແບບຖາວອນ!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText: "ແມ່ນ ຂ້ອຍຈະກຳຈັດມັນ!",
            cancelButtonText: "ກັບຄືນ"

        }).then((result) => {
            return result.isConfirmed
        })

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://localhost:8000/api/products/${id}`).then(({data}) => {
            Swal.fire({
                icon: 'success',
                text: data.message
            })
            fetchProducts()
        }).catch(({response:{data}}) => {
            Swal.fire({
                text: data.message,
                icon: 'error'
            })
        })
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-12">
                <Link className='btn btn-success mb-2 float-end' to={"/product/create"}>
                    ເພີ່ມຂໍ້ມູນ
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <td>ຮູບພາບ</td>
                                    <td>ຊື່</td>
                                    <td>ນາມສະກຸນ</td>
                                    <td>ເພດ</td>
                                    <td>ວັນເດືອນປີເກີດ</td>
                                    <td>ທີ່ຢູ່</td>
                                    <td>ໂຕເລືອກ</td>

                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((row, key) => (
                                        <tr key={key}>
                                              <td>
                                                <img width="50px" src={`http://localhost:8000/storage/product/image/${row.image}`} alt="" />
                                            </td>
                                          
                                            <td>{row.fname}</td>
                                            <td>{row.lname}</td>
                                            <td>{row.gender}</td>
                                            <td>{row.date}</td>
                                            <td>{row.address}</td>
                                            
                                          
                                            <td>
                                                <Link to={`/product/edit/${row.id}`} className="btn btn-warning me-2">
                                                    ແກ້ໄຂຂໍ້ມູນ
                                                </Link>
                                                <Button variant='danger' onClick={() => deleteProduct(row.id)}>
                                                   ລົບຂໍ້ມູນ
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No products found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductList