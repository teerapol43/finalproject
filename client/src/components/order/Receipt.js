import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    PDFDownloadLink,
} from '@react-pdf/renderer';
import fontPdf from './THA0011.ttf';

// Assuming 'source' is defined and pointing to your font file
Font.register({ family: 'js', src: fontPdf });

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontFamily: 'js',
    },
    table: {
        marginTop: 10,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        padding: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        fontFamily: 'js',
    },
});

const Receipt = ({ order }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>JS POWER ELECTRIC LIMITED</Text>
                    <Text style={styles.title}>ใบเสร็จรับเงิน</Text>
                    <Text style={styles.title}>TotalPrice: {order.cartTotal}</Text>

                    {/* Table */}
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell}>
                                <Text>listproduct</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text>price</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text>count</Text>
                            </View>
                        </View>

                        {/* Table Body */}
                        {order.products.map((product, index) => (
                            <View key={index} style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text>{product.name}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{product.price}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{product.count}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default Receipt;
