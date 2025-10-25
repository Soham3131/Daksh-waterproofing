import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const VerifyOtp = () => {
  const { verifyOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await verifyOtp(email, otp);
      setMessage('Signup complete! You are logged in.');
      console.log(res);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
