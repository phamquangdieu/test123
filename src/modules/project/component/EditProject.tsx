import {
  Button,
  CircularProgress,
  Step,
  StepButton,
  Stepper
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import ErrorDialog from "../../common/component/ErrorDialog";
import { API } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import {
  convertProjectFromAPIModel,
  convertProjectToAPIModel,
  generateProjectValidation,
  Project
} from "../model";
import { CustomBackdrop } from "./../../common/component/element";
import {
  CustomConnector,
  validatePart1,
  validatePart2,
  validatePart3,
  validatePart4
} from "./CreateProjectWizard";
import Part1Form from "./CreateProjectWizard/Part1Form";
import Part2Form from "./CreateProjectWizard/Part2Form";
import Part3Form from "./CreateProjectWizard/Part3Form";
import Part4Form from "./CreateProjectWizard/Part4Form";

interface Props {
  id: string;
}

const EditProject: React.FC<Props> = ({ id }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [project, setProject] = useState<Project | null>(null);
  const [projectValidation, setProjectValidation] = useState(
    generateProjectValidation()
  );

  const dispatch: ThunkDispatch<AppState, null, Action<string>> = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await dispatch(
        fetchThunk(API.getProject(id), undefined, "get")
      );
      if (res.status === 200) {
        const convertedProject = convertProjectFromAPIModel(res.content);
        setProject(convertedProject);
      }
    })();
  }, [id, dispatch]);

  const [savingToServer, setSavingToServer] = useState(false);

  const part3OnUtilityChange = useCallback(
    (value) =>
      setProject((old) =>
        old
          ? {
              ...old,
              part3: { ...old.part3, utilities: value },
            }
          : null
      ),
    []
  );

  const part3OnPropertyChange = useCallback(
    (value) =>
      setProject((old) =>
        old
          ? {
              ...old,
              part3: { ...old.part3, propertyTypes: value },
            }
          : null
      ),
    []
  );

  const [showEditingErrorDialog, setShowEditingErrorDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

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
        nonLinear
      >
        <Step>
          <StepButton onClick={() => setActiveStep(0)} />
        </Step>
        <Step>
          <StepButton onClick={() => setActiveStep(1)} />
        </Step>
        <Step>
          <StepButton onClick={() => setActiveStep(2)} />
        </Step>
        <Step>
          <StepButton onClick={() => setActiveStep(3)} />
        </Step>
      </Stepper>
      <div style={{ flex: 1, padding: "0 42px" }}>
        {project === null ? (
          <div
            style={{
              flex: 1,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : activeStep === 0 ? (
          <Part1Form
            value={project.part1}
            validation={projectValidation.part1}
            onChange={(newPart1) =>
              setProject((old) => (old ? { ...old, part1: newPart1 } : null))
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
              setProject((old) => (old ? { ...old, part2: newPart2 } : null))
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
              setProject((old) => (old ? { ...old, part4: newPart4 } : null))
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
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            if (project) {
              setSavingToServer(true);
              const res = await dispatch(
                fetchThunk(
                  API.editProject(id),
                  undefined,
                  "put",
                  JSON.stringify(convertProjectToAPIModel(project))
                )
              );
              if (res.status !== 200) {
                setShowEditingErrorDialog(true);
                const validation = {
                  part1: validatePart1(project.part1),
                  part2: validatePart2(project.part2),
                  part3: validatePart3(project.part3),
                  part4: validatePart4(project.part4),
                };
                setProjectValidation(validation);
              } else {
                enqueueSnackbar(
                  <FormattedMessage id="project.savingSucceeds" />,
                  {
                    variant: "success",
                    anchorOrigin: { horizontal: "right", vertical: "top" },
                  }
                );
              }
              setSavingToServer(false);
            }
          }}
        >
          <FormattedMessage id="save" />
        </Button>
      </div>
      <ErrorDialog
        msgId="project.editingErrorMsg"
        show={showEditingErrorDialog}
        close={() => {
          setShowEditingErrorDialog(false);
        }}
      />
      <CustomBackdrop open={savingToServer} style={{ color: "white" }}>
        <CircularProgress color="inherit" />
      </CustomBackdrop>
    </div>
  );
};

export default EditProject;
