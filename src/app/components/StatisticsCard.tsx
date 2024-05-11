// import TotalOrders from "@/api/products/total-orders/";
export default function StatisticsCard() {
	// event.preventDefault();

	return (
		<>
			<section className='statistics'>
				<div className='card'>
					<div className='group'>
						<p className='label'>My Balance</p>
						<div className='this-stat-group'>
							<h2 className='currncy text-gray-600'>USD</h2>
							<h2
								className='this-stat text-xl'
								id='balance-statistic'
							>
								0,00.00{/* 3,889.00 */}
							</h2>
						</div>
						<div className='flex flex-row content-baseline'>
							<div className='percantage-group'>
								<i
									className='icon'
									data-lucide='trending-up'
								></i>
								<h2 className='percantage'>{/* 37.3% */}</h2>
							</div>
							<div>
								<h2 className='duration'>
									last 00{/* 30 */}
									days
								</h2>
							</div>
						</div>
					</div>
					<i
						className='icon'
						data-lucide='coins'
					></i>
				</div>
				<div className='card'>
					<div className='group'>
						<p className='label'>Products Sold</p>
						<div className='this-stat-group'>
							<h2
								className='this-stat'
								id='sale-statistic'
							>
								{/* {response.json()} */}
								{/* 41,321 */}
							</h2>

							<h2 className='currncy text-gray-600'>Drones</h2>
						</div>
						<div className='flex flex-row'>
							<div className='percantage-group'>
								<i
									className='icon'
									data-lucide='trending-up'
								></i>
								<h2 className='percantage'>{/* 1.51% */}</h2>
							</div>
							<div>
								<h2 className='duration'>
									last 00{/* 30 */}
									days
								</h2>
							</div>
						</div>
					</div>
					<i
						className='icon'
						data-lucide='package-check'
					></i>
				</div>
				<div className='card'>
					<div className='group'>
						<p className='label'>Total users</p>
						<div className='this-stat-group'>
							<h2
								className='this-stat'
								id='users-statistic'
							>
								0{/* 412,031 */}
							</h2>
							<h2 className='currncy text-gray-600'>Users</h2>
						</div>
						<div className='flex flex-row'>
							<div className='percantage-group'>
								<i
									className='icon'
									data-lucide='trending-up'
								></i>
								<h2 className='percantage'>{/* 53.6% */}</h2>
							</div>
							<div>
								<h2 className='duration'>
									last 00 {/* 30 */}
									days
								</h2>
							</div>
						</div>
					</div>
					<i
						className='icon'
						data-lucide='users'
					></i>
				</div>
				<div className='card'>
					<div className='group'>
						<p className='label'>Click Rate</p>
						<div className='this-stat-group'>
							<h2 className='this-stat'>{/* 48.54 */}00%</h2>
						</div>
						<div className='flex flex-row'>
							<div className='percantage-group'>
								<i
									className='icon'
									data-lucide='trending-down'
								></i>
								<h2 className='percantage'>
									{/* 4.1 */}
									00%
								</h2>
							</div>
							<div>
								<h2 className='duration'>
									last 00 {/* 30 */}
									days
								</h2>
							</div>
						</div>
					</div>
					<i
						className='icon'
						data-lucide='mouse-pointer-click'
					></i>
				</div>
			</section>
		</>
	);
}
