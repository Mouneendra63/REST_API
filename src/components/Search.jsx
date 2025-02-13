import React, { useState } from 'react';
import { postData } from '../api/postapi';

function Search({data,setData}) {
    const [adddata,setAddata]=useState({
        title:"",
        body:"",
    })

    const posting=async()=>
    {
        const res=await postData(adddata);
        if(res.status===201)
        {
            setData([...data,res.data]);
            setAddata({title:"",body:""});
        }
    }

    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        posting();
    }
    return ( 
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg rounded-3">
                        <div className="card-body">
                            <h4 className="text-center mb-4">Add Form</h4>
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="text" autoComplete="off" id="title" name="title" className="form-control" placeholder="Add title" onChange={()=>setAddata({...adddata,title:event.target.value})}/>
                                        <label htmlFor="title">Title 1</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="text" autoComplete="off" id="body" name="body" className="form-control" placeholder="Add title" onChange={()=> setAddata({...adddata,body:event.target.value})}/>
                                        <label htmlFor="body">Title 2</label>
                                    </div>
                                </div>
                                <div className="col-12 d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Search;