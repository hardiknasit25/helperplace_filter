import PropTypes from 'prop-types';

function Image({ sorce, alt }) {

  Image.propTypes = {
    sorce : PropTypes.img,
    alt : PropTypes.string
  };

  return (
    <div>
      <img src={sorce} alt={alt} className="h-[60px] w-[151.33] p-2 grayscale contrast-200 hover:filter-none hover:duration-[0.2s] " />
    </div>
  )
}

export default Image