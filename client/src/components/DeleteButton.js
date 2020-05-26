import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Confirm } from 'semantic-ui-react';

const DeleteButton = ({ postId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(){
            setConfirmOpen(false);
            //TODO: remove post from cache
            if(callback) callback();
        },
        variables: {
            postId
        }
    })
    return(
        <>
            <div className="ui red button" 
                style={{float:"right"}} 
                onClick={()=> setConfirmOpen(true)}
                >
            <i className="trash icon" style={{margin:0}}></i> 
            </div>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />

        </>
    )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;