const SelectInput = ({
  name,
  value,
  label,
  onChange,
  options,
  required = false,
}) => {
  return (
    <>
      {" "}
      <div className="mb-4">
        <label html-for={name} className="block font-semibold">
          {label}
        </label>
        <select
          name={name}
          type="text"
          className="w-full p-2 border not-only:rounded-lg"
          value={value}
          onChange={onChange}
          required={required}
        >
          {" "}
          {options.map((data) => (
            <option key={data} value={data}>
              {data}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectInput;
