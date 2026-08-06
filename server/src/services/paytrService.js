import crypto from "node:crypto"
import getPaytrConfig from "../config/paytr.js"

function createPaytrBasket(programName, amount) {
  if (
    typeof programName !== "string" ||
    !Number.isInteger(amount) ||
    amount <= 0
  ) {
    throw new Error("Geçersiz PayTR sepet bilgisi.")
  }

  const price = (amount / 100).toFixed(2)
  const basket = [[programName, price, 1]]

  return Buffer.from(
    JSON.stringify(basket),
    "utf8",
  ).toString("base64")
}

function createPaytrToken({
  userIp,
  merchantOid,
  email,
  paymentAmount,
  userBasket,
  noInstallment,
  maxInstallment,
  currency,
}) {
  const {
    merchantId,
    merchantKey,
    merchantSalt,
    testMode,
  } = getPaytrConfig()

  const hashString =
    merchantId +
    userIp +
    merchantOid +
    email +
    paymentAmount +
    userBasket +
    noInstallment +
    maxInstallment +
    currency +
    testMode +
    merchantSalt

  return crypto
    .createHmac("sha256", merchantKey)
    .update(hashString)
    .digest("base64")
}

export { createPaytrBasket }
export default createPaytrToken