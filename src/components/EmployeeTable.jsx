import { supabase } from "../supabase";

function EmployeeTable({ employees, getData }) {

  async function updateEmployee(emp) {
    const newName = prompt("Enter Name", emp.name);
    const newDept = prompt("Enter Department", emp.department);
    const newSalary = prompt("Enter Salary", emp.salary);

    const { error } = await supabase
      .from("employee")
      .update({
        name: newName,
        department: newDept,
        salary: newSalary
      })
      .eq("id", emp.id);

    if (error) {
      console.log(error);
    } else {
      getData();
    }
  }

  async function deleteEmployee(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("employee")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      getData();
    }
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.department}</td>
            <td>{emp.salary}</td>

            <td>
              <button
                onClick={() => updateEmployee(emp)}
              >
                Update
              </button>

              <button
                onClick={() => deleteEmployee(emp.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;