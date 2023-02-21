import numeral from "numeral";

export const formatDefault = (amount: string, currency = "$") => {
  let textResult = `${currency}`;
  try {
    if (isNaN(parseFloat(amount))) {
      textResult += numeral(parseFloat(amount.replace(",", ""))).format(
        "0,0.00"
      );
    } else {
      textResult += numeral(parseFloat(amount)).format("0,0.00");
    }
  } catch (e) {
    console.log(e);
  }
  return textResult;
};