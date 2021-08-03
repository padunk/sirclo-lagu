import * as React from "react";

export type ListLoading = ReturnType<typeof listLoading>;

export function listLoading() {
    const [isLoading, setIsLoading] = React.useState(false);
    return { isLoading, setIsLoading };
}

export const LoadingContext = React.createContext<ListLoading | null>(null);
