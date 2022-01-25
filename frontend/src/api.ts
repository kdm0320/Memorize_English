export const baseUrl = "http://127.0.0.1:8000/api/v1";

export function fetchWords() {
  return fetch(`${baseUrl}/words/`).then((response) => response.json());
}
