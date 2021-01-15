import {
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import lodash from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../../redux/reducer";
import { CustomInput } from "../../../common/component/element";
import { API, GOOGLE_MAP_API_KEY, some } from "../../../common/constants";
import { District, Ward } from "../../../common/model";
import { loadAllProvinces } from "../../../common/redux/commonReducer";
import { fetchThunk } from "../../../common/redux/thunk";
import {
  Location,
  ProjectPart2,
  ProjectPart2ValidationError,
} from "../../model";
interface Props extends ReturnType<typeof mapStateToProps> {
  value: ProjectPart2;
  validation: ProjectPart2ValidationError;
  onChange: (newPart2: ProjectPart2) => void;
  updateValidation: (newValidation: ProjectPart2ValidationError) => void;
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const containerStyle = {
  width: 440,
  height: 250,
};

const Part2Form: React.FC<Props> = ({
  value,
  validation,
  onChange,
  updateValidation,
  allProvinces,
  dispatch,
}) => {
  const [locations, setLocations] = useState<Location[]>(
    value.coord ? [value.coord] : []
  );

  const { isLoaded: isGoogleMapJSLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    if (allProvinces.length === 0) {
      dispatch(loadAllProvinces());
    }
  }, [allProvinces, dispatch]);

  const [defaultLocation] = useState(value.coord);
  const [defaultProvince] = useState(value.city);
  const [defaultDistrict] = useState(value.district);
  const [defaultWard] = useState(value.ward);

  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const searchDistricts = useMemo(
    () =>
      lodash.debounce(
        async (provinceCode: string) => {
          const { content: res } = await dispatch(
            fetchThunk(API.searchDistricts(provinceCode), {
              cancelled: false,
              data: [],
            })
          );
          setDistricts(
            value.district
              ? res
                  .map((one: some) => ({
                    code: one.code,
                    name: one.name,
                  }))
                  .concat([value.district])
              : res.map((one: some) => ({
                  code: one.code,
                  name: one.name,
                }))
          );
        },
        500,
        { trailing: true, leading: false }
      ),
    [dispatch, value]
  );

  const searchWards = useMemo(
    () =>
      lodash.debounce(
        async (districtCode: string) => {
          const { content: res } = await dispatch(
            fetchThunk(API.searchWards(districtCode), {
              cancelled: false,
              data: [],
            })
          );
          setWards(
            value.ward
              ? res
                  .map((one: some) => ({
                    code: one.code,
                    name: one.name,
                  }))
                  .concat([value.ward])
              : res.map((one: some) => ({
                  code: one.code,
                  name: one.name,
                }))
          );
        },
        500,
        { trailing: true, leading: false }
      ),
    [dispatch, value]
  );

  const [center, setCenter] = useState({ lat: 21.009, lng: 105.837 });

  const geoCode = useMemo(
    () =>
      lodash.debounce(
        (search: string) => {
          if (!isGoogleMapJSLoaded) {
            return;
          }
          const geoCoder = new (window as any).google.maps.Geocoder();
          geoCoder.geocode({ address: search }, (results: any, status: any) => {
            if (status === "OK") {
              setLocations(
                value.coord
                  ? results
                      .map((one: any) => ({
                        text: one.formatted_address,
                        lat: one.geometry.location.lat(),
                        lng: one.geometry.location.lng(),
                      }))
                      .concat([value.coord])
                  : results.map((one: any) => ({
                      text: one.formatted_address,
                      lat: one.geometry.location.lat(),
                      lng: one.geometry.location.lng(),
                    }))
              );
            }
          });
        },
        500,
        { trailing: true, leading: false }
      ),
    [isGoogleMapJSLoaded, value]
  );

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, paddingRight: 30 }}>
        <Autocomplete
          disableClearable
          options={locations}
          filterOptions={(options) => options}
          defaultValue={defaultLocation}
          onChange={(e, newCoord) => {
            onChange({
              ...value,
              coord: newCoord as Location,
            });
            setCenter({ lat: newCoord.lat, lng: newCoord.lng });
            updateValidation({ ...validation, coord: "" });
          }}
          getOptionLabel={(option) =>
            typeof option === "string" ? "" : `${option.text}`
          }
          getOptionSelected={(option, value) => option.text === value.text}
          onInputChange={(e, str) => {
            geoCode(str);
          }}
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
              <div style={{ margin: "17px 0" }}>
                {isGoogleMapJSLoaded ? (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={!!value.coord ? 14 : 4}
                    center={center}
                  >
                    {value.coord &&
                    value.coord.lat !== undefined &&
                    value.coord.lng !== undefined ? (
                      <Marker
                        key={value.coord.text}
                        position={{
                          lat: value.coord.lat,
                          lng: value.coord.lng,
                        }}
                      ></Marker>
                    ) : (
                      <></>
                    )}
                  </GoogleMap>
                ) : (
                  <></>
                )}
              </div>
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
                  <FormattedMessage id={validation.coord} />
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
        <Autocomplete
          disableClearable
          options={allProvinces}
          loading={allProvinces.length === 0}
          defaultValue={defaultProvince}
          getOptionSelected={(option, value) =>
            value && option.name === value.name
          }
          onChange={(e, province, reason) => {
            if (reason === "select-option") {
              onChange({
                ...value,
                city: province,
              });
              searchDistricts(province.code);
              updateValidation({ ...validation, city: "" });
            }
          }}
          filterSelectedOptions
          getOptionLabel={(option) => `${option.name}`}
          renderInput={(params) => (
            <FormControl
              error={!!validation.city}
              style={{ maxWidth: 450, marginBottom: 14 }}
              fullWidth
            >
              <FormLabel htmlFor="province" required>
                <FormattedMessage id="provinceCity" />
              </FormLabel>
              <CustomInput
                inputRef={params.InputProps.ref}
                inputProps={params.inputProps}
                id="province"
                fullWidth
              />
              <FormHelperText error>
                {validation.city ? (
                  <FormattedMessage id={validation.city} />
                ) : (
                  " "
                )}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Autocomplete
          disableClearable
          options={districts}
          defaultValue={defaultDistrict}
          getOptionSelected={(option, value) =>
            value && option.name === value.name
          }
          onChange={(e, district, reason) => {
            if (reason === "select-option") {
              onChange({
                ...value,
                district,
              });
              searchWards(district.code);
              updateValidation({ ...validation, district: "" });
            }
          }}
          filterSelectedOptions
          getOptionLabel={(option) => `${option.name}`}
          renderInput={(params) => (
            <FormControl
              error={!!validation.district}
              style={{ maxWidth: 450, marginBottom: 14 }}
              fullWidth
            >
              <FormLabel htmlFor="district" required>
                <FormattedMessage id="district" />
              </FormLabel>
              <CustomInput
                inputRef={params.InputProps.ref}
                inputProps={params.inputProps}
                id="district"
                fullWidth
              />
              <FormHelperText error>
                {validation.district ? (
                  <FormattedMessage id={validation.district} />
                ) : (
                  " "
                )}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Autocomplete
          disableClearable
          options={wards}
          defaultValue={defaultWard}
          getOptionSelected={(option, value) =>
            value && option.name === value.name
          }
          onChange={(e, ward, reason) => {
            if (reason === "select-option") {
              onChange({
                ...value,
                ward: ward,
              });
              updateValidation({ ...validation, ward: "" });
            }
          }}
          filterSelectedOptions
          getOptionLabel={(option) => `${option.name}`}
          renderInput={(params) => (
            <FormControl
              error={!!validation.ward}
              style={{ maxWidth: 450, marginBottom: 14 }}
              fullWidth
            >
              <FormLabel htmlFor="ward" required>
                <FormattedMessage id="ward" />
              </FormLabel>
              <CustomInput
                inputRef={params.InputProps.ref}
                inputProps={params.inputProps}
                id="ward"
                fullWidth
              />
              <FormHelperText error>
                {validation.ward ? (
                  <FormattedMessage id={validation.ward} />
                ) : (
                  " "
                )}
              </FormHelperText>
            </FormControl>
          )}
        />
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
              <FormattedMessage id={validation.street} />
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
          <FormLabel htmlFor="details" required>
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
              <FormattedMessage id={validation.details} />
            ) : (
              " "
            )}
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};

function mapStateToProps(state: AppState) {
  return { allProvinces: state.common.metadata.allProvinces };
}

export default connect(mapStateToProps)(Part2Form);
