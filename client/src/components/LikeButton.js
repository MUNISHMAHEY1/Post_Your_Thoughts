import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'; 
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function LikeButton({ user, post: { id, likeCount, likes} }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
          setLiked(true);
        } else setLiked(false);
      }, [user, likes]); // dependency array of user and likes this will make sure that the function run each time there is a change in user or likes  
    
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id},
        onError(err){
            console.log(err.graphQLErrors[0].message);
        }
    });

    const likeButton = user ? (
        liked ? (
            <div className="ui teal button">
                <i className="heart icon"></i> 
            </div>
        ) : (
            <div className="ui teal button basic">
                <i className="heart icon"></i> 
            </div>
        )
    ) : (
        <Link to="/login">
            <div className="ui teal button basic">
                <i className="heart icon"></i> 
            </div>
        </Link>
    );
    
    return (
        <>
            <div className="ui labeled button" onClick={likePost}>
               {likeButton}
                <div className="ui basic teal left pointing label">
                    {likeCount}
                </div>
            </div>
        </>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`;
export default LikeButton
