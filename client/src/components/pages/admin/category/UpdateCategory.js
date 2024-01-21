import React, { useState, useEffect } from 'react'
import { readCategory, editCategory } from '../../../../functions/Category'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
const UpdateCategory = () => {
    const navigate = useNavigate()
    const param = useParams()
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("")
    useEffect(() => {
        loadData(user.user.token, param.id)
    }, [])
    const loadData = (authtoken, id) => {
        readCategory(authtoken, id).then((res) => {
            setName(res.data.name)
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        editCategory(user.user.token, param.id, { name })
            .then((res) => {
                navigate("/admin/create-category")
                toast.success("Update " + res.data.name + " Success")
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='col'>
            <h1>UpdateCategory</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>UpdateCategory</label>
                    <input
                        className='form-control'
                        value={name}
                        autoFocus
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className='btn btn-outline-primary'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateCategory