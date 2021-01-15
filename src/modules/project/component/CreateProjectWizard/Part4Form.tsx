import { FormControl, FormLabel, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ProjectPart4, ProjectPart4ValidationError } from "../../model";
import ImagesListing from "./ImagesListing";

interface Props {
  value: ProjectPart4;
  onChange: (newPart4: ProjectPart4) => void;
  validation: ProjectPart4ValidationError;
  updateValidation: (newValidation: ProjectPart4ValidationError) => void;
}

const Part4Form: React.FC<Props> = ({
  value,
  onChange,
  validation,
  updateValidation,
}) => {
  return (
    <div>
      <div>
        <FormControl
          error={!!validation.mainImage}
          style={{ maxWidth: 450, marginBottom: 14 }}
          fullWidth
        >
          <FormLabel>
            <Typography variant="subtitle2" color="inherit">
              <FormattedMessage id="project.mainProjectImage" /> *
            </Typography>
          </FormLabel>
        </FormControl>
        <ImagesListing
          max={1}
          disableDesc
          images={value.mainImage ? [{ ...value.mainImage }] : []}
          update={(newImages) => {
            if (newImages.length === 1) {
              onChange({ ...value, mainImage: newImages[0] });
            } else {
              onChange({ ...value, mainImage: undefined });
            }
          }}
        />
      </div>
      <div>
        <FormControl
          error={!!validation.overviewImages}
          style={{ maxWidth: 450, marginBottom: 14 }}
          fullWidth
        >
          <FormLabel>
            <Typography variant="subtitle2" color="inherit">
              <FormattedMessage id="project.projectOverviewImages" /> *
            </Typography>
          </FormLabel>
        </FormControl>
        <ImagesListing
          max={3}
          images={value.overviewImages}
          update={(newImages) =>
            onChange({ ...value, overviewImages: newImages })
          }
        />
      </div>
      <div>
        <FormControl
          error={!!validation.projectImages}
          style={{ maxWidth: 450, marginBottom: 14 }}
          fullWidth
        >
          <FormLabel>
            <Typography variant="subtitle2" color="inherit">
              <FormattedMessage id="project.projectImages" /> *
            </Typography>
          </FormLabel>
        </FormControl>
        <ImagesListing
          max={10}
          images={value.projectImages}
          update={(newImages) =>
            onChange({ ...value, projectImages: newImages })
          }
        />
      </div>
    </div>
  );
};

export default Part4Form;
