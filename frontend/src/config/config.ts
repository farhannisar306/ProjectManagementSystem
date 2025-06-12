export const base_url = `${import.meta.env.VITE_REACT_BASE_URL}`
export const frontend_port = `${import.meta.env.VITE_REACT_FRONTEND_PORT}`
export const backend_port = `${import.meta.env.VITE_REACT_BACKEND_PORT}`
export const api_version = `${import.meta.env.VITE_REACT_API_VERSION}`
export const api_url = `${base_url}/api/${api_version}`
export const avatar_file_size_max = 1 * 1024**2
export const avatar_file_allowed_types = ['image/png', 'image/jpeg']