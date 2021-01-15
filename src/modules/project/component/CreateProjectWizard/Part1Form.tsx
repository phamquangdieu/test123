import { FormControl, FormLabel, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import lodash from "lodash";
import React, { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../../redux/reducer";
import { CustomInput } from "../../../common/component/element";
import { API, some } from "../../../common/constants";
import { fetchThunk } from "../../../common/redux/thunk";
import {
  ProjectPart1,
  ProjectPart1ValidationError,
  Developer,
} from "../../model";
import { FormHelperText } from "@material-ui/core";

interface Props {
  value: ProjectPart1;
  validation: ProjectPart1ValidationError;
  onChange: (newPart1: ProjectPart1) => void;
  updateValidation: (newValidation: ProjectPart1ValidationError) => void;
}

const Part1Form: React.FC<Props> = ({
  value,
  validation,
  updateValidation,
  onChange,
}) => {
  const dispatch: ThunkDispatch<AppState, null, Action<string>> = useDispatch();

  const [developers, setDevelopers] = useState<Developer[]>([]);

  const searchDevelopers = useMemo(
    () =>
      lodash.debounce(
        async (search: string) => {
          setSearchingDevelopers(true);
          const { content: res } = await dispatch(
            fetchThunk(API.searchDevelopers(search), {
              cancelled: false,
              data: { content: [] },
            })
          );
          setSearchingDevelopers(false);
          setDevelopers(
            value.developer
              ? res.content
                  .map((one: some) => ({
                    fullName: one.fullName,
                    shortName: one.shortName,
                  }))
                  .concat([value.developer])
              : res.content.map((one: some) => ({
                  fullName: one.fullName,
                  shortName: one.shortName,
                }))
          );
        },
        500,
        { trailing: true, leading: false }
      ),
    [dispatch, value]
  );

  const [searchingDevelopers, setSearchingDevelopers] = useState(false);
  const [defaultDeveloper] = useState(value.developer);

  return (
    <div>
      <div style={{ padding: "20px 0" }}>
        <Typography variant="subtitle2">
          <FormattedMessage id="generalInfo" />
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, paddingRight: 30 }}>
          <FormControl style={{ maxWidth: 450, marginBottom: 14 }} fullWidth>
            <FormLabel htmlFor="projectName">
              <FormattedMessage id="project.projectName" />
            </FormLabel>
            <CustomInput
              id="projectName"
              fullWidth
              value={value.name || ""}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
            />
            <FormHelperText error> </FormHelperText>
          </FormControl>
          <FormControl
            error={!!validation.commercialName}
            style={{ maxWidth: 450, marginBottom: 14 }}
            fullWidth
          >
            <FormLabel htmlFor="commercialName" required>
              <FormattedMessage id="project.commercialName" />
            </FormLabel>
            <CustomInput
              id="commercialName"
              fullWidth
              value={value.commercialName || ""}
              onChange={(e) => {
                onChange({ ...value, commercialName: e.target.value });
                updateValidation({ ...validation, commercialName: "" });
              }}
            />
            <FormHelperText error>
              {validation.commercialName ? (
                <FormattedMessage id={validation.commercialName} />
              ) : (
                " "
              )}
            </FormHelperText>
          </FormControl>

          <Autocomplete
            disableClearable
            options={developers}
            loading={searchingDevelopers}
            defaultValue={defaultDeveloper}
            filterOptions={(options) => options}
            getOptionSelected={(option, value) =>
              value && option.shortName === value.shortName
            }
            onChange={(e, newDeveloper, reason) => {
              if (reason === "select-option") {
                onChange({
                  ...value,
                  developer: newDeveloper as Developer,
                });
                updateValidation({ ...validation, developer: "" });
              }
            }}
            onInputChange={(e, value) => {
              searchDevelopers(value);
            }}
            getOptionLabel={(option) =>
              `${option.shortName} - ${option.fullName}`
            }
            filterSelectedOptions
            renderInput={(params) => (
              <FormControl
                error={!!validation.developer}
                style={{ maxWidth: 450, marginBottom: 14 }}
                fullWidth
              >
                <FormLabel htmlFor="developer" required>
                  <FormattedMessage id="project.developer" />
                </FormLabel>
                <CustomInput
                  inputRef={params.InputProps.ref}
                  inputProps={params.inputProps}
                  id="developer"
                  fullWidth
                />
                <FormHelperText error>
                  {validation.developer ? (
                    <FormattedMessage id={validation.developer} />
                  ) : (
                    " "
                  )}
                </FormHelperText>
              </FormControl>
            )}
          />
        </div>
        <div style={{ flex: 1, paddingLeft: 30 }}>
          <FormControl style={{ maxWidth: 450, marginBottom: 14 }} fullWidth>
            <FormLabel htmlFor="administrator">
              <FormattedMessage id="project.administrator" />
            </FormLabel>
            <CustomInput
              id="administrator"
              fullWidth
              value={value.administrator || ""}
              onChange={(e) => {
                onChange({ ...value, administrator: e.target.value });
              }}
            />
            <FormHelperText error> </FormHelperText>
          </FormControl>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl
              style={{ maxWidth: 250, marginBottom: 14 }}
              fullWidth
              error={!!validation.area}
            >
              <FormLabel htmlFor="area" required>
                <FormattedMessage id="area" />
              </FormLabel>
              <CustomInput
                id="area"
                fullWidth
                value={value.area || ""}
                onChange={(e) => {
                  onChange({ ...value, area: parseInt(e.target.value) });
                  updateValidation({ ...validation, area: "" });
                }}
              />
              <FormHelperText error>
                {validation.area ? (
                  <FormattedMessage id={validation.area} />
                ) : (
                  " "
                )}
              </FormHelperText>
            </FormControl>
            <div style={{ marginLeft: 20 }}>
              <Typography variant="body2">
                <FormattedMessage id="unit" />
                :&nbsp;
                <FormattedMessage id="ha" />
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part1Form;
