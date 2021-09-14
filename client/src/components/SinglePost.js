import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useApiRequest from '../hooks/useApiRequest';
import ReactHtmlParser from 'react-html-parser'
import Loader from './Loader';
import useDocumentTitle from '../hooks/useDocumentTitle';

const SinglePost = () => {
    const posts = useSelector(state => state.posts)
    const {request, loading} = useApiRequest()

    const id = +useParams().id

    const [post, setPost] = useState()

    useEffect(() => {
        if (posts) {
            const postCandidate = posts.find(p => p.id === id)
            if (postCandidate) {
                setPost(postCandidate)
                return
            }
        }

        const fetchData = async () => {
            const data = await request('/posts/' + id)
            setPost(data.post)
        }

        fetchData()
    }, [])

    useDocumentTitle(post?.title || 'Запись')

    return (
        <div className='container'>
            {loading && <Loader />}
            {!loading && post && <>
                <h1>{post.title}</h1>
                <p>Автор: {post.user.login} ᅠДата: {(new Date(post.date)).toLocaleDateString()}</p>
                <div>
                    {ReactHtmlParser(post.content)}
                </div>
            </>}
        </div>
    );
};

export default SinglePost;