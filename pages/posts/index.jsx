import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../helpers/posts';

const PostsPage = ({ posts }) => {
    return <AllPosts posts={posts} />;
};

export function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts,
        },
    };
}

export default PostsPage;
