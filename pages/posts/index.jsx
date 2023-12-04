import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../helpers/posts';

const PostsPage = ({ posts }) => {
    return (
        <>
            <Head>
                <title>All Posts</title>
                <meta name="description" content="Posts about programming!" />
            </Head>
            <AllPosts posts={posts} />;
        </>
    );
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
