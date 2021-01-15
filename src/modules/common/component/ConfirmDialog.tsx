import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";

interface Props {
  msgId: string;
  resolve?: (result: boolean) => void;
}

const ConfirmDialog: React.FC<Props> = ({ msgId, resolve }) => {
  return (
    <Dialog open={resolve !== undefined}>
      <DialogContent>
        <div style={{ display: "flex", alignItems: "center", minWidth: 300 }}>
          <Typography variant="body2">
            <FormattedMessage id={msgId} />
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => resolve && resolve(true)}
        >
          <FormattedMessage id="OK" />
        </Button>
        &nbsp;
        <Button
          variant="outlined"
          color="primary"
          onClick={() => resolve && resolve(false)}
        >
          <FormattedMessage id="cancel" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ConfirmDialog);
