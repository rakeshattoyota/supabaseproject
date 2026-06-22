import { useState } from "react";
import { supabase } from "../supabase";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function saveVisitor(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const { error } = await supabase
      .from("visitors")
      .insert([
        {
          name,
          email,
          phone,
          village,
          service,
          message
        }
      ]);

    if (error) {
      console.log(error);
      setStatus("Submission failed. Please try again.");
    } else {
      setStatus("Thank you! Your request has been submitted.");
      setName("");
      setEmail("");
      setPhone("");
      setVillage("");
      setService("");
      setMessage("");
    }

    setIsSubmitting(false);
  }

  return (
    <form className="contact-form" onSubmit={saveVisitor}>
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
        required
      />

      <input
        type="tel"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        pattern="[0-9]{10}"
        maxLength={10}
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
        <option>Ayushman Bharat</option>
        <option>Ration Card</option>
        <option>Voter ID</option>
        <option>E-Shram Card</option>
        <option>Other</option>
      </select>

      <textarea
        placeholder="Describe the service you need (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {status && <p className="status-message">{status}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}

export default ContactForm;
