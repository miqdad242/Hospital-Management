import { CToast,CToastBody,CToastClose } from "@coreui/react-pro";


const ToastError = ({response}) => {
                return (<CToast autohide={true} delay={2000} visible={true} color="danger" className="text-white align-items-center">
                    <div className="d-flex">
                        <CToastBody>{response}</CToastBody>
                        <CToastClose className="me-2 m-auto" white />
                    </div>
                </CToast>)
}

export default ToastError;