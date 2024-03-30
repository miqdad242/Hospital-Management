import { CToast,CToastBody,CToastClose } from "@coreui/react-pro";


const ToastSuccess = ({response}) => {
                return (<CToast autohide={true} delay={2000} visible={true} color="success" className="text-white align-items-center">
                    <div className="d-flex">
                        <CToastBody>{response}</CToastBody>
                        <CToastClose className="me-2 m-auto" white />
                    </div>
                </CToast>)
}

export default ToastSuccess;