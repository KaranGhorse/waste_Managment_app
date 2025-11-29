import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
// import Feather from "react-native-vector-icons/Feather"; 

const ScanIcon = () => (
    <View style={styles.scanButton}>
        {/* Using 'maximize' for a scanning/QR code feel */}
        {/* <Feather name="maximize" size={28} color="white" /> */}
    </View>
);

// --- Data for Transaction List ---
const transactions = [
    { id: 1, type: 'Soda Can', weight: '1.0 Kg', amount: '+ 2.099$', icon: '🥤', iconColor: '#E95454' },
    { id: 2, type: 'Clothing', weight: '2.0 Kg', amount: '+ 2.099$', icon: '👕', iconColor: '#3498db' },
    { id: 3, type: 'Plastic Bag', weight: '1.0 Kg', amount: '+ 2.099$', icon: '🛍️', iconColor: '#757C85' },
    { id: 4, type: 'Wool', weight: '0.3 Kg', amount: '+ 10.00$', icon: '🧶', iconColor: '#f1c40f' },
    { id: 5, type: 'Soda Can', weight: '1.0 Kg', amount: '+ 2.099$', icon: '🥤', iconColor: '#E95454' },
    { id: 6, type: 'Plastic Bag', weight: '1.0 Kg', amount: '+ 2.099$', icon: '🛍️', iconColor: '#757C85' },
    { id: 7, type: 'Soda Can', weight: '1.0 Kg', amount: '+ 2.099$', icon: '🥤', iconColor: '#E95454' },
    { id: 8, type: 'Clothing', weight: '2.0 Kg', amount: '+ 2.099$', icon: '👕', iconColor: '#3498db' },
];

// --- Transaction List Item Component ---
const TransactionItem = ({ data }) => (
    <View style={styles.transactionItem}>
        <View style={[styles.iconCircle, { backgroundColor: data.iconColor + '20' }]}>
            <Text style={styles.icon}>{data.icon}</Text>
        </View>
        <View style={styles.transactionDetails}>
            <Text style={styles.transactionType}>{data.type}</Text>
            <Text style={styles.transactionWeight}>{data.weight}</Text>
        </View>
        <Text style={styles.transactionAmount}>{data.amount}</Text>
    </View>
);

// --- Main Wallet Screen Component ---
export default function WalletScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* Main container wraps everything, scrollable content is inside */}
            <View style={styles.container}>
                {/* Header is outside the ScrollView */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Wallet</Text>
                </View>

                {/* Main Content ScrollView */}
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Wallet Card */}
                    <View style={styles.walletCard}>
                        <Text style={styles.balanceLabel}>Balance</Text>
                        <Text style={styles.balanceAmount}>$9.999</Text>

                        {/* Stats Bar */}
                        <View style={styles.statsBar}>
                            <View style={styles.statPill}>
                                <Text style={styles.statValue}>12</Text>
                                <Text style={styles.statLabel}>Transaction</Text>
                            </View>
                            <View style={styles.statPill}>
                                <Text style={styles.statValue}>8</Text>
                                <Text style={styles.statLabel}>Progress</Text>
                            </View>
                            <View style={styles.statPill}>
                                <Text style={styles.statValue}>4</Text>
                                <Text style={styles.statLabel}>Waiting</Text>
                            </View>
                        </View>
                    </View>

                    {/* Income History Header */}
                    <View style={styles.incomeHistoryHeader}>
                        <Text style={styles.incomeHistoryTitle}>Income History</Text>
                        <View style={styles.sortByContainer}>
                            <Text style={styles.sortByText}>Sort By</Text>
                            {/* Using Unicode right arrow or a custom icon */}
                            <Text style={styles.sortByArrow}>&#x2192;</Text> 
                        </View>
                    </View>

                    {/* Transaction List */}
                    {transactions.map(item => (
                        <TransactionItem key={item.id} data={item} />
                    ))}
                    {/* Padding at the bottom to ensure the last item isn't covered by the nav bar */}
                    <View style={{ height: 120 }} /> 
                </ScrollView>
            </View>

            {/* Bottom Navigation Bar - Absolute positioning to float over content */}
            <View style={styles.bottomNav}>
                {/* <HomeIcon color="#A9A9A9" /> */}
                {/* <WalletIcon color="#333" /> */}
                {/* <ScanIcon /> */}
                {/* <CartIcon color="#A9A9A9" /> */}
                {/* <ProfileIcon color="#A9A9A9" /> */}
            </View>
        </SafeAreaView>
    );
}

// --- Stylesheet ---
const PRIMARY_GREEN = '#8BBC8E';
const STAT_BG = 'rgba(255, 255, 255, 0.4)';

// All styles are defined using StyleSheet.create as requested
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    // contentContainerStyle for ScrollView handles internal padding
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    
    // Header Styles
    header: {
        paddingTop: Platform.OS === 'android' ? 10 : 0, // Add padding for Android status bar
        paddingBottom: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },

    // Wallet Card Styles (Using RN shadow properties)
    walletCard: {
        backgroundColor: PRIMARY_GREEN,
        borderRadius: 20,
        padding: 25,
        marginBottom: 30,
        // iOS Shadow
        shadowColor: PRIMARY_GREEN,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        // Android Shadow
        elevation: 10,
    },
    balanceLabel: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
        marginBottom: 5,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 25,
    },
    
    // Stats Bar Styles (Inside Wallet Card)
    statsBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: STAT_BG,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    statPill: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 3,
    },
    statLabel: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.9,
    },

    // Income History Header Styles
    incomeHistoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 5, // Match padding of list items 
    },
    incomeHistoryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    sortByContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortByText: {
        fontSize: 14,
        color: PRIMARY_GREEN,
    },
    sortByArrow: {
        fontSize: 16,
        color: PRIMARY_GREEN,
        marginLeft: 5,
        lineHeight: 18, // For better alignment of the Unicode character on RN
    },

    // Transaction Item Styles (Using RN shadow properties)
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginBottom: 10,
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        // Android Shadow
        elevation: 1,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        fontSize: 20,
    },
    transactionDetails: {
        flex: 1,
        flexDirection: 'column',
    },
    transactionType: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    transactionWeight: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: PRIMARY_GREEN,
    },

    // Bottom Navigation Bar Styles
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        // Use paddingBottom for space below icons on iPhones with notch
        paddingVertical: 10, 
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        position: 'absolute', // Fixed at the bottom of the screen
        bottom: 0,
        left: 0,
        right: 0,
        height: 80, // Explicit height
    },
    scanButton: {
        width: 60,
        height: 60,
        borderRadius: 30, // Half of width/height for circular shape
        backgroundColor: PRIMARY_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30, // Lift the button above the nav bar visually
        // iOS Shadow
        shadowColor: PRIMARY_GREEN,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        // Android Shadow
        elevation: 8,
    },
});