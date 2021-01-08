import {
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { CustomInput } from "../../../common/component/element";
import {
  Location,
  ProjectPart2,
  ProjectPart2ValidationError,
} from "../../model";

interface Props {
  value: ProjectPart2;
  validation: ProjectPart2ValidationError;
  onChange: (newPart1: ProjectPart2) => void;
  updateValidation: (newValidation: ProjectPart2ValidationError) => void;
}

const Part2Form: React.FC<Props> = ({
  value,
  validation,
  onChange,
  updateValidation,
}) => {
  const [locations, setLocation] = useState<Location[]>([
    { lat: 0, lon: 0, text: "Test" },
  ]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, paddingRight: 30 }}>
        <Autocomplete
          freeSolo
          disableClearable
          options={locations}
          value={value.coord || ""}
          onChange={(e, newCoord) => {
            onChange({
              ...value,
              coord: newCoord as Location,
            });
            updateValidation({ ...validation, coord: "" });
          }}
          getOptionLabel={(option) =>
            typeof option === "string" ? "" : `${option.text}`
          }
          renderInput={(params) => (
            <FormControl
              error={!!validation.coord}
              style={{ maxWidth: 450, marginBottom: 14 }}
              fullWidth
            >
              <FormLabel htmlFor="coord" required>
                <Typography
                  variant="subtitle2"
                  style={{ display: "inline", color: "inherit" }}
                >
                  <FormattedMessage id="location" />
                </Typography>
              </FormLabel>
              <CustomInput
                inputRef={params.InputProps.ref}
                inputProps={params.inputProps}
                id="coord"
                type="search"
                fullWidth
                onChange={(e) => {}}
              />
              <FormHelperText error>
                {validation.coord ? (
                  <FormattedMessage id="validation.beingEmpty" />
                ) : (
                  " "
                )}
              </FormHelperText>
              <FormHelperText error> </FormHelperText>
            </FormControl>
          )}
        />
      </div>
      <div style={{ flex: 1, paddingLeft: 30 }}>
        <FormControl
          error={!!validation.city}
          style={{ maxWidth: 450, marginBottom: 14 }}
          fullWidth
        >
          <FormLabel htmlFor="city" required>
            <FormattedMessage id="provinceCity" />
          </FormLabel>
          <CustomInput
            id="city"
            fullWidth
            value={value.city || ""}
            onChange={(e) => {
              onChange({ ...value, city: e.target.value });
              updateValidation({ ...validation, city: "" });
            }}
          />
          <FormHelperText error>
            {validation.city ? (
              <FormattedMessage id="validation.beingEmpty" />
            ) : (
              " "
            )}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={!!validation.district}
          style={{ maxWidth: 450, marginBottom: 14 }}
          fullWidth
        >
          <FormLabel htmlFor="district" required>
            <FormattedMessage id="district" />
          </FormLabel>
          <CustomInput
            id="district"
            fullWidth
            value={value.district || ""}
            onChange={(e) => {
              onChange({ ...value, district: e.target.value });
              updateValidation({ ...validation, district: "" });
            }}
          />
          <FormHelperText error>
            {validation.district ? (
              <FormattedMessage id="validation.beingEmpty" />
            ) : (
              " "
            )}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={!!validation.ward}
          style={{ maxWidth: 450, marginBottom: 14 }}
          fullWidth
        >
          <FormLabel htmlFor="ward" required>
            <FormattedMessage id="ward" />
          </FormLabel>
          <CustomInput
            id="ward"
            fullWidth
            value={value.ward || ""}
            onChange={(e) => {
              onChange({ ...value, ward: e.target.value });
              updateValidation({ ...validation, ward: "" });
            }}
          />
          <FormHelperText error>
            {validation.ward ? (
              <FormattedMessage id="validation.beingEmpty" />
            ) : (
              " "
            )}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={!!validation.street}
          style={{ maxWidth: 450, marginBottom: 14 }}
          fullWidth
        >
          <FormLabel htmlFor="street" required>
            <FormattedMessage id="street" />
          </FormLabel>
          <CustomInput
            id="street"
            fullWidth
            value={value.street || ""}
            onChange={(e) => {
              onChange({ ...value, street: e.target.value });
              updateValidation({ ...validation, street: "" });
            }}
          />
          <FormHelperText error>
            {validation.street ? (
              <FormattedMessage id="validation.beingEmpty" />
            ) : (
              " "
            )}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={!!validation.details}
          style={{ maxWidth: 450, marginBottom: 14 }}
          fullWidth
        >
          <FormLabel htmlFor="details">
            <FormattedMessage id="detailAddress" />
          </FormLabel>
          <CustomInput
            id="details"
            fullWidth
            value={value.details || ""}
            onChange={(e) => {
              onChange({ ...value, details: e.target.value });
              updateValidation({ ...validation, details: "" });
            }}
          />
          <FormHelperText error>
            {validation.details ? (
              <FormattedMessage id="validation.beingEmpty" />
            ) : (
              " "
            )}
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};

export default Part2Form;
