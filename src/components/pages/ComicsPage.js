import ComicsList from "../comicsList/ComicsList";
import AppBanner from '../appBanner/AppBanner';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";

const ComicsPage = () => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Page with list of our comics</title>
            </Helmet>
            <ErrorBoundary>
                <AppBanner></AppBanner>
            </ErrorBoundary>
            <ErrorBoundary>
                <ComicsList></ComicsList>
            </ErrorBoundary>
        </>
    );
};

export default ComicsPage;