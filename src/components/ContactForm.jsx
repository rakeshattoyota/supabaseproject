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

    const { data, error } = await supabase
      .from("contact_us")
      .insert([
        {
          name: name,
          email: email,
          phone: phone,
          village: village,
          service: service,
        },
      ]);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Thank You! Your Request Submitted Successfully");

    setName("");
    setEmail("");
    setPhone("");
    setVillage("");
    setService("");
  }

  return (
    <div className="contact-form" id="contact">
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
          <option value="Aadhar Card">Aadhar Card</option>
          <option value="PAN Card">PAN Card</option>
          <option value="Voter ID">Voter ID</option>
          <option value="Labour Card">Labour Card</option>
          <option value="PMAY">PMAY</option>
          <option value="PF">PF</option>
          <option value="ESIC">ESIC</option>
          <option value="Insurance">Insurance</option>
          <option value="PM Kisan">PM Kisan</option>
          <option value="Ayushman Card">Ayushman Card</option>
          <option value="Ration Card">Ration Card</option>
        </select>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;