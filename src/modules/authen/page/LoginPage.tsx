import Button from "@material-ui/core/Button";
import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { VNDirectIdLink } from "../../common/constants";

const LoginPage = () => {
  const fromPath = useMemo(() => {
    let from = "/";
    const params = new URLSearchParams(window.location.search);
    const fromParamValue = params.get("from");
    if (fromParamValue) {
      from = fromParamValue;
    }
    return from;
  }, []);
  console.log(VNDirectIdLink);

  return (
    <div>
      <Button
        href={`${VNDirectIdLink}?httpReferer=${window.location.origin}${fromPath}`}
      >
        <FormattedMessage id="authen.loginViaVNDirectAccount" />
      </Button>
    </div>
  );
};

export default React.memo(LoginPage);
