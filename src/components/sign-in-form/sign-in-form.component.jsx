/** @format */
import { useState } from 'react';
import './sign-in-form.styles.scss';
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (e) {
      alert(`user sign-in encountered error ${e.code}, ${e.message}`);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h1>Already Have An Account?</h1>
      <span>Sign In with an Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />
        <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />
        <div className="buttons-container">
          <Button type="submit">Email Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
