import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography
} from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { setCommonError } from "../redux/commonReducer";


interface Props {
  msgId?: string;
}

const NetworkErrorDialog: React.FC<Props> = ({ msgId }) => {
  const dispatch = useDispatch();
  return (
    <Dialog open={msgId !== undefined}>
      <DialogContent>
        <div style={{ display: "flex", alignItems: "center", minWidth: 300 }}>
          <Typography variant="body2">
            {msgId && <FormattedMessage id={msgId} />}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(setCommonError(undefined))}
        >
          <FormattedMessage id="OK" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(NetworkErrorDialog);
