import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useStyles from "./styles";

const PaymentSuccess = () => {
  const classes = useStyles();
  const [URLResponse, setURLResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    for (const [key, value] of queryParams.entries()) {
      console.log(`${key}: ${value}`);
    }

    const paymentResponse = {
      status: queryParams.get("status"),
      txnid: queryParams.get("txnid"),
      payment_source: queryParams.get("payment_source"),
      easepayid: queryParams.get("easepayid"),
      card_type: queryParams.get("card_type"),
      error: queryParams.get("error"),
      firstname: queryParams.get("firstname"),
      hash: queryParams.get("hash"),
      amount: queryParams.get("amount"),
    };

    setURLResponse(paymentResponse);
    setIsLoading(false);
    console.log(paymentResponse, "from component");
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div
      style={{
        background:
          URLResponse?.status === "success"
            ? "linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(53,121,9,0.3395483193277311) 0%, rgba(185,247,171,0.6588760504201681) 30%, rgba(21,176,57,0.4151785714285714) 66%, rgba(232,255,0,0.1070553221288515) 100%)"
            : "linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(216,19,30,0.5160189075630253) 0%, rgba(238,125,100,0.6588760504201681) 30%, rgba(176,21,29,0.4151785714285714) 66%, rgba(255,0,121,0.1070553221288515) 100%)",
      }}
    >
      <Container maxWidth="md" className={classes.container}>
        <Card sx={{ boxShadow: "2px 3px 7px #c2c2c2" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: "#000", fontWeight: "24px", fontVariant: "small-caps" }}>
              {URLResponse?.error}
            </Typography>

            <TableContainer>
              <Table style={{ border: "0.3px solid #ccc", borderSpacing: "10px" }}>
                <TableHead>
                  <TableRow style={{ background: "#f5f5f5" }}>
                    <TableCell style={{ fontWeight: "bold", width: "30%", padding: "10px" }}>Field</TableCell>
                    <TableCell style={{ fontWeight: "bold", width: "60%", padding: "10px" }}>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ padding: "10px" }}>Firstname</TableCell>
                    <TableCell style={{ padding: "10px" }}>{URLResponse?.firstname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ padding: "10px" }}>Status</TableCell>
                    <TableCell style={{ padding: "10px" }}>{URLResponse?.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ padding: "10px" }}>Transaction ID</TableCell>
                    <TableCell style={{ padding: "10px" }}>{URLResponse?.txnid}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ padding: "10px" }}>Payment Source</TableCell>
                    <TableCell style={{ padding: "10px" }}>{URLResponse?.payment_source}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ padding: "10px" }}>Easepay ID</TableCell>
                    <TableCell style={{ padding: "10px" }}>{URLResponse?.easepayid}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ padding: "10px" }}>Card Type</TableCell>
                    <TableCell style={{ padding: "10px" }}>{URLResponse?.card_type}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ padding: "10px" }}>Amount</TableCell>
                    <TableCell style={{ padding: "10px" }}>{URLResponse?.amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Button variant="outlined" sx={{ mt: 2 }} color="primary" href="/auth/login">
              Continue Your Journey
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default PaymentSuccess;
