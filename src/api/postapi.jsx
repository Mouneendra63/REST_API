// Instance of the axios

import axios from 'axios';

const api=axios.create(
    {
        baseURL:'https://jsonplaceholder.typicode.com',
    }
);

// Methods

// get method

export const getPosts=()=>
{
    return api.get('/posts');
}

export const deletePost=(id)=>
{
    return api.delete(`/posts/${id}`);
}

export const postData=(post)=>
{
    return api.post('/posts',post);
}

// Put is used to update the entire data 
// patch is updating short data

export const updateData=(id,data)=>
{
    return api.patch(`/posts/${id}`,data);
}



