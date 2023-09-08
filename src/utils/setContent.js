import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";



const setContent = (process,Component, data) => {
    console.log(process);
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading': 
            return <Spinner/>;
        case 'confirmed':
           return <Component data={data}/>;
        default:
            return <ErrorMessage/>;
    }
};

export default setContent;