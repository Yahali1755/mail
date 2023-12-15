import { FC } from "react";
import { Grid } from "@mui/material"

import { AuthForm } from "./AuthForm";
import PageContainer from "../common/PageContainer";

const styles = {
    formContainer: {
        height: '500px',
        width: '400px',
        border: '1px solid lightgrey'
    }
};

export const AuthPage: FC = () => 
    <PageContainer>
        <Grid item sx={styles.formContainer}>
            <AuthForm/>
        </Grid>
    </PageContainer>