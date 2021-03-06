/** @format */
import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';

import { SignUpContainer } from './sign-up-form.styles';

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
      if (e.code === 'auth/email-already-in-use') {
        alert('email already in use');
      } else if (e.code === 'auth/weak-password') {
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
    <SignUpContainer>
      <h1>Don't Have An Account?</h1>
      <span>Sign Up with a Username and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
        />
        <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />
        <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />
        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
