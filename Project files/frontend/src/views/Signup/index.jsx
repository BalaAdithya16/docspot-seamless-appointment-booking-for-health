import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Form, Formik } from "formik";
import { onKeyDown } from "../../utils";
import { signupSchema } from "./components/validationSchema";
import { Box, Button, Typography } from "@mui/material";
import { Heading, SubHeading } from "../../components/Heading";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import PrimaryPhoneInput from "../../components/PhoneInput";
import { useSignupMutation } from "../../redux/api/authApiSlice";
import NextWhiteLogo from "../../assets/images/nexCenterLogo.svg";
import BackgroundImage from "../../assets/images/doc.png";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const [signupUser, { isLoading }] = useSignupMutation();

  const signupHandler = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
    };
    try {
      const user = await signupUser(payload);

      if (user?.data?.status) {
        setToast({
          ...toast,
          message: "User Successfully Created",
          appearence: true,
          type: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (user?.error) {
        setToast({
          ...toast,
          message: user?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("SignUp Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            left: "-110px",
            "@media (max-width: 576px)": {
              display: "none",
            },
          }}
        >
          <img src={NextWhiteLogo} alt="logo" style={{ height: 200 }} />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            "@media (max-width: 768px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          {/* Left Side - Background Image */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative", margin: "0 auto" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#000",
                }}
              >
                <Heading
                  sx={{
                    fontSize: "45px",
                    color: "#000",
                    display: "block",
                    alignItems: "center",
                    alignSelf: "baseline",
                    justifyContent: "center",
                  }}
                />
                <SubHeading
                  sx={{
                    color: "#000",
                    display: "block",
                    alignItems: "center",
                    alignSelf: "baseline",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <Box>
                    <Link
                      to="/login"
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        textDecoration: "none",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                    />
                  </Box>
                </SubHeading>
              </Box>
            </Box>
          </Box>

          {/* Right Side - Form */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "0 100px",
                "@media (min-width: 1500px)": {
                  padding: "0 50px",
                  width: "550px",
                },
                "@media (min-width: 768px) and (max-width: 991px)": {
                  padding: "0 45px",
                },
                "@media (min-width: 576px) and (max-width: 767px)": {
                  padding: "0 50px",
                  width: "550px",
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {/* DocSpot Title */}
                <Typography
                  sx={{
                    fontSize: "32px",
                    color: "#007FFF",
                    fontWeight: "bold",
                    fontFamily: "robolics",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  DocSpot
                </Typography>

                {/* Heading */}
                <Heading
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Create an Account
                </Heading>

                {/* Formik Form */}
                <Formik
                  initialValues={formValues}
                  onSubmit={signupHandler}
                  validationSchema={signupSchema}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      handleBlur,
                      handleChange,
                    } = props;

                    return (
                      <Form onKeyDown={onKeyDown}>
                        {/* Name */}
                        <Box sx={{ marginTop: "20px", height: "95px" }}>
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Name
                          </SubHeading>
                          <PrimaryInput
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={values.name}
                            helperText={
                              errors.name && touched.name ? errors.name : ""
                            }
                            error={!!(errors.name && touched.name)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>

                        {/* Email */}
                        <Box sx={{ height: "95px" }}>
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Email
                          </SubHeading>
                          <PrimaryInput
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            helperText={
                              errors.email && touched.email ? errors.email : ""
                            }
                            error={!!(errors.email && touched.email)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>

                        {/* Mobile Number */}
                        <Box sx={{ height: "95px" }}>
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Mobile Number
                          </SubHeading>
                          <PrimaryPhoneInput
                            value={values.phoneNumber || "+91"}
                            name="phoneNumber"
                            formik={props}
                            variant="outlined"
                            label=""
                          />
                        </Box>

                        {/* Password */}
                        <Box sx={{ height: "95px" }}>
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Password
                          </SubHeading>
                          <PrimaryInput
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            helperText={
                              errors.password && touched.password
                                ? errors.password
                                : ""
                            }
                            error={!!(errors.password && touched.password)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onClick={hideShowPassword}
                            endAdornment={
                              showPassword ? (
                                <AiOutlineEye color="disabled" />
                              ) : (
                                <AiOutlineEyeInvisible color="disabled" />
                              )
                            }
                          />
                        </Box>

                        {/* Already have an account */}
                        <Box sx={{ textAlign: "center", marginTop: "15px" }}>
                          <SubHeading sx={{ color: "#000", fontSize: "14px" }}>
                            Already have an account?{" "}
                            <Link
                              to="/login"
                              style={{
                                fontWeight: "bold",
                                color: "#000",
                                textDecoration: "none",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.textDecoration =
                                  "underline")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.textDecoration = "none")
                              }
                            >
                              Login
                            </Link>
                          </SubHeading>
                        </Box>

                        {/* Submit Button */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "20px",
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
                            sx={{
                              padding: "5px 30px",
                              textTransform: "capitalize",
                              margin: "20px 0",
                            }}
                          >
                            {isLoading ? "Sign Up..." : "Sign Up"}
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default Signup;
