import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/reducers/user.slice";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        teamName: "",
        country: "",
      }}
      onSubmit={async (values, actions) => {
        try {
          const response = await axios.post(
            "http://localhost:3001/api/user/signup",
            values
          );
          const { owner: email, token } = response.data.details;
          dispatch(setUser({ email, token }));
          navigate("/dashboard", { replace: true });
          actions.resetForm();
        } catch (error) {
          console.log(error);
        }
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
          <Field name="confirmPassword">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={
                  form.errors.confirmPassword && form.touched.confirmPassword
                }
              >
                <FormLabel htmlFor="confirmPassword">
                  confirm password
                </FormLabel>
                <Input
                  {...field}
                  type="password"
                  id="confirmPassword"
                  placeholder="********"
                  autoComplete="false"
                />
                <FormErrorMessage>
                  {form.errors.confirmPassword}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="teamName">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.teamName && form.touched.teamName}
              >
                <FormLabel htmlFor="teamName">Team name</FormLabel>
                <Input {...field} id="teamName" placeholder="Team name" />
                <FormErrorMessage>{form.errors.teamName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="country">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.country && form.touched.country}
              >
                <FormLabel htmlFor="country">Country</FormLabel>
                <Input {...field} id="country" placeholder="Country" />
                <FormErrorMessage>{form.errors.country}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="messenger"
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

export default SignUpForm;
