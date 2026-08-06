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

async function requestPaytrIframeToken({
  order,
  userIp,
  clientUrl,
}) {
  if (!order.customerAddress) {
    throw new Error("Sipariş adresi eksik.")
  }

  const {
    merchantId,
    testMode,
    debugOn,
  } = getPaytrConfig()

  const noInstallment = "0"
  const maxInstallment = "0"
  const currency = order.currency
  const paymentAmount = String(order.amount)
  const userBasket = createPaytrBasket(
    order.programName,
    order.amount,
  )

  const paytrToken = createPaytrToken({
    userIp,
    merchantOid: order.orderNumber,
    email: order.customerEmail,
    paymentAmount,
    userBasket,
    noInstallment,
    maxInstallment,
    currency,
  })

  const baseClientUrl = clientUrl.replace(/\/+$/, "")

  const formData = new URLSearchParams({
    merchant_id: merchantId,
    user_ip: userIp,
    merchant_oid: order.orderNumber,
    email: order.customerEmail,
    payment_amount: paymentAmount,
    paytr_token: paytrToken,
    user_basket: userBasket,
    debug_on: debugOn,
    no_installment: noInstallment,
    max_installment: maxInstallment,
    user_name: order.customerName,
    user_address: order.customerAddress,
    user_phone: order.customerPhone,
    merchant_ok_url:
      `${baseClientUrl}/payment/success?order=${order.orderNumber}`,
    merchant_fail_url:
      `${baseClientUrl}/payment/failure?order=${order.orderNumber}`,
    timeout_limit: "30",
    currency,
    test_mode: testMode,
    lang: "tr",
  })

  const response = await fetch(
    "https://www.paytr.com/odeme/api/get-token",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: formData,
    },
  )

  if (!response.ok) {
    throw new Error(
      `PayTR bağlantı hatası: ${response.status}`,
    )
  }

  const result = await response.json()

  if (result.status !== "success" || !result.token) {
    throw new Error(
      result.reason || "PayTR token oluşturamadı.",
    )
  }

  return result.token
}

function verifyPaytrCallback({
  merchantOid,
  status,
  totalAmount,
  hash,
}) {
  if (
    typeof merchantOid !== "string" ||
    typeof status !== "string" ||
    typeof totalAmount !== "string" ||
    typeof hash !== "string"
  ) {
    return false
  }

  const {
    merchantKey,
    merchantSalt,
  } = getPaytrConfig()

  const hashString =
    merchantOid +
    merchantSalt +
    status +
    totalAmount

  const expectedHash = crypto
    .createHmac("sha256", merchantKey)
    .update(hashString)
    .digest("base64")

  const expectedBuffer = Buffer.from(expectedHash)
  const receivedBuffer = Buffer.from(hash)

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(
    expectedBuffer,
    receivedBuffer,
  )
}

export {
  createPaytrBasket,
  requestPaytrIframeToken,
  verifyPaytrCallback,
}
export default createPaytrToken