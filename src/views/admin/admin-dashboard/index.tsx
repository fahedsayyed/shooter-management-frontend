import { Container, Grid} from '@mui/material';
import React from 'react'

import TenantInfo from './tenentsCreation/formInfos/TenantsList';

const AdminDashboard = () => {
    // const [value, setValue] = React.useState(0);
    
    // const handleChange = (event: any, newValue: number) => {
    //     setValue(newValue);
    // };

    return (
            <main>
                <Container maxWidth='xl'>
                    <Grid container spacing={3} mt={{lg: 2.5, xs: 1}}>
                        <Grid item xs={12} md={12} sx={{marginBottom: '56px'}}>
                            <TenantInfo />
             
                        </Grid>
                    </Grid>
                </Container>
            </main>
      );
}

export default AdminDashboard