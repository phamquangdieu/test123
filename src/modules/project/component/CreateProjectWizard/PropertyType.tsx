import { Checkbox, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { CustomInput } from "../../../common/component/element";

interface Props {
  checked: boolean;
  name: string;
  quantity?: number;
  check(value: boolean): void;
  setQuantity(value: number): void;
}

const PropertyType: React.FC<Props> = ({
  checked,
  name,
  quantity,
  check,
  setQuantity,
}) => {
  const [qStr, setQStr] = useState(`${quantity}`);

  useEffect(() => {
    setQStr(`${quantity}`);
  }, [quantity])

  return (
    <div style={{ display: "flex", alignItems: "center", paddingRight: 40 }}>
      <Checkbox
        size="small"
        checked={checked}
        onChange={(e, checked) => check(checked)}
      ></Checkbox>
      <div style={{ flex: 1, margin: "0 15px" }}>
        <Typography variant="body2">{name}</Typography>
      </div>
      <div style={{ margin: "0 15px" }}>
        <Typography variant="body2">
          <FormattedMessage id="quantity" />
        </Typography>
      </div>
      <CustomInput
        disabled={!checked}
        style={{ width: 100 }}
        value={!checked ? "" : qStr || ""}
        onChange={(e) => {
          const value = e.target.value;
          setQStr(value);
          const intValue = parseInt(value);
          if (!isNaN(intValue)) {
            setQuantity(intValue);
          } else {
            setQuantity(0);
          }
        }}
        onBlur={() => setQStr(`${quantity}`)}
      ></CustomInput>
    </div>
  );
};

export default PropertyType;
