import axios from "axios";
import { Test, Site, TestsAction } from "./InterfacesTypes";

const SITES_API_URL = "http://localhost:3100/sites";
const TESTS_API_URL = "http://localhost:3100/tests";

export async function fetchTestsThunk(dispatch: React.Dispatch<TestsAction>) {
  dispatch({ type: "FETCH_TESTS_REQUEST" });

  try {
    const [sitesResponse, testsResponse] = await Promise.all([
      axios.get<Site[]>(SITES_API_URL),
      axios.get<Test[]>(TESTS_API_URL)
    ]);

    const sitesMap = new Map(sitesResponse.data.map(site => [site.id, site]));

    const testsWithSites = testsResponse.data.map(test => ({
      ...test,
      site: sitesMap.get(test.siteId) || { id: test.siteId, url: "Unknown" }
    }));

    dispatch({ type: "FETCH_TESTS_SUCCESS", payload: testsWithSites });
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    dispatch({
      type: "FETCH_TESTS_FAILURE",
      payload: axios.isAxiosError(error)
        ? error.response?.data?.message || "Ошибка запроса"
        : "Неизвестная ошибка",
    });
  }
}
