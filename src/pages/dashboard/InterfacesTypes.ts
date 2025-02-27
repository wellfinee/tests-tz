export interface Site {
    id: number;
    url: string;
}

export interface Test {
    id: number;
    name: string;
    type: string;
    status: string;
    siteId: number;
    site: Site; // Теперь сайт внутри теста
}

export interface TestsState {
    tests: Test[];
    loading: boolean;
    error: string | null;
}

export interface FetchTestsRequestAction {
    type: "FETCH_TESTS_REQUEST";
}

export interface FetchTestsSuccessAction {
    type: "FETCH_TESTS_SUCCESS";
    payload: Test[];
}

export interface FetchTestsFailureAction {
    type: "FETCH_TESTS_FAILURE";
    payload: string;
}

export type TestsAction =
    | FetchTestsRequestAction
    | FetchTestsSuccessAction
    | FetchTestsFailureAction;

export interface DataProps {
    searchQuery: string;
    setFilteredTestLength: React.Dispatch<React.SetStateAction<number>>;
    sortConfig: { key: string; direction: "asc" | "desc" } | null;
    onReset: () => void;
}
