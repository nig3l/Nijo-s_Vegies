import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    alert(`Subscribed with: ${email}`);
  };

  return (
    <div className="newsletter">
      <p>Subscribe to our newsletter</p>
      <input 
        type="email" 
        placeholder="Your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default Newsletter;
