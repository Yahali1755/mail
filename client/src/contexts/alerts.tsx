import { AlertColor, Alert as MuiAlert, Snackbar } from '@mui/material';
import { useState, createContext, ReactNode, FC, useContext} from 'react'

import { useOpen } from '../common/hooks/open';

export interface Alert {
    message: string,
    severity: AlertColor
}

interface AlertContextProps {
    success: (message?: string) => void
    error: (message: string) => void
}

const AlertsContext = createContext<AlertContextProps>({} as AlertContextProps);

export const useAlerts = () => useContext(AlertsContext);

const defaultHideDuration = 5000;

export const AlertsProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [alert, setAlert] = useState<Alert>();
    const { isOpen, open, close }= useOpen()

    const showAlert = (alert: Alert) => {
        setAlert(alert)
        open();
    }

    const success = (message = "Action successfully completed!") => {
        showAlert({severity: "success", message})
    }

    const error = (message: string) => {
        showAlert({severity: "error", message})
    }

    return (
        <AlertsContext.Provider value={{success, error}}>
            {
                alert && 
                <Snackbar open={isOpen} autoHideDuration={defaultHideDuration} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={close}>
                    <MuiAlert
                    onClose={close}
                    severity={alert.severity}
                    variant="filled"
                    >
                    { alert.message}
                    </MuiAlert>
                </Snackbar>
            }
            { children }
        </AlertsContext.Provider>
    );
};