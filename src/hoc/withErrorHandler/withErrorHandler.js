import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [errorsState, setErrorState] = useState(null)

        const reqInterceptor = axios.interceptors.request.use(req => {
            setErrorState(null)
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setErrorState(error)
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor])

        const errorConfirmedHandler = () => {
            setErrorState(null)
        }

        return (
            <Aux>
                <Modal
                    show={errorsState}
                    modalClosed={errorConfirmedHandler}>
                    {errorsState ? errorsState.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }

}

export default withErrorHandler;