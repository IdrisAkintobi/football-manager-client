import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/reducers/user.slice";
import { requestFunc, URL } from "../../utils/constants";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "").required("Password is required"),
});

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values, actions) => {
        const { data, status } = await requestFunc(
          "post",
          URL.SIGN_IN,
          "",
          values
        );
        if (data) {
          dispatch(setUser({ ...data.details }));
          navigate("/dashboard");
          actions.resetForm();
        } else {
          actions.setErrors({
            email:
              status === 400
                ? "Invalid email or password"
                : "Something went wrong",
          });
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

export default SignInForm;
