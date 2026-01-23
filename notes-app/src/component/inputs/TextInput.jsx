const TextInput = ({ name, value, label, onChange, required = false }) => {
  return (
    <>
      {" "}
      <div className="mb-4">
        <label html-for={name} className="block font-semibold">
          {label}
        </label>
        <input
          name={name}
          type="text"
          className="w-full p-2 border not-only:rounded-lg"
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </>
  );
};

export default TextInput;
