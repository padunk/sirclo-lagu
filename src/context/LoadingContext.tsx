import * as React from "react";
import { Dispatch } from "react";

export type ListLoading = ReturnType<typeof listLoading>;

export function listLoading() {
    const [isLoading, setIsLoading] = React.useState(false);
    return { isLoading, setIsLoading };
}

export const LoadingContext = React.createContext<ListLoading>(
    {} as ListLoading
);

// NEW context
export type FetchStatusValue = {
    globalStatus: string[];
    setGlobalStatus: Dispatch<React.SetStateAction<string[]>>;
    globalIsPreviousData: boolean[];
    setGlobalIsPreviousData: Dispatch<React.SetStateAction<boolean[]>>;
};
export const FetchStatusContext = React.createContext<null | any>(null);
export const FetchStatusProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [globalStatus, setGlobalStatus] = React.useState<string[]>([]);
    const [globalIsPreviousData, setGlobalIsPreviousData] = React.useState<
        boolean[]
    >([]);
    const initialValue: FetchStatusValue = {
        globalStatus,
        setGlobalStatus,
        globalIsPreviousData,
        setGlobalIsPreviousData,
    };

    return (
        <FetchStatusContext.Provider value={initialValue}>
            {children}
        </FetchStatusContext.Provider>
    );
};
