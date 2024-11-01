import React from 'react';
import { useWallet } from '../context/WalletContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaWallet, FaHistory, FaChartLine, FaBox } from 'react-icons/fa';
import './WalletDashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WalletDashboard = () => {
  const { walletBalance } = useWallet();

  const spendingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Spending',
      data: [1200, 1900, 800, 1600, 2000, 1500],
      fill: false,
      borderColor: '#27ae60',
      tension: 0.1
    }]
  };

  const recentTransactions = [
    { id: 1, date: '2024-01-15', type: 'Deposit', amount: 2000 },
    { id: 2, date: '2024-01-14', type: 'Purchase', amount: -500 },
    { id: 3, date: '2024-01-12', type: 'Deposit', amount: 1000 }
  ];

  const recentOrders = [
    { id: 1, date: '2024-01-15', items: ['Tomatoes', 'Onions'], status: 'Delivered', total: 500 },
    { id: 2, date: '2024-01-10', items: ['Carrots', 'Potatoes'], status: 'Processing', total: 300 }
  ];

  return (
    <div className="wallet-dashboard">
      <div className="dashboard-header">
        <h2>My Wallet Dashboard</h2>
        <div className="balance-card">
          <FaWallet size={24} />
          <div>
            <h3>Current Balance</h3>
            <span className="balance">KSh {walletBalance}</span>
          </div>
          <button className="deposit-button">Add Money</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="spending-chart card">
          <h3><FaChartLine /> Spending Analysis</h3>
          <Line data={spendingData} />
        </div>

        <div className="recent-transactions card">
          <h3><FaHistory /> Recent Transactions</h3>
          <div className="transaction-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <span className="date">{transaction.date}</span>
                <span className={`amount ${transaction.type.toLowerCase()}`}>
                  {transaction.type === 'Deposit' ? '+' : '-'} KSh {Math.abs(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="order-tracking card">
          <h3><FaBox /> Recent Orders</h3>
          <div className="order-list">
            {recentOrders.map(order => (
              <div key={order.id} className="order-item">
                <div className="order-header">
                  <span>Order #{order.id}</span>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-details">
                  <span>{order.items.join(', ')}</span>
                  <span className="order-total">KSh {order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
