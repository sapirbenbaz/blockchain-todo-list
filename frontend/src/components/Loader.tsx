import './Loader.css';

interface LoaderProps {
    message?: string; 
  }

  const Loader = ({ message = 'Loading...' }: LoaderProps) => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p className="loader-text">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
