/** @format */
import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match!');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (e) {
      if (e.code == 'auth/email-already-in-use') {
        alert('email already in use');
      } else if (e.code == 'auth/weak-password') {
        alert('weak password!');
      } else {
        console.log('user creation encountered error- ', e);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign Up with a Username and Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input type="text" onChange={handleChange} name="displayName" value={displayName} required />

        <label>Email</label>
        <input type="email" onChange={handleChange} name="email" value={email} required />

        <label>Password</label>
        <input type="password" onChange={handleChange} name="password" value={password} required />

        <label>Confirm Password</label>
        <input type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;