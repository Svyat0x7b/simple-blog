import Head from 'next/head';
import PostContent from '../../components/posts/post-detail/post-content';
import { getFilesFromPosts, getPostData } from '../../helpers/posts';

const PostDetailPage = ({ post }) => {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt} />
            </Head>
            <PostContent post={post} />;
        </>
    );
};

export function getStaticProps(ctx) {
    const { params } = ctx;
    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    };
}

export function getStaticPaths() {
    const files = getFilesFromPosts();

    const slugs = files.map((fileName) => fileName.replace(/\.md$/, ''));

    const postsPaths = slugs.map((slug) => {
        return {
            params: {
                slug: slug,
            },
        };
    });

    return {
        paths: postsPaths,
        fallback: false,
    };
}

export default PostDetailPage;
