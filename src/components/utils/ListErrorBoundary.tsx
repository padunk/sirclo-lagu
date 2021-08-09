import React from "react";
import ErrorList from "./ErrorList";

class ListErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            message: "",
        };
    }
    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ message: error.message });
        console.log("errorInfo :>> ", errorInfo);
    }

    render() {
        // @ts-ignore
        if (this.state.hasError) {
            // @ts-ignore
            return <ErrorList message={this.state.message} />;
        }
        return this.props.children;
    }
}

export default ListErrorBoundary;
