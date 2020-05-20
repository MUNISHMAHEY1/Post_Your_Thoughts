import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PostCard from '../components/PostCard';
function Home() {
    const { loading, data} = useQuery(FETCH_POSTS_QUERY);
    
    return (
        <div>
            <div className="ui three column grid">
                <div className="row page-title">
                    <h1>Recent Posts</h1>
                </div>

                <div className="row">
                    { loading ? (
                        <h1>loading posts...</h1>
                    ): (
                        data.getPosts && data.getPosts.map((post) => (
                            <div className="column" key={post.id}>
                                <PostCard post={post}/><br></br>
                            </div>
                        ))
                    )}
                </div> 
            </div>
        </div>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id 
            body 
            createdAt 
            username 
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id 
                username 
                createdAt 
                body
            }
        }
    }
`

export default Home;
