import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

function App() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data, error } = await supabase
      .from("employee")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setEmployees(data);
    }
  }

  return (
    <div>
      <h1>Employee Management System</h1>

      <EmployeeForm getData={getData} />

      <br />

      <EmployeeTable
        employees={employees}
        getData={getData}
      />
    </div>
  );
}

export default App;