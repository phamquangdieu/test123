import {
  Button,
  CircularProgress,
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
  convertProjectToAPIModel,
  generateProject,
  generateProjectValidation,
  ProjectPart1,
  ProjectPart1ValidationError,
  ProjectPart2,
  ProjectPart2ValidationError,
  ProjectPart3,
  ProjectPart3ValidationError,
  ProjectPart4,
  ProjectPart4ValidationError,
} from "../../model";
import Part1Form from "../CreateProjectWizard/Part1Form";
import Part2Form from "../CreateProjectWizard/Part2Form";
import Part3Form from "../CreateProjectWizard/Part3Form";
import Part4Form from "../CreateProjectWizard/Part4Form";
import { validValidation } from "../../../common/utils";
import { CustomBackdrop } from "../../../common/component/element";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../../redux/reducer";
import { Action } from "redux";
import { useDispatch } from "react-redux";
import { fetchThunk } from "../../../common/redux/thunk";
import { API } from "../../../common/constants";
import { replace } from "connected-react-router";
import { ROUTES } from "../../../common/constants";
import ErrorDialog from "../../../common/component/ErrorDialog";
import { useSnackbar } from "notistack";

export const CustomConnector = withStyles((theme: Theme) => ({
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

export function validatePart1(part1: ProjectPart1): ProjectPart1ValidationError {
  return {
    name: "",
    commercialName: part1.commercialName ? "" : "validation.beingEmpty",
    developer: part1.developer ? "" : "validation.beingEmpty",
    administrator: "",
    area: part1.area !== undefined ? "" : "validation.beingEmpty",
  };
}

export function validatePart2(part2: ProjectPart2): ProjectPart2ValidationError {
  return {
    coord: part2.coord ? "" : "validation.beingEmpty",
    city: part2.city ? "" : "validation.beingEmpty",
    district: part2.district ? "" : "validation.beingEmpty",
    ward: part2.ward ? "" : "validation.beingEmpty",
    street: part2.street ? "" : "validation.beingEmpty",
    details: part2.details
      ? part2.details.length > 50
        ? "validation.max50character"
        : ""
      : "validation.beingEmpty",
  };
}

export function validatePart3(part3: ProjectPart3): ProjectPart3ValidationError {
  return {
    propertyTypes:
      part3.propertyTypes.length > 0 ? "" : "validation.beingEmpty",
    utilities: part3.utilities.length > 0 ? "" : "validation.beingEmpty",
  };
}

export function validatePart4(part4: ProjectPart4): ProjectPart4ValidationError {
  return {
    mainImage: part4.mainImage ? "" : "validation.beingEmpty",
    overviewImages:
      part4.overviewImages.length > 0
        ? part4.overviewImages.findIndex((one) => !one.note) >= 0
          ? "validation.beingEmpty"
          : ""
        : "validation.beingEmpty",
    projectImages:
      part4.projectImages.length > 0
        ? part4.projectImages.findIndex((one) => !one.note) >= 0
          ? "validation.beingEmpty"
          : ""
        : "validation.beingEmpty",
  };
}

interface Props {}

const CreateProjectWizard: React.FC<Props> = (prop) => {
  const [activeStep, setActiveStep] = useState(0);

  const [project, setProject] = useState(generateProject());
  const [projectValidation, setProjectValidation] = useState(
    generateProjectValidation()
  );

  const [savingToServer, setSavingToServer] = useState(false);

  const dispatch: ThunkDispatch<AppState, null, Action<string>> = useDispatch();

  const [showCreationErrorDialog, setShowCreationErrorDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const next = useCallback(async () => {
    if (activeStep === 0) {
      const validation = validatePart1(project.part1);
      setProjectValidation((old) => ({ ...old, part1: validation }));
      if (validValidation(validation)) {
        const { status: resStatus } = await dispatch(
          fetchThunk(
            API.verifyBasicProjectInfo,
            undefined,
            "post",
            JSON.stringify(convertProjectToAPIModel(project))
          )
        );
        if (resStatus === 200) {
          setActiveStep((old) => old + 1);
        } else {
          setProjectValidation((old) => ({
            ...old,
            part1: {
              ...validation,
              developer: "validation.project.nameDeveloperDuplicate",
            },
          }));
        }
      }
    } else if (activeStep === 1) {
      const validation = validatePart2(project.part2);
      setProjectValidation((old) => ({ ...old, part2: validation }));
      if (validValidation(validation)) {
        setActiveStep((old) => old + 1);
      }
    } else if (activeStep === 2) {
      const validation = validatePart3(project.part3);
      setProjectValidation((old) => ({ ...old, part3: validation }));
      if (validValidation(validation)) {
        setActiveStep((old) => old + 1);
      }
    } else if (activeStep === 3) {
      const validation = validatePart4(project.part4);
      setProjectValidation((old) => ({ ...old, part4: validation }));
      if (validValidation(validation)) {
        setSavingToServer(true);
        const res = await dispatch(
          fetchThunk(
            API.createProject,
            undefined,
            "post",
            JSON.stringify(convertProjectToAPIModel(project))
          )
        );
        setSavingToServer(false);
        if (res.status !== 200) {
          setShowCreationErrorDialog(true);
        } else {
          enqueueSnackbar(
            <FormattedMessage id="project.creatingSucceeds" />,
            {
              variant: "success",
              anchorOrigin: { horizontal: "right", vertical: "top" },
            }
          );
          dispatch(replace(ROUTES.projectListing));
        }
      }
    }
  }, [activeStep, project, dispatch, enqueueSnackbar]);

  const part3OnUtilityChange = useCallback(
    (value) =>
      setProject((old) => ({
        ...old,
        part3: { ...old.part3, utilities: value },
      })),
    []
  );

  const part3OnPropertyChange = useCallback(
    (value) =>
      setProject((old) => ({
        ...old,
        part3: { ...old.part3, propertyTypes: value },
      })),
    []
  );

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
        ) : activeStep === 2 ? (
          <Part3Form
            value={project.part3}
            validation={projectValidation.part3}
            onPropertyTypeChange={part3OnPropertyChange}
            onUtilityChange={part3OnUtilityChange}
            updateValidation={(newValidation) => {
              setProjectValidation((old) => ({ ...old, part3: newValidation }));
            }}
          />
        ) : activeStep === 3 ? (
          <Part4Form
            value={project.part4}
            validation={projectValidation.part4}
            onChange={(newPart4) =>
              setProject((old) => ({ ...old, part4: newPart4 }))
            }
            updateValidation={(newValidation) => {
              setProjectValidation((old) => ({ ...old, part4: newValidation }));
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
          <Button variant="contained" color="primary" onClick={next}>
            <FormattedMessage id="create" />
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
        <Button
          variant="outlined"
          color="primary"
          onClick={async (e) => {
            setSavingToServer(true);
            const { content: res } = await dispatch(
              fetchThunk(
                API.saveDraftProject,
                { cancelled: false, data: {} },
                "post",
                JSON.stringify(convertProjectToAPIModel(project))
              )
            );
            setSavingToServer(false);
            if (res.id) {
              dispatch(replace(ROUTES.projectListing));
            }
          }}
        >
          <FormattedMessage id="saveAndQuit" />
        </Button>
      </div>
      <ErrorDialog
        msgId="project.creationErrorMsg"
        show={showCreationErrorDialog}
        close={() => {
          setShowCreationErrorDialog(false);
          dispatch(replace(ROUTES.projectListing));
        }}
      />
      <CustomBackdrop open={savingToServer} style={{ color: "white" }}>
        <CircularProgress color="inherit" />
      </CustomBackdrop>
    </div>
  );
};

export default CreateProjectWizard;
