import React, { useState, useEffect } from 'react';
import { postData, updateData } from '../api/postapi';

function Search({ data, setData, title, content, id }) {
    console.log(data[0]);
    const [formData, setFormData] = useState({
        title: content || "",
        body: id || "",
    });

    // Update form fields when `content` or `id` changes
    useEffect(() => {
        setFormData({
            title: content || "",
            body: id || "",
        });
    }, [content, id]);

    // Function to handle adding a new post (POST request)
    const posting = async (formData) => {
        try {
            const res = await postData(formData);
            if (res.status === 201) {
                setData([...data, res.data]);  // Add new post to parent state
                setFormData({ title: "", body: "" }); // Reset form
            }
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    // Function to handle updating a post (PATCH request)
    const updating = async (formData) => {
        // console.log(formData);
        try {
            const res = await updateData(id, formData); // PATCH request to update
            if (res.status === 200) {
                const updatedData = data.map((item) => (item.id === id ? res.data : item));
                setData(updatedData); // Update the parent state
                setFormData({ title: "", body: "" }); // Reset form after update
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.body) {
            console.error("Title and Body cannot be empty!");
            return;
        }
        title ? updating(formData) : posting(formData); // Call the appropriate function
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg rounded-3">
                        <div className="card-body">
                            <h4 className="text-center mb-4">{title ? "Update" : "Add"}</h4>
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            id="title"
                                            name="title"
                                            className="form-control"
                                            placeholder="Enter title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                        <label htmlFor="title">Enter Title</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            id="body"
                                            name="body"
                                            className="form-control"
                                            placeholder="Enter body"
                                            value={formData.body}
                                            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                                        />
                                        <label htmlFor="body">Enter Body</label>
                                    </div>
                                </div>
                                <div className="col-12 d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        {title ? "Update" : "Add"}
                                    </button>
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