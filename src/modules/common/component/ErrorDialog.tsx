import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography
} from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

interface Props {
  msgId: string;
  show: boolean;
  close(): void;
}

const ErrorDialog: React.FC<Props> = ({ msgId, show, close }) => {
  return (
    <Dialog open={show}>
      <DialogContent>
        <div style={{ display: "flex", alignItems: "center", minWidth: 300 }}>
          <Typography variant="body2">
            <FormattedMessage id={msgId} />
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => close()}>
          <FormattedMessage id="OK" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ErrorDialog);
