import { Button, CircularProgress, IconButton } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUploadOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { CLOUDY_BLUE, RED } from "../../../../colors";
import { AppState } from "../../../../redux/reducer";
import ConfirmDialog from "../../../common/component/ConfirmDialog";
import { CustomBackdrop, CustomInput } from "../../../common/component/element";
import { API, MediaHost } from "../../../common/constants";
import { fetchThunk } from "../../../common/redux/thunk";
import { ProjectImage } from "../../model";

interface Props {
  images: ProjectImage[];
  max: number;
  update(newImages: ProjectImage[]): void;
  disableDesc?: boolean;
}

const IMAGE_WIDTH = 150;
const IMAGE_HEIGH = 100;
const IMAGE_BORDER = `1px solid ${CLOUDY_BLUE}`;

const useStyles = makeStyles({
  roundAndFit: {
    borderRadius: 3,
    boxSizing: "border-box",
    height: IMAGE_HEIGH,
    width: IMAGE_WIDTH,
    border: IMAGE_BORDER,
  },
  wrapper: {
    width: IMAGE_WIDTH,
    marginRight: 10,
    marginTop: 25,
    marginBottom: 30,
  },
});

const ImagesListing: React.FC<Props> = ({
  images,
  update,
  disableDesc,
  max,
}) => {
  const intl = useIntl();
  const dispatch: ThunkDispatch<AppState, null, Action<string>> = useDispatch();

  const classes = useStyles();

  const [uploading, setUploading] = useState(false);
  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const { content: res } = await dispatch(
        fetchThunk(
          API.uploadImages,
          { cancelled: false, data: {} },
          "post",
          formData,
          "multipart/form-data"
        )
      );
      setUploading(false);

      if (res.path) {
        const newImage: ProjectImage = {
          note: "",
          url: MediaHost + "/media-service/api/v1/images/" + res.iod,
        };
        update([...images, newImage]);
      }
    },
    [update, images, dispatch]
  );

  const [confirmDialogResolve, setResolve] = useState<{
    resolve?: (result: boolean) => void;
  }>({});

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {images.map((one, i) => (
        <div
          className={`${classes.wrapper}`}
          key={one.url}
          style={{
            position: "relative",
          }}
        >
          <img
            className={`${classes.roundAndFit}`}
            src={one.url}
            alt={one.note}
            style={{
              objectFit: "cover",
              display: "block",
            }}
          />
          <IconButton
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: "rgba(0,0,0,0.3)",
              color: "white",
            }}
            size="small"
            onClick={async () => {
              const confirm = await new Promise((r) =>
                setResolve({ resolve: r })
              );
              setResolve({});
              if (confirm) {
                update(images.filter((one, oneIndex) => i !== oneIndex));
              }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          {!disableDesc && (
            <div style={{ padding: "15px 0" }}>
              <CustomInput
                fullWidth
                placeholder={intl.formatMessage({
                  id: "project.addNoteForImage",
                })}
                inputProps={{
                  style: {
                    fontSize: "11px",
                    borderColor: !one.note ? RED : undefined,
                  },
                }}
                value={one.note}
                onChange={(e) => {
                  const newImages = images.slice();
                  newImages[i] = { ...images[i], note: e.target.value };
                  update(newImages);
                }}
              />
            </div>
          )}
        </div>
      ))}
      {images.length < max && (
        <div className={`${classes.wrapper}`}>
          <Button
            className={`${classes.roundAndFit}`}
            fullWidth
            component="label"
          >
            <input
              accept="image/*"
              hidden
              type="file"
              id="upload-image-input"
              onChange={(e) => {
                if (e.target.files) {
                  upload(e.target.files[0]);
                }
              }}
            ></input>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <CloudUploadIcon color="primary" fontSize="small" />
              </div>
              <div>
                <FormattedMessage id="project.uploadImage" />
              </div>
            </div>
          </Button>
          {!disableDesc && (
            <div style={{ padding: "15px 0" }}>
              <CustomInput
                inputProps={{ style: { fontSize: "11px" } }}
                fullWidth
                value={intl.formatMessage({ id: "project.addNoteForImage" })}
                disabled
              />
            </div>
          )}
          <CustomBackdrop open={uploading} style={{ color: "white" }}>
            <CircularProgress color="inherit" />
          </CustomBackdrop>
        </div>
      )}
      <ConfirmDialog
        resolve={confirmDialogResolve.resolve}
        msgId="sureToDelete"
      />
    </div>
  );
};

export default ImagesListing;
