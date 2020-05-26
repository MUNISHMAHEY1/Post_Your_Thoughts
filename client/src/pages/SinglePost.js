import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import avatar from '../images/avatar.png';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props){
    const postId = props.match.params.postId; // get postId from url 
    const { user } = useContext(AuthContext);
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
          postId
        }
      });
    // console.log(data);
    function deletePostCallback(){
        props.history.push('/');
    } 

    let postMarkup;
    if(!data){
        postMarkup = <p>Loading post...</p>
    } else {
        const { 
            id, 
            body, 
            createdAt, 
            username, 
            comments, 
            likes, 
            likeCount, 
            commentCount
        } = data.getPost;
        
        postMarkup = (
            <div className="ui grid">
                <div className="row">
                    <div className="three wide column">
                        <img className="right floated mini ui image" 
                            src={avatar} 
                            alt="avatar" 
                            float="right"
                            style={{width:"12rem"}}
                            />
                    </div>
                    <div className="twelve wide column" width={10}>
                        <div className="ui cards">
                            <div className="ui fluid card">
                                <div className="content">
                                    <div className="header">
                                        {username}
                                    </div>
                                    <div className="meta" >
                                        {moment(createdAt).fromNow()}
                                    </div>
                                    <div className="description">
                                        {body}
                                    </div>
                                    <hr/>
                                    <div className="extra content">
                                        <LikeButton user={user} post={{ id, likeCount, likes }} />

                                        <div className="ui labeled button" onClick={() => console.log("Comment added")}>
                                            <div className="ui blue button basic">
                                                <i className="comments icon"></i> Comment
                                            </div>
                                            <div className="ui basic blue left pointing label">
                                                {commentCount}
                                            </div>
                                        </div>
                                        {user && user.username === username && (
                                            <DeleteButton postId={id} callback={deletePostCallback}/>
                                        )}
                                    </div>
                                </div>    
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        );
    
    }
    return postMarkup;

}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
    	comments{
        id
        createdAt
        username
        body
      }
    }
  }
`;

export default SinglePost;