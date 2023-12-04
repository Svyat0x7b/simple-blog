import Head from 'next/head';
import Hero from '../components/home-page/hero';
import FeaturePosts from '../components/home-page/feature-posts';
import { getFeaturedPosts } from '../helpers/posts';

const HomePage = ({ posts }) => {
    return (
        <>
            <Head>
                <title>Svyat`s Blog</title>
                <meta name="description" content="A blog about programming and developement!" />
            </Head>
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
