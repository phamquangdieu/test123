import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../../redux/reducer";
import {
  ProjectPart3,
  ProjectPart3ValidationError,
  PropertyTypeData,
  UtilityTypeData,
} from "../../model";
import { loadProjectMetadata } from "../../redux/projectReducer";
import PropertyType from "./PropertyType";
interface Props extends ReturnType<typeof mapStateToProp> {
  value: ProjectPart3;
  validation: ProjectPart3ValidationError;
  onUtilityChange: (newUtility: UtilityTypeData[]) => void;
  onPropertyTypeChange: (propertiesData: PropertyTypeData[]) => void;
  updateValidation: (newValidation: ProjectPart3ValidationError) => void;
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

interface PropertyTypesData {
  [code: string]: PropertyTypeData;
}

interface UtilitiesData {
  [code: string]: UtilityTypeData;
}

const Part3Form: React.FC<Props> = ({
  value,
  validation,
  onUtilityChange,
  onPropertyTypeChange,
  updateValidation,
  propertyTypes,
  utilityTypes,
  dispatch,
}) => {
  useEffect(() => {
    if (propertyTypes.length === 0 && utilityTypes.length === 0) {
      dispatch(loadProjectMetadata());
    }
  }, [propertyTypes, utilityTypes, dispatch]);

  const [propertyTypesData, setPropertyTypesData] = useState<PropertyTypesData>(
    {}
  );
  const [utilitiesData, setUtilitiesData] = useState<UtilitiesData>({});
  const [
    { mergedUtilityFromValue, mergedPropertyTypeFromValue },
    setMergedFromValue,
  ] = useState({
    mergedUtilityFromValue: false,
    mergedPropertyTypeFromValue: false,
  });

  useEffect(() => {
    if (propertyTypes.length !== 0) {
      if (!mergedPropertyTypeFromValue) {
        const data: PropertyTypesData = {};
        for (const type of propertyTypes) {
          const recordFromValue = value.propertyTypes.find(
            (one) => one.code === type.code
          );
          if (!recordFromValue) {
            data[type.code] = { code: type.code, quantity: 0, exist: false };
          } else {
            data[type.code] = recordFromValue;
          }
        }
        setPropertyTypesData(data);
        setMergedFromValue((old) => ({
          ...old,
          mergedPropertyTypeFromValue: true,
        }));
      }
    }
    if (utilityTypes.length !== 0) {
      if (!mergedUtilityFromValue) {
        const data: UtilitiesData = {};
        for (const type of utilityTypes) {
          const recordFromValue = value.utilities.find(
            (one) => one.code === type.code
          );
          if (!recordFromValue) {
            data[type.code] = {
              code: type.code,
              text: type.text,
              exist: false,
            };
          } else {
            data[type.code] = recordFromValue;
          }
        }
        setUtilitiesData(data);
        setMergedFromValue((old) => ({ ...old, mergedUtilityFromValue: true }));
      }
    }
  }, [
    propertyTypes,
    utilityTypes,
    value,
    mergedPropertyTypeFromValue,
    mergedUtilityFromValue,
  ]);

  useEffect(() => {
    onUtilityChange(Object.values(utilitiesData).filter((one) => one.exist));
  }, [utilitiesData, onUtilityChange]);

  useEffect(() => {
    onPropertyTypeChange(
      Object.values(propertyTypesData).filter((one) => one.exist)
    );
  }, [propertyTypesData, onPropertyTypeChange]);

  if (propertyTypes.length === 0 && utilityTypes.length === 0) {
    return (
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
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, paddingRight: 30, maxWidth: "50%" }}>
        <div>
          <Typography variant="subtitle2">
            <FormattedMessage id="project.detailInfo" />
          </Typography>
          <div style={{ padding: "15px 0" }}>
            <Typography variant="body2">
              <FormattedMessage id="project.propertyTypes" />
            </Typography>
            <FormHelperText error>
              {validation.propertyTypes ? (
                <FormattedMessage id={validation.propertyTypes} />
              ) : (
                " "
              )}
            </FormHelperText>
          </div>
        </div>
        <div>
          {propertyTypes.map((type) => (
            <PropertyType
              key={type.code}
              name={type.text}
              checked={propertyTypesData[type.code]?.exist || false}
              quantity={propertyTypesData[type.code]?.quantity || 0}
              setQuantity={(value) => {
                setPropertyTypesData((old) => {
                  const record = old[type.code];
                  const newRecord = { ...record, quantity: value };
                  const newData = { ...old, [type.code]: newRecord };
                  return newData;
                });
              }}
              check={(checked) => {
                setPropertyTypesData((old) => {
                  const record = old[type.code];
                  const newRecord = { ...record, exist: checked };
                  const newData = { ...old, [type.code]: newRecord };
                  return newData;
                });
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          paddingLeft: 30,
          maxWidth: "50%",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <Typography variant="subtitle2">
            <FormattedMessage id="project.projectUtilities" />
          </Typography>
          <FormHelperText error>
            {validation.utilities ? (
              <FormattedMessage id={validation.utilities} />
            ) : (
              " "
            )}
          </FormHelperText>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {utilityTypes.map((type) => (
            <FormControlLabel
              style={{ minWidth: "40%", boxSizing: "border-box" }}
              key={type.code}
              label={type.text}
              control={
                <Checkbox
                  size="small"
                  checked={utilitiesData[type.code]?.exist || false}
                  onChange={(e, checked) => {
                    setUtilitiesData((old) => {
                      const record = old[type.code];
                      const newRecord = { ...record, exist: checked };
                      return { ...old, [type.code]: newRecord };
                    });
                  }}
                />
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function mapStateToProp(state: AppState) {
  return {
    propertyTypes: state.project.projectMetadata.propertyTypes,
    utilityTypes: state.project.projectMetadata.utilityTypes,
  };
}

export default connect(mapStateToProp)(Part3Form);
