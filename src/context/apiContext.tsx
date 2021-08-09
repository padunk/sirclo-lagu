// @ts-nocheck
import * as React from "react";
import { useQuery } from "react-query";

const QueryPropsContext = React.createContext<any>(null);
export const QueryPropsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    function queryProps() {
        const [qProps, setQProps] = React.useState({
            queryKey: "",
            queryFn: () => {},
            options: {},
        });

        return [qProps, setQProps];
    }
    return (
        <QueryPropsContext.Provider value={queryProps()}>
            {children}
        </QueryPropsContext.Provider>
    );
};
export const useQueryProps = () => React.useContext(QueryPropsContext);

const MusicContext = React.createContext<any>(null);
export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
    const { queryKey, queryFn, options } = useQueryProps()[0];

    const queryResult = useQuery({
        queryKey,
        queryFn,
        options,
    });
    return (
        <MusicContext.Provider value={queryResult}>
            {children}
        </MusicContext.Provider>
    );
};
export const useMusicContext = () => React.useContext(MusicContext);
