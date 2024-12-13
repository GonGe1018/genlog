import { useLocation } from 'react-router-dom';
import s from './sytle.module.scss';

const Blog = () => {
    const location = useLocation();
    const { title, content } = location.state || {};
    return(
        <div className={s.container}
            dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default Blog;
