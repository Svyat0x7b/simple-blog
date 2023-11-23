import PostsGrid from '../posts/posts-grid';
import classes from './feature-posts.module.css';

const FeaturePosts = (props) => {
    const { posts } = props;
    return (
        <section className={classes.latest}>
            <h2>Featured Posts</h2>
            <PostsGrid posts={posts} />
        </section>
    );
};

export default FeaturePosts;
