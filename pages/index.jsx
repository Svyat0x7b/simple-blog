import Hero from '../components/home-page/hero';
import FeaturePosts from '../components/home-page/feature-posts';
import { getFeaturedPosts } from '../helpers/posts';
const HomePage = ({ posts }) => {
    return (
        <>
            <Hero />
            <FeaturePosts posts={posts} />
        </>
    );
};

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts,
        },
    };
}

export default HomePage;
