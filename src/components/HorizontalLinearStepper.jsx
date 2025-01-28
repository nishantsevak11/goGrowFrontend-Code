import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { registerUser } from "../services/api";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Welcome from "./Welcome";

const steps = ["Personal Information", "Service Questions"]; 

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [personalInfo, setPersonalInfo] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [serviceQuestions, setServiceQuestions] = React.useState({
    sendTime: "",
    platform: "",
    categories: "",
    AiPrompt: "",
  });

  const [errors, setErrors] = React.useState({});

  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "name":
        if (!value) errorMsg = "Name is required";
        else if (value.length < 3)
          errorMsg = "Name must be at least 3 characters";
        break;
      case "email":
        if (!value) errorMsg = "Email is required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          errorMsg = "Invalid email format";
        break;
      case "password":
        if (!value) errorMsg = "Password is required";
        else if (value.length < 6)
          errorMsg = "Password must be at least 6 characters";
        break;
      default:
        break;
    }
    return errorMsg;
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    // Validate all fields before proceeding
    const newErrors = {};
    Object.keys(personalInfo).forEach((key) => {
      const errorMsg = validateField(key, personalInfo[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(
        personalInfo.name,
        personalInfo.email,
        personalInfo.password,
        serviceQuestions.sendTime,
        serviceQuestions.platform,
        serviceQuestions.categories,
        serviceQuestions.AiPrompt
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      alert("Register successful!");
      // navigate("/profile");
      window.location.href = "/profile";
    } catch (error) {
      alert("Register failed!");
      window.location.href = "/register";
      console.log(error);
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });

    // Validate the field on change
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleServiceQuestionsChange = (e) => {
    const { name, value } = e.target;
    setServiceQuestions({ ...serviceQuestions, [name]: value });
  };

  // Add responsiveness using useMediaQuery
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="w-full h-full">
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          maxWidth: isMobile ? "100%" : "800px",
          margin: "auto",
        }}
      >
        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? "vertical" : "horizontal"}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Welcome name={personalInfo.name} handleSubmit={handleSubmit}/>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleSubmit}>Finish</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  type="password"
                  value={personalInfo.password}
                  onChange={handlePersonalInfoChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
            {activeStep === 1 && (
              <Box sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Preferred Time"
                    value={
                      serviceQuestions.sendTime
                        ? dayjs(serviceQuestions.sendTime)
                        : null
                    }
                    onChange={(newValue) =>
                      setServiceQuestions({
                        ...serviceQuestions,
                        sendTime: newValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                      />
                    )}
                    ampm // Enables AM/PM format
                  />
                </LocalizationProvider>

                <TextField
                  label="Which platform - Coming Soon"
                  variant="outlined"
                  fullWidth
                  disabled
                  name="platform"
                  value={serviceQuestions.platform}
                  onChange={handleServiceQuestionsChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Categories - Coming Soon"
                  variant="outlined"
                  disabled
                  fullWidth
                  name="categories"
                  value={serviceQuestions.categories}
                  onChange={handleServiceQuestionsChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Can you add some msg for AI for personalized message"
                  variant="outlined"
                  fullWidth
                  name="AiPrompt"
                  value={serviceQuestions.AiPrompt}
                  onChange={handleServiceQuestionsChange}
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
