import { useState } from "react";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import TextArea from "./inputs/TextArea";

const NoteForm = ({ newNote, setNewNote }) => {
  // const [title, setTitle] = useState();
  // const [priority, setPriority] = useState("Medium");
  // const [description, setDescription] = useState();
  // const [category, setCategory] = useState("Work");
  const [isFormVisible, setFormVisible] = useState(true);

  const [fromData, setFormData] = useState({
    title: "",
    priority: "Medium",
    description: "",
    category: "Work",
  });
  const handleEvent = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
  };

  const options = {
    Priority: ["High", "Medium", "Low"],
    Category: ["Work", "Personal", "Others"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //validation
    if (!fromData.title || !fromData.description) return;

    // Assign a id for every notes
    const notes = { id: Date.now(), ...fromData };
    setNewNote([notes, ...newNote]);
    setFormData({
      title: "",
      priority: "Medium",
      description: "",
      category: "Work",
    });
  };

  return (
    <>
      <button
        onClick={() => setFormVisible(!isFormVisible)}
        className="w-full bg-gray-100 border border-gray-300 text-purple-800 py-2 rounded-lg cursor-pointer hover:bg-purple-200 hover:border-purple-300 transition mb-4"
      >
        {isFormVisible ? "Hide Form" : "Add New Note"}
      </button>
      {/* Conditional Rendering */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-6">
          {/* <div className="mb-4">
            <label html-for="title" className="block font-semibold">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="w-full p-2 border not-only:rounded-lg"
              value={fromData.title}
              onChange={handleEvent}
            />
          </div> */}
          <TextInput
            name="title"
            label="Title"
            value={fromData.title}
            onChange={handleEvent}
            required={true}
          />
          {/* <div className="mb-4">
            <label html-for="title" className="block font-semibold">
              Priority
            </label>
            <select
              name="priority"
              type="text"
              className="w-full p-2 border not-only:rounded-lg"
              value={fromData.priority}
              onChange={handleEvent}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div> */}
          <SelectInput
            name="priority"
            label="Priority"
            value={fromData.priority}
            onChange={handleEvent}
            options={options.Priority}
            required={true}
          />
          {/* <div className="mb-4">
            <label html-for="title" className="block font-semibold">
              Category
            </label>
            <select
              name="category"
              type="text"
              className="w-full p-2 border not-only:rounded-lg"
              value={fromData.category}
              onChange={handleEvent}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Others">Others</option>
            </select>
          </div> */}
          <SelectInput
            name="category"
            label="Category"
            value={fromData.category}
            onChange={handleEvent}
            options={options.Category}
            required={true}
          />
          {/* <div className="mb-4">
            <label html-for="title" className="block font-semibold">
              Description
            </label>
            <textarea
              name="description"
              type="text"
              className="w-full p-2 border not-only:rounded-lg"
              value={fromData.description}
              onChange={handleEvent}
            /> </div>*/}
          <TextArea
            name="description"
            label="Description"
            value={fromData.description}
            onChange={handleEvent}
            required={true}
          />

          <button className="w-full bg-purple-500 text-white p-2 rounded-lg cursor-pointer mt-4 hover:bg-purple-600">
            Add Note
          </button>
        </form>
      )}
    </>
  );
};

export default NoteForm;
