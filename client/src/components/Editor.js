import React from 'react'
import { Editor as DraftEditor } from "react-draft-wysiwyg"

const Editor = ({state, onChange}) => {
    const uploadImageCallback = async file => {
        const form = new FormData()
        form.append('image', file)

        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/upload-image', {
            method: 'POST',
            body: form
        })

        const data = await res.json()

        return data
    }


    return (
        <DraftEditor
            toolbar={{
                image: { uploadCallback: uploadImageCallback, previewImage: true, alt: { present: true, mandatory: false },
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg', },
            }}
            editorState={state}
            onEditorStateChange={onChange}
        />
    );
};

export default Editor;