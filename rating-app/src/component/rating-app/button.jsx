const Button = ({ children, rating, handleClick, disabled }) => {
  return (
    <button disabled={disabled} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
