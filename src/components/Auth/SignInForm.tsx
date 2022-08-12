import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "").required("Password is required"),
});

const SignInForm = () => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values, actions) => {
        console.log("Hello");
        await axios.post("http://localhost:3001/api/user/login", values);
        actions.resetForm();
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="email">
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor="email">email</FormLabel>
                <Input {...field} id="email" placeholder="example@mail.com" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="password">password</FormLabel>
                <Input
                  {...field}
                  type="password"
                  id="password"
                  placeholder="********"
                  autoComplete="false"
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
