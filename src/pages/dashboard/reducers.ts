import { TestsAction, TestsState } from "./InterfacesTypes";

export const initialState: TestsState = {
  tests: [],
  loading: false,
  error: null,
};

export function testsReducer(state: TestsState, action: TestsAction): TestsState {
  switch (action.type) {
    case "FETCH_TESTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_TESTS_SUCCESS":
      return { ...state, loading: false, tests: action.payload };
    case "FETCH_TESTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
