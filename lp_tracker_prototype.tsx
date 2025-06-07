import React, { useState } from 'react';

const LPTracker = () => {
  const [activeTab, setActiveTab] = useState('positions');

  // Sample data for demonstration
  const lpPositions = [
    {
      id: 'LP001',
      pair: 'ETH-USDC',
      chain: 'Arbitrum',
      status: 'Closed',
      initialDeposit: {
        date: '2024-01-15',
        eth: 1.0,
        usdc: 3800,
        totalUSD: 7600,
        txHash: '0x1234...abcd'
      },
      activities: [
        {
          date: '2024-02-01',
          type: 'Claim Rewards',
          txHash: '0x5678...efgh',
          rewardToken: 'AERO',
          rewardAmount: 125,
          rewardUSD: 87.50,
          gasFee: 2.45
        },
        {
          date: '2024-03-10',
          type: 'Remove Liquidity',
          txHash: '0x9abc...ijkl',
          withdrawnUSD: 7850,
          gasFee: 8.20
        }
      ],
      calculations: {
        totalReceived: 7937.50,
        totalGasFees: 10.65,
        netProfit: 326.85,
        hodlValue: 7950,
        vsHodl: -12.15
      }
    },
    {
      id: 'LP002',
      pair: 'WBTC-ETH',
      chain: 'Base',
      status: 'Active',
      initialDeposit: {
        date: '2024-02-20',
        wbtc: 0.25,
        eth: 3.2,
        totalUSD: 18500,
        txHash: '0xdef0...mnop'
      },
      activities: [
        {
          date: '2024-04-15',
          type: 'Fee Check',
          currentValue: 19200,
          unclaimedRewards: 45.80,
          notes: 'Regular monitoring'
        }
      ],
      calculations: {
        currentEstimatedValue: 19245.80,
        unrealizedGain: 745.80
      }
    }
  ];

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
        active 
          ? 'border-blue-500 text-blue-600 bg-blue-50' 
          : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  const PositionCard = ({ position }) => (
    <div className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {position.pair} ({position.id})
          </h3>
          <p className="text-sm text-gray-600">{position.chain} • {position.status}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          position.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {position.status}
        </div>
      </div>

      {/* Initial Deposit */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Initial Deposit</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Date:</span> {position.initialDeposit.date}
          </div>
          <div>
            <span className="text-gray-600">Total USD:</span> ${position.initialDeposit.totalUSD.toLocaleString()}
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">Assets:</span> {
              Object.entries(position.initialDeposit)
                .filter(([key]) => !['date', 'totalUSD', 'txHash'].includes(key))
                .map(([token, amount]) => `${amount} ${token.toUpperCase()}`)
                .join(', ')
            }
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2">Activity Log</h4>
        <div className="space-y-2">
          {position.activities.map((activity, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <span className="font-medium text-sm">{activity.type}</span>
                <span className="text-gray-600 text-sm ml-2">{activity.date}</span>
              </div>
              <div className="text-right text-sm">
                {activity.rewardUSD && (
                  <div className="text-green-600">+${activity.rewardUSD}</div>
                )}
                {activity.withdrawnUSD && (
                  <div className="text-blue-600">${activity.withdrawnUSD.toLocaleString()}</div>
                )}
                {activity.currentValue && (
                  <div className="text-purple-600">${activity.currentValue.toLocaleString()}</div>
                )}
                {activity.gasFee && (
                  <div className="text-red-600 text-xs">-${activity.gasFee} gas</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculations */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-800 mb-2">Performance</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {position.status === 'Closed' ? (
            <>
              <div>
                <span className="text-gray-600">Net Profit:</span>
                <span className={`ml-2 font-medium ${
                  position.calculations.netProfit > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${position.calculations.netProfit}
                </span>
              </div>
              <div>
                <span className="text-gray-600">vs HODL:</span>
                <span className={`ml-2 font-medium ${
                  position.calculations.vsHodl > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${position.calculations.vsHodl}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Total Gas:</span>
                <span className="ml-2 text-red-600">${position.calculations.totalGasFees}</span>
              </div>
              <div>
                <span className="text-gray-600">HODL Value:</span>
                <span className="ml-2">${position.calculations.hodlValue.toLocaleString()}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-gray-600">Current Value:</span>
                <span className="ml-2 font-medium text-blue-600">
                  ${position.calculations.currentEstimatedValue.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Unrealized Gain:</span>
                <span className={`ml-2 font-medium ${
                  position.calculations.unrealizedGain > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${position.calculations.unrealizedGain}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const SummaryView = () => {
    const totalInvested = lpPositions.reduce((sum, pos) => sum + pos.initialDeposit.totalUSD, 0);
    const closedPositions = lpPositions.filter(pos => pos.status === 'Closed');
    const activePositions = lpPositions.filter(pos => pos.status === 'Active');
    
    const totalRealizedProfit = closedPositions.reduce((sum, pos) => sum + pos.calculations.netProfit, 0);
    const totalUnrealizedGain = activePositions.reduce((sum, pos) => sum + (pos.calculations.unrealizedGain || 0), 0);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900">Total Invested</h3>
            <p className="text-2xl font-bold text-blue-700">${totalInvested.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-900">Realized Profit</h3>
            <p className="text-2xl font-bold text-green-700">${totalRealizedProfit}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-900">Unrealized Gain</h3>
            <p className="text-2xl font-bold text-purple-700">${totalUnrealizedGain}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900">Active Positions</h3>
            <p className="text-2xl font-bold text-gray-700">{activePositions.length}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Crypto LP Portfolio Tracker</h1>
            <p className="text-gray-600 mt-1">Track your liquidity pool positions and performance</p>
          </div>
          
          <div className="px-6">
            <div className="flex space-x-0 border-b">
              <TabButton 
                id="summary" 
                label="Portfolio Summary" 
                active={activeTab === 'summary'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="positions" 
                label="LP Positions" 
                active={activeTab === 'positions'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="active" 
                label="Active Only" 
                active={activeTab === 'active'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="closed" 
                label="Closed Only" 
                active={activeTab === 'closed'} 
                onClick={setActiveTab} 
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'summary' && <SummaryView />}
          
          {activeTab === 'positions' && (
            <div>
              {lpPositions.map((position, idx) => (
                <PositionCard key={idx} position={position} />
              ))}
            </div>
          )}
          
          {activeTab === 'active' && (
            <div>
              {lpPositions.filter(pos => pos.status === 'Active').map((position, idx) => (
                <PositionCard key={idx} position={position} />
              ))}
            </div>
          )}
          
          {activeTab === 'closed' && (
            <div>
              {lpPositions.filter(pos => pos.status === 'Closed').map((position, idx) => (
                <PositionCard key={idx} position={position} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LPTracker;