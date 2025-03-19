import React, { useState } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Divider
} from '@mui/material';
import {
    KeyboardArrowRight as KeyboardArrowRightIcon
} from '@mui/icons-material';

export const OrderHistory = () => {
    const [orders] = useState([
        {
            id: 'ORD-1234',
            date: '2025-02-15',
            total: 79.99,
            status: 'Delivered',
            items: [
                { id: 1, name: 'Wireless Headphones', price: 49.99, quantity: 1 },
                { id: 2, name: 'Phone Case', price: 15.00, quantity: 2 }
            ]
        },
        {
            id: 'ORD-2345',
            date: '2025-01-30',
            total: 129.95,
            status: 'Processing',
            items: [
                { id: 3, name: 'Smart Watch', price: 129.95, quantity: 1 }
            ]
        },
        {
            id: 'ORD-3456',
            date: '2024-12-20',
            total: 89.97,
            status: 'Cancelled',
            items: [
                { id: 4, name: 'Bluetooth Speaker', price: 89.97, quantity: 1 }
            ]
        }
    ]);

    const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'success';
            case 'Processing': return 'primary';
            case 'Shipped': return 'info';
            case 'Cancelled': return 'error';
            default: return 'default';
        }
    };

    const handleOpenOrderDetails = (order) => {
        setSelectedOrder(order);
        setOrderDetailsOpen(true);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenOrderDetails(order)}
                                    >
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Order Details Dialog */}
            <Dialog
                open={orderDetailsOpen}
                onClose={() => setOrderDetailsOpen(false)}
                maxWidth="md"
                fullWidth
            >
                {selectedOrder && (
                    <>
                        <DialogTitle>
                            Order Details: {selectedOrder.id}
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2">Order Date</Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {new Date(selectedOrder.date).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2">Status</Typography>
                                    <Chip
                                        label={selectedOrder.status}
                                        color={getStatusColor(selectedOrder.status)}
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" gutterBottom>
                                Items
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedOrder.items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={3} align="right">
                                                <strong>Total</strong>
                                            </TableCell>
                                            <TableCell align="right">
                                                <strong>${selectedOrder.total.toFixed(2)}</strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </Box>
    );
};
