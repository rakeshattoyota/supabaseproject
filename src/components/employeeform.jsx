import { useState } from "react";
import { supabase } from "../supabase";

function EmployeeForm({ getData }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  async function addEmployee(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("employee")
      .insert([
        {
          name,
          department,
          salary: Number(salary)
        }
      ]);

    if (error) {
      console.log("Insert Error:", error);
    } else {
      alert("Employee Added Successfully");

      setName("");
      setDepartment("");
      setSalary("");

      getData();
    }
  }

  return (
    <form onSubmit={addEmployee}>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Enter Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Enter Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />

      <button type="submit">
        Add Employee
      </button>
    </form>
  );
}

export default EmployeeForm;