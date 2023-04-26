import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactForm() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const storedDataList = JSON.parse(localStorage.getItem("dataList"));
    if (storedDataList) {
      setDataList(storedDataList);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const contactNo = e.target.contactNo.value;

    const existingData = dataList.find(
      (data) => data.contact_no === contactNo || data.first_name === firstName
    );

    if (existingData) {
      alert(
        `${existingData.first_name} ${existingData.last_name} with contact number ${existingData.contact_no} already exists.`
      );
      return;
    }

    const newData = {
      first_name: firstName,
      last_name: lastName,
      contact_no: contactNo,
    };
    const newDataList = [...dataList, newData];

    localStorage.setItem("dataList", JSON.stringify(newDataList));
    setDataList(newDataList);

    e.target.reset();
  };

  const handleDelete = (firstName) => {
    const newDataList = dataList.filter(
      (data) => data.first_name !== firstName
    );
    toast.success(`${firstName} deleted.`);
    localStorage.setItem("dataList", JSON.stringify(newDataList));
    setDataList(newDataList);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const storedDataList = JSON.parse(localStorage.getItem("dataList"));
    const filteredDataList = storedDataList.filter((data) => {
      const fullName = `${data.first_name} ${data.last_name}`.toLowerCase();
      return fullName.includes(searchText);
    });

    setDataList(filteredDataList);
  };

  const handleSort = () => {
    const sortedDataList = [...dataList].sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );
    setDataList(sortedDataList);
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSave}>
        <label>Person name</label>
        <div className="name">
          <input type="text" id="firstName" name="firstName" required />
          <input type="text" id="lastName" name="lastName" required />
        </div>

        <label htmlFor="contactNo">Contact Number</label>
        <input
          type="text"
          id="contactNo"
          name="contactNo"
          maxLength="10"
          minLength="10"
          required
        />

        <button className="save-btn" type="submit">
          Save
        </button>
      </form>

      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search"
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th onClick={handleSort}>Name</th>
            <th>Contact</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {dataList.map((data, index) => (
            <tr key={data.first_name}>
              <td>{index + 1}</td>
              <td>{`${data.first_name} ${data.last_name}`}</td>
              <td>{data.contact_no}</td>
              <td>
                <button onClick={() => handleDelete(data.first_name)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactForm;
