import { useState } from "react";
import { supabase } from "../supabase";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [service, setService] = useState("");

  async function saveVisitor(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("visitors")
      .insert([
        {
          name,
          email,
          phone,
          village,
          service
        }
      ]);

    if (error) {
      console.log(error);
      alert("Data Save Failed");
    } else {
      alert("Thank You! Your Request Submitted");

      setName("");
      setEmail("");
      setPhone("");
      setVillage("");
      setService("");
    }
  }

  return (
    <form onSubmit={saveVisitor}>
      <h2>Contact Us</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Village Name"
        value={village}
        onChange={(e) => setVillage(e.target.value)}
      />

      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        required
      >
        <option value="">Select Service</option>
        <option>Aadhar Card</option>
        <option>PAN Card</option>
        <option>Ayushman Card</option>
        <option>Ration Card</option>
      </select>

      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default ContactForm;