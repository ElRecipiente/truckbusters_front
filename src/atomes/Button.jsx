import { Link } from 'react-router-dom';
import './scss/button.scss'

export default function Button({linkTo, btnClass, children}) {
  return (
    <Link to={linkTo}>
      <div className={btnClass}>
        {children}
      </div>
    </Link>
  );
}