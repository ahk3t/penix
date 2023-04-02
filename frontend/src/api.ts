export async function fetchAPI(path: string) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // if (!wihoutToken) {
  //   const token = process.env.REACT_APP_JWT_KEY;

  //   defaultOptions.headers["Authorization"] = token && `Bearer ${token}`;
  // }

  const requestUrl = `${process.env.NEXT_PUBLIC_URL}${path}`;
  let response;

  try {
    response = await fetch(requestUrl, defaultOptions);
  } catch (error) {
    throw new Error(
      `Произошла ошибка в запросе - ${requestUrl}. Не верный адрес сервера или сервер не доступен!`
    );
  }

  if (response.status == 401) {
    throw new Error(
      `Произошла ошибка в запросе - ${requestUrl}. Не авторизован!`
    );
  }

  if (response.status == 403) {
    throw new Error(
      `Произошла ошибка в запросе - ${requestUrl}. Нет доступа к данным!`
    );
  }

  if (response.status == 404) {
    throw new Error(
      `Произошла ошибка в запросе - ${requestUrl}. Страница не найдена!`
    );
  }

  if (response.status >= 500) {
    throw new Error(
      `Произошла ошибка в запросе - ${requestUrl}. Ошибка сервера!`
    );
  }

  if (!response.ok) {
    throw new Error(`Произошла ошибка в запросе - ${requestUrl}. Нет данных!`);
  }

  const data = await response.json();

  return data;
}
