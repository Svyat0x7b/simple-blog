import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/personal-photo/svyat.jpg"
                    alt="Author"
                    width={400}
                    height={400}
                />
            </div>
            <h1>Hi, I`m Svyat</h1>
            <p>
                Solution oriented web developer. Get profficient in React, Typescript, Next. Here is
                my blog about Web Dev!
            </p>
        </section>
    );
};

export default Hero;
