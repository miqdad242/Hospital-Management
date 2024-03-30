import { CSpinner } from "@coreui/react-pro";


const LoadingSpinner = () =>{
 return (
 <div className="vh-100 d-flex justify-content-center align-items-center">
    <div>
      <CSpinner size='sm' variant="grow" color="primary" />
    </div>
 </div> )
}

export default LoadingSpinner;