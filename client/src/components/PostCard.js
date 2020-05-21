import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../images/avatar.png';
import moment from 'moment';

function PostCard(props){
    const { body, createdAt, id, username, likeCount, commentCount} = props.post;

    const likePosthandler = () => {
        console.log("Like post!")
    }

    const CommentOnPosthandler = () => {
        console.log("Comment added!")
    }
    return(
        <div>
            <div className="ui cards">
                <div className="ui fluid card">
                    <div className="content">
                        <img className="right floated mini ui image" src={avatar} alt="avatar"/>
                        <div className="header">
                            {username}
                        </div>
                        <div className="meta" >
                            <Link to={`/posts/${id}`}>
                                {moment(createdAt).fromNow(true)}
                            </Link>
                        </div>
                        <div className="description">
                            {body}
                        </div>
                        </div>
                        <div className="extra content">
                            <div className="ui labeled button" onClick={likePosthandler}>
                                <div className="ui teal button basic">
                                    <i className="heart icon"></i> 
                                </div>
                                <div className="ui basic teal left pointing label">
                                    {likeCount}
                                </div>
                            </div>
                            <div className="ui labeled button" onClick={CommentOnPosthandler}>
                                <div className="ui red button basic">
                                    <i className="comments icon"></i> 
                                </div>
                                <div className="ui basic red left pointing label">
                                    {commentCount}
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;