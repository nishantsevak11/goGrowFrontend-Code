import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { registerUser } from '../services/api';

const steps = ['Personal Information', 'Service Questions', 'Welcome'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [personalInfo, setPersonalInfo] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [serviceQuestions, setServiceQuestions] = React.useState({
    sendTime: '',
    platform: '',
    categories: '',
    AiPrompt: '',
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
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
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate('/profile');
    } catch (error) {
      alert('Login failed!');
      console.log(error);
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleServiceQuestionsChange = (e) => {
    const { name, value } = e.target;
    setServiceQuestions({ ...serviceQuestions, [name]: value });
  };

  // Add responsiveness using useMediaQuery
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className="w-full h-full">
      <Box
        sx={{
          width: '100%',
          padding: '20px',
          maxWidth: isMobile ? '100%' : '800px',
          margin: 'auto',
        }}
      >
        <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
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
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleSubmit}>Reset</Button>
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
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
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
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
            {activeStep === 1 && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="When You want to receive quotes daily"
                  variant="outlined"
                  fullWidth
                  name="sendTime"
                  value={serviceQuestions.sendTime}
                  onChange={handleServiceQuestionsChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Which platform"
                  variant="outlined"
                  fullWidth
                  name="platform"
                  value={serviceQuestions.platform}
                  onChange={handleServiceQuestionsChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Categories"
                  variant="outlined"
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
                  value={serviceQuestions.ai}
                  onChange={handleServiceQuestionsChange}
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
            {activeStep === 2 && (
              <React.Fragment>
                <Typography variant="h4" sx={{ mt: 2 }}>
                  Welcome!
                </Typography>
              </React.Fragment>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
