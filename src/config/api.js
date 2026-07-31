const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")

function getApiUrl(path) {
  return `${apiBaseUrl}${path}`
}

export default getApiUrl
