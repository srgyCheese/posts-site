import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useApiRequest from '../hooks/useApiRequest';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { setPosts } from '../redux/posts/actions';
import Loader from './Loader';

const Main = () => {
    useDocumentTitle('Главная')
    const {request, loading} = useApiRequest()
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    const history = useHistory()
    

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await request('/posts')
            dispatch(setPosts(data.posts))
        }

        fetchPosts()
    }, [request, dispatch])
    
    return (
        <div className='container'>
            {loading && <Loader style={{marginTop: '30px'}} />}
            <table className="table table-striped main-table mt-3">
                <tbody>
                    {posts && posts.map(post => <tr onClick={() => history.push('/post/' + post.id)} key={post.id}>
                        <td>{post.title}</td>
                        <td>Автор: {post.user.login} ᅠДата: {(new Date(post.date)).toLocaleDateString()}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default Main;