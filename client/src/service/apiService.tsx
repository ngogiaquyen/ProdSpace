// apiService.js

// export const BASE_URL = 'http://localhost/my-profile/server';
export const BASE_URL = import.meta.env.VITE_BASE_API_URL;

console.log(BASE_URL);

export const getData = async (endpoint : string, params: Record<string, string> = {}) => {
  // Tạo query string nếu có params
  const queryString = new URLSearchParams(params).toString();
  // const url = `${BASE_URL}${endpoint}`;
  const url = `${BASE_URL}${endpoint}${queryString ? '?' + queryString : ''}`;
  console.log(url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    
  }
};
export const postData = async (endpoint : string, payload: string) => {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const putData = async (endpoint: string, payload: string) => {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export function downloadFile(endpoint: string, fileName = 'downloaded_file') {
  const url = `${BASE_URL}${endpoint}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('File không tồn tại!');
      }
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => console.error('Lỗi tải file:', error));
}
