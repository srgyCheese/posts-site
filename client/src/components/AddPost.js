import React from 'react'
import { convertToRaw } from 'draft-js'
import draftToHTML from 'draftjs-to-html'
import Editor from './Editor'
import { useDispatch, useSelector } from 'react-redux'
import { clear, inputField, setErrors } from '../redux/addPost/actions'
import useAuthRequest from '../hooks/useAuthRequest'
import { useHistory } from 'react-router'
import useDocumentTitle from '../hooks/useDocumentTitle'

const AddPost = () => {
    useDocumentTitle('Добавление записи')
    const dispatch = useDispatch()
    const {request, error} = useAuthRequest()
    const addPost = useSelector(state => state.addPost)
    const history = useHistory()

    const stateToHTML = state => {
        return draftToHTML(convertToRaw(state.getCurrentContent()))
    }

    const submitHandler = async e => {
        try {
            e.preventDefault()
            const validationErrors = []
            if (addPost.title.length === 0) {
                validationErrors.push('Заполните заголовок записи')
            }
    
            if (!addPost.content.getCurrentContent().hasText()) {
                validationErrors.push('Заполните контент записи')
            }
    
            if (validationErrors.length !== 0) {
                return dispatch(setErrors(validationErrors))
            } else {
                dispatch(setErrors(null))
            }
            
            const data = await request('/posts', {
                method: 'POST', 
                body: JSON.stringify({
                    title: addPost.title,
                    content: stateToHTML(addPost.content)
                })
            })

            if (data.error) {
                return dispatch(setErrors([data.error]))
            }

            if (error) {
                throw error
            }

            history.push('/')

            dispatch(clear())
        } catch (e) {
            dispatch(setErrors(['Произошла неизвестная ошибка']))
        }
    }

    return (
        <div className='container'>
            <form onSubmit={submitHandler} className='mt-4'>
                {addPost.errors && <div class="alert alert-danger" role="alert">
                        <ul className="m-0">
                            {addPost.errors.map(err => (
                                <li key={err}>{err}</li>
                            ))}
                        </ul>
                    </div>
                }
                <div className='form-group'>
                    <label htmlFor='input-title'>Заголовок записи</label>
                    <input value={addPost.title} onChange={e => dispatch(inputField('title', e.target.value))} type='text' className='form-control' id='input-title' placeholder='Введите заголовок' />
                </div>

                <div className='form-group mt-2'>
                    <label>Текст записи</label>
                    <Editor state={addPost.content} onChange={content => dispatch(inputField('content', content))} />
                </div>

                <input type='submit' className='btn btn-primary mt-2' value='Создать запись' />
            </form>
        </div>
    )
}

export default AddPost