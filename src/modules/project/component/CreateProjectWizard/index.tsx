import {
  Button,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Theme,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  generateProject,
  generateProjectValidation,
  ProjectPart1,
  ProjectPart1ValidationError,
  ProjectPart2,
  ProjectPart2ValidationError,
} from "../../model";
import Part1Form from "../CreateProjectWizard/Part1Form";
import Part2Form from "../CreateProjectWizard/Part2Form";
import { validValidation } from "../../../common/utils";

const CustomConnector = withStyles((theme: Theme) => ({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  completed: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))(StepConnector);

function validatePart1(part1: ProjectPart1): ProjectPart1ValidationError {
  return {
    name: "",
    commercialName: part1.commercialName ? "" : "isEmpty",
    developer: part1.developer ? "" : "isEmpty",
    administrator: "",
    area: "",
  };
}

function validatePart2(part2: ProjectPart2): ProjectPart2ValidationError {
  return {
    coord: part2.coord ? "" : "isEmpty",
    city: part2.city ? "" : "isEmpty",
    district: part2.district ? "" : "isEmpty",
    ward: part2.ward ? "" : "isEmpty",
    street: part2.street ? "" : "isEmpty",
    details: "",
  };
}

interface Props {}

const CreateProjectWizard: React.FC<Props> = (prop) => {
  const [activeStep, setActiveStep] = useState(0);

  const [project, setProject] = useState(generateProject());
  const [projectValidation, setProjectValidation] = useState(
    generateProjectValidation()
  );

  const next = useCallback(async () => {
    if (activeStep === 0) {
      const validation = validatePart1(project.part1);
      setProjectValidation((old) => ({ ...old, part1: validation }));
      if (validValidation(validation)) {
        setActiveStep((old) => old + 1);
      }
    } else if (activeStep === 1) {
      const validation = validatePart2(project.part2);
      setProjectValidation((old) => ({ ...old, part2: validation }));
      if (validValidation(validation)) {
        setActiveStep((old) => old + 1);
      }
    }
  }, [activeStep, project]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Stepper
        style={{ padding: "24px 42px" }}
        activeStep={activeStep}
        connector={<CustomConnector />}
      >
        <Step>
          <StepLabel />
        </Step>
        <Step>
          <StepLabel />
        </Step>
        <Step>
          <StepLabel />
        </Step>
        <Step>
          <StepLabel />
        </Step>
      </Stepper>
      <div style={{ flex: 1, padding: "0 42px" }}>
        {activeStep === 0 ? (
          <Part1Form
            value={project.part1}
            validation={projectValidation.part1}
            onChange={(newPart1) =>
              setProject((old) => ({ ...old, part1: newPart1 }))
            }
            updateValidation={(newValidation) => {
              setProjectValidation((old) => ({ ...old, part1: newValidation }));
            }}
          />
        ) : activeStep === 1 ? (
          <Part2Form
            value={project.part2}
            validation={projectValidation.part2}
            onChange={(newPart2) =>
              setProject((old) => ({ ...old, part2: newPart2 }))
            }
            updateValidation={(newValidation) => {
              setProjectValidation((old) => ({ ...old, part2: newValidation }));
            }}
          />
        ) : (
          <></>
        )}
      </div>
      <div
        style={{
          padding: "24px 42px",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        {activeStep !== 3 ? (
          <Button variant="contained" color="primary" onClick={next}>
            <FormattedMessage id="next" />
          </Button>
        ) : (
          <Button variant="contained" color="primary">
            <FormattedMessage id="complete" />
          </Button>
        )}
        &emsp;
        <Button
          variant="outlined"
          color="primary"
          disabled={activeStep === 0}
          onClick={(e) => setActiveStep((old) => old - 1)}
        >
          <FormattedMessage id="back" />
        </Button>
        &emsp;
        <Button variant="outlined" color="primary">
          <FormattedMessage id="saveAndQuit" />
        </Button>
      </div>
    </div>
  );
};

export default CreateProjectWizard;
