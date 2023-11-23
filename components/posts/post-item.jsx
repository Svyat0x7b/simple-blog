import Link from 'next/link';
import Image from 'next/image';
import classes from './post-item.module.css';

const PostItem = (props) => {
    const { title, excerpt, image, date, slug } = props.post;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const imgFullPath = `/images/posts/${slug}/${image}`;
    const postPath = `/posts/${slug}`;
    return (
        <li className={classes.post}>
            <Link href={postPath}>
                <div className={classes.image}>
                    <Image src={imgFullPath} alt={title} width={300} height={200} />
                </div>
                <div className={classes.content}>
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                    <p>{excerpt}</p>
                </div>
            </Link>
        </li>
    );
};

export default PostItem;
