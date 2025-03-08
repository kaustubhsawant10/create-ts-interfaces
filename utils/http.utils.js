export async function FetchSchema(url) {
  try {
    const _response = await fetch(url);
    const _data = await _response.json();
    return _data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
