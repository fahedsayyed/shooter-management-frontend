import React from 'react';
import { Box, Grid } from '@mui/material';
import TopCards from './topcards';
import Payment from './cards/Payment';
import ProductsSold from './cards/ProductsSold';
import RevenueUpdates from './cards/RevenueUpdates';
import SalesOverview from './cards/SalesOverview';
import PageContainer from 'src/components/page-container/PageContainer';
import TotalEarning from 'src/components/widgets/charts/TotalEarning';
import SalesProfit from './cards/SalesProfit';

const Cards = () => {
  return (
    // <PageContainer title="eCommerce Dashboard" description="this is eCommerce Dashboard page">
      <Box display="flex" flexDirection="row">
        <TopCards />
      </Box>
    // </PageContainer>
  );
};

export default Cards;
