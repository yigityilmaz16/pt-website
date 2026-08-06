function getPaytrConfig() {
  const config = {
    merchantId: process.env.PAYTR_MERCHANT_ID,
    merchantKey: process.env.PAYTR_MERCHANT_KEY,
    merchantSalt: process.env.PAYTR_MERCHANT_SALT,
    testMode: process.env.PAYTR_TEST_MODE || "1",
    debugOn: process.env.PAYTR_DEBUG_ON || "1",
  }

  const missingConfig = Object.entries(config).find(
    ([, value]) => !value,
  )

  if (missingConfig) {
    throw new Error(
      `Eksik PayTR ayarı: ${missingConfig[0]}`,
    )
  }

  return config
}

export default getPaytrConfig